# Instrukce pro použití aplikace

## 🚀 Rychlý start

1. **Otevřete aplikaci** v prohlížeči na http://localhost:3000
2. **Přidejte léky** kliknutím na "Přidat nový lék"
3. **Vyplňte formulář** s názvem, dávkou a frekvencí
4. **Analyzujte interakce** kliknutím na zelené tlačítko
5. **Prohlédněte si výsledky** a vytiskněte je pro lékaře

## 📋 Podrobné instrukce

### Přidání léku

1. Klikněte na modré tlačítko **"Přidat nový lék"**
2. Vyplňte formulář:
   - **Název léku**: Např. "Paralen", "Ibalgin", "Aspirin"
   - **Dávka**: Např. "500mg", "1 tableta", "10ml"
   - **Frekvence**: Např. "3x denně", "každých 8 hodin", "podle potřeby"
3. Klikněte na **"Přidat lék"**

### Správa léků

- **Upravit lék**: Klikněte na ikonu tužky vedle léku
- **Smazat lék**: Klikněte na ikonu koše vedle léku
- **Seznam léků**: Zobrazuje všechny přidané léky v tabulce

### Analýza interakcí

1. Přidejte alespoň **2 léky** do seznamu
2. Klikněte na zelené tlačítko **"Analyzovat interakce"**
3. Počkejte na zpracování (zobrazí se "Analyzuji...")
4. Prohlédněte si výsledky analýzy

### Výsledky analýzy

Analýza zobrazuje:

- **Identifikované interakce** s úrovní rizika:
  - 🟢 Nízké riziko
  - 🟡 Střední riziko  
  - 🟠 Vysoké riziko
  - 🔴 Kritické riziko

- **Doporučení pro pacienta** - praktické rady
- **Otázky pro lékaře** - co se zeptat při konzultaci
- **Upozornění** - na co si dát pozor

### Tisk výsledků

1. Klikněte na **"Tisknout"** v sekci výsledků
2. Vytiskněte si report pro lékaře
3. Vezměte si ho na konzultaci

## ⚠️ Důležité upozornění

- **Aplikace nenahrazuje lékařskou konzultaci**
- **Vždy se poraďte s lékařem** před změnami v užívání léků
- **V případě urgentních problémů** volejte 155
- **Data se ukládají lokálně** v prohlížeči

## 🔧 Technické poznámky

- Aplikace funguje offline (kromě analýzy)
- Data se automaticky ukládají
- Funguje na všech zařízeních (mobil, tablet, počítač)
- Pro analýzu je potřeba internetové připojení

## 🆘 Řešení problémů

### Analýza nefunguje
- Zkontrolujte internetové připojení
- Ujistěte se, že máte nastavený API klíč
- Přidejte alespoň 2 léky

### Data se nezobrazují
- Zkontrolujte, že používáte stejný prohlížeč
- Data se ukládají lokálně v prohlížeči

### Formulář nefunguje
- Zkontrolujte, že jste vyplnili všechna povinná pole
- Zkuste obnovit stránku 