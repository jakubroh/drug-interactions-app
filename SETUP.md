# Nastavení aplikace

## 1. Konfigurace API klíče

Pro funkčnost analýzy interakcí je potřeba Claude API klíč:

1. Jděte na [Anthropic Console](https://console.anthropic.com/)
2. Vytvořte účet nebo se přihlaste
3. Vytvořte nový API klíč
4. Vytvořte soubor `.env.local` v kořenovém adresáři projektu:

```bash
# Claude API klíč
ANTHROPIC_API_KEY=sk-ant-api03-...
```

## 2. Spuštění aplikace

```bash
npm run dev
```

Aplikace bude dostupná na http://localhost:3000

## 3. Testování

1. Přidejte několik léků pomocí formuláře
2. Klikněte na "Analyzovat interakce"
3. Prohlédněte si výsledky analýzy

## 4. Bezpečnostní poznámky

- API klíč je uložen pouze lokálně v `.env.local`
- Data léků se ukládají do localStorage prohlížeče
- Aplikace nenahrazuje lékařskou konzultaci 