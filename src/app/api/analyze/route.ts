import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Medication } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { medications }: { medications: Medication[] } = await request.json();

    if (!medications || medications.length === 0) {
      return NextResponse.json(
        { error: 'Seznam léků je prázdný' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API klíč není nakonfigurován' },
        { status: 500 }
      );
    }

    const medicationsList = medications
      .map(med => `- ${med.name} (${med.dosage}, ${med.frequency})`)
      .join('\n');

    const prompt = `KROK 1 - IDENTIFIKACE LÉKŮ:
Nejdříve zkontroluj, zda znáš všechny uvedené léky/látky:
${medicationsList}

Pro každý lék:
- Pokud si NEJSI JISTÝ jeho identifikací nebo účinnou látkou, označ ho jako "neznámý"
- Analyzuj POUZE léky, které jednoznačně znáš

KROK 2 - ANALÝZA INTERAKCÍ:
Analyzuj možné interakce pouze u léků, které jsi správně identifikoval.

DŮLEŽITÉ: Piš jako by ses bavil s běžným člověkem, ne s lékařem. Vysvětluj jednoduše, co to znamená v praxi.

Poskytni odpověď v následujícím JSON formátu:
{
  "unknownMedications": [
    {
      "name": "název léku",
      "note": "Neznámý přípravek - ověřte název a účinnou látku s lékárníkem před analýzou interakcí"
    }
  ],
  "interactions": [
    {
      "severity": "low|medium|high|critical",
      "description": "Jasné vysvětlení co se může stát, proč je to problém a jak se to projevuje v běžném životě",
      "medications": ["Lék 1", "Lék 2"],
      "whatToDo": "Konkrétní kroky co má člověk udělat"
    }
  ],
  "recommendations": [
    "Praktické rady co dělat - bez odborných termínů"
  ],
  "questionsForDoctor": [
    "Konkrétní otázky které si může pacient připravit"
  ],
  "warnings": [
    "Kompletní věty o tom, kdy okamžitě volat lékaře - začínej 'Okamžitě volejte lékaře pokud' nebo 'Jděte na pohotovost pokud'"
  ]
}

PRAVIDLA PRO ODPOVĚĎ:
1. NIKDY neanalyzuj interakce léků, které neznáš - radši je označ jako neznámé
2. ŽÁDNÉ odborné termíny bez vysvětlení (ne "hyperkalemie", ale "příliš draslíku v krvi")
3. VŽDY vysvětli co to znamená pro běžný den člověka
4. KONKRÉTNÍ příznaky - ne "nevolnost", ale "pocit na zvracení, slabost"
5. PRAKTICKÉ rady - "užívejte ráno" místo "na lačný žaludek"
6. WARNINGS musí být kompletní věty s jasnou instrukcí kdy volat pomoc
7. Severity - PŘESNÉ DEFINICE:
   - low = Mírné interakce, které nejsou nebezpečné, ale je dobré o nich vědět. Můžete počkat na další návštěvu lékaře.
   - medium = Důležité interakce, které mohou ovlivnit účinnost léků nebo způsobit nepříjemné vedlejší účinky. Promluvte s lékařem do týdne.
   - high = Nebezpečné interakce, které mohou způsobit vážné zdravotní problémy. Kontaktujte lékaře do 24-48 hodin.
   - critical = Život ohrožující interakce, které mohou způsobit těžké otravy, krvácení, nebo srdeční problémy. Okamžitě volejte záchranku (155) nebo jděte na pohotovost.

PŘÍKLADY NEZNÁMÝCH LÉKŮ:
- Lokální názvy přípravků (Bitinex, Leram, apod.)
- Neobvyklé názvy bez jasné účinné látky
- Přípravky, u kterých si nejsi jistý složením

PŘÍKLADY ZNÁMÝCH LÉKŮ:
- Mezinárodní názvy (Sertralin, Warfarin, Ibuprofen)
- Jasně identifikovatelné účinné látky

Příklad dobré odpovědi:
"Tyto dva léky společně mohou způsobit, že se vám bude více točit hlava a budete se cítit slabí. Může se stát, že při vstávání z postele nebo ze židle se budete cítit nejistě. To je nebezpečné kvůli pádu."

PŘÍKLADY SEVERITY LEVELS:
- LOW: "Omeprazol může mírně snížit účinnost jiného léku - není to nebezpečné"
- MEDIUM: "Kombinace může způsobit silnější únavu a závrať - sledujte příznaky"  
- HIGH: "Riziko vážného krvácení - urgentně kontaktujte lékaře"
- CRITICAL: "Riziko serotoninového syndromu - okamžitá lékařská pomoc při horečce, třesu, zmatenosti"

PŘÍKLADY SPRÁVNÝCH WARNINGS:
- "Okamžitě volejte lékaře pokud máte silné svalové křeče a cítíte se velmi slabí"
- "Jděte na pohotovost pokud se vám začne nepravidelně bít srdce nebo máte problémy s dýcháním"
- "Volejte 155 pokud krvácíte a krvácení se nezastaví do 10 minut"

ODPOVĚĎ MUSÍ BÝT POUZE JSON BEZ ŽÁDNÝCH MARKDOWN BLOKŮ NEBO DODATEČNÉHO TEXTU.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    
    if (content.type !== 'text') {
      throw new Error('Neočekávaný typ odpovědi od Claude API');
    }

    try {
      // Pokus o přímé parsování JSON
      let jsonText = content.text.trim();
      
      // Pokud je odpověď v markdown bloku, extrahuj JSON
      const jsonMatch = jsonText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }
      
      // Odstraň případné markdown formátování
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      
      const analysis = JSON.parse(jsonText);
      return NextResponse.json(analysis);
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError);
      console.error('Raw response:', content.text);
      return NextResponse.json(
        { error: 'Chyba při zpracování odpovědi od AI' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 