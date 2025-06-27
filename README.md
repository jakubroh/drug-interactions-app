# Kontrola interakcí léků

Moderní webová aplikace pro kontrolu interakcí mezi léky pomocí AI. Aplikace pomáhá pacientům být lépe připraveni na konzultace s lékaři.

## Funkce

- ✅ **Formulář pro zadávání léků** - název, dávka, frekvence užívání
- ✅ **Seznam aktuálních léků** - možnost editace a mazání
- ✅ **Analýza interakcí** - pomocí Claude AI API
- ✅ **Report pro lékaře** - strukturovaný výstup s doporučeními
- ✅ **Lokální uložení** - data se ukládají do localStorage
- ✅ **Responzivní design** - funguje na všech zařízeních
- ✅ **Bezpečnostní upozornění** - důraz na lékařskou konzultaci

## Technický stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes
- **AI API**: Anthropic Claude API
- **Formuláře**: React Hook Form + Zod validace
- **Ikony**: Lucide React

## Instalace a spuštění

1. **Klonujte repozitář**
   ```bash
   git clone <repository-url>
   cd drug-interactions
   ```

2. **Nainstalujte závislosti**
   ```bash
   npm install
   ```

3. **Nakonfigurujte API klíč**
   
   Vytvořte soubor `.env.local` v kořenovém adresáři:
   ```bash
   # Claude API klíč
   ANTHROPIC_API_KEY=your_claude_api_key_here
   ```
   
   Získejte API klíč na [Anthropic Console](https://console.anthropic.com/)

4. **Spusťte vývojový server**
   ```bash
   npm run dev
   ```

5. **Otevřete aplikaci**
   
   Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000)

## Použití

1. **Přidání léků**: Klikněte na "Přidat nový lék" a vyplňte formulář
2. **Správa léků**: Upravte nebo smažte léky pomocí tlačítek v tabulce
3. **Analýza**: Klikněte na "Analyzovat interakce" pro AI analýzu
4. **Report**: Prohlédněte si výsledky a vytiskněte je pro lékaře

## Bezpečnostní upozornění

⚠️ **DŮLEŽITÉ**: Tato aplikace slouží pouze jako informativní nástroj a nenahrazuje lékařskou konzultaci. Vždy se poraďte se svým lékařem nebo lékárníkem před jakýmkoliv změnami v užívání léků.

## Vývoj

### Struktura projektu

```
src/
├── app/
│   ├── api/analyze/route.ts    # Claude API endpoint
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Hlavní stránka
├── components/
│   ├── MedicationForm.tsx      # Formulář pro léky
│   ├── MedicationList.tsx      # Seznam léků
│   └── InteractionReport.tsx   # Výsledky analýzy
├── types/
│   └── index.ts                # TypeScript interfaces
└── utils/
    └── storage.ts              # localStorage utility
```

### Přidání nových funkcí

1. Vytvořte novou komponentu v `src/components/`
2. Přidejte TypeScript typy do `src/types/index.ts`
3. Aktualizujte hlavní stránku v `src/app/page.tsx`

## Deployment

Aplikace je připravena pro deployment na Vercel:

```bash
npm run build
```

## Licence

MIT License - viz soubor LICENSE pro detaily.

## Podpora

Pro podporu nebo nahlášení chyb vytvořte issue v GitHub repozitáři.
