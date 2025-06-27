# Nastavení GitHub repozitáře

## Krok 1: Vytvořte repozitář na GitHubu

1. Jděte na [GitHub.com](https://github.com) a přihlaste se
2. Klikněte na zelené tlačítko "New" nebo "+" → "New repository"
3. Zadejte název: `drug-interactions-app`
4. Vyberte "Public" nebo "Private" podle preference
5. **NEZAŠKRTÁVEJTE** "Add a README file" (už ho máme)
6. Klikněte "Create repository"

## Krok 2: Připojte lokální repozitář k GitHubu

Po vytvoření repozitáře na GitHubu spusťte tyto příkazy:

```bash
# Přidejte remote origin (nahraďte YOUR_USERNAME vaším GitHub uživatelským jménem)
git remote add origin https://github.com/YOUR_USERNAME/drug-interactions-app.git

# Pushněte kód na GitHub
git branch -M main
git push -u origin main
```

## Krok 3: Ověřte, že vše funguje

1. Jděte na váš GitHub repozitář
2. Měli byste vidět všechny soubory aplikace
3. Aplikace je připravena k použití!

## Poznámky

- Soubor `.env.local` s API klíčem se automaticky ignoruje (je v .gitignore)
- Všechny ostatní soubory jsou nahrány
- Repozitář obsahuje kompletní dokumentaci 