# Odkazy a bannery z porovnanienergii.cz a nejsemosel.cz na zmenitdodavatele.cz (návrh 20. 11. 2026)

Stav: **jen návrh**, do repozitářů `strakaw-cmd/Porovnanienergii_2026` (správce Pabyška) a `strakaw-cmd/nejsemosel` nic není pushnuto.

## Zásada: nekanibalizovat porovnanienergii.cz

porovnanienergii.cz má vlastní silnou stránku `/zdrazeni-2027` (cíl Google Ads G7) a formulář. Posílat odtamtud lidi na jiný web, kde je jen další formulář, by konverze **snížilo**. Proto:

- Z PE odkazujeme jen na to, co PE nemá: **kalkulačku termínu výpovědi** a **kalkulačky úspory**. Takový odkaz pomáhá návštěvníkovi i SEO zmenitdodavatele.cz (relevantní zpětný odkaz ze silné domény).
- Na nejsemosel.cz může být klasický banner „Zdražuje vám ČEZ?“. Web je tematicky podobný, ale menší, takže kanibalizace je menší.
- Všechny odkazy mají UTM. Lead z nich přijde do CRM s `utm_source=porovnanienergii` nebo `utm_source=nejsemosel` (řádek „tracking:“ v e-mailu z CRM).
- Odkazy jsou `dofollow`, bez `rel="sponsored"`. Je to vlastní síť webů stejného provozovatele, takže jde o redakční odkazy, ne placené. Nepřehánět ale počet: max. 1 odkaz na stránku, žádné patičkové „farmy“.

## porovnanienergii.cz – 3 místa

| # | Kde (soubor) | Text | Kam vede |
|---|---|---|---|
| PE1 | `src/pages/zdrazeni-2027.astro`, sekce „Termíny pro zdražení od 1. 1. 2027“ (pod seznamem termínů) | „Nevíte, kdy přesně vám běží výpovědní lhůta u jiné smlouvy (fixace, doba neurčitá)? **Spočítejte si termín výpovědi** v kalkulačce.“ | `https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi?utm_source=porovnanienergii&utm_medium=referral&utm_campaign=odkazy&utm_content=zdrazeni-2027` |
| PE2 | `src/content/poradna/konec-fixace-elektriny-a-plynu.json`, odstavec o 20denní lhůtě (§ 11c) | „Poslední den pro výpověď si můžete **spočítat v kalkulačce termínu výpovědi**.“ | `https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi?utm_source=porovnanienergii&utm_medium=referral&utm_campaign=odkazy&utm_content=konec-fixace` |
| PE3 | `src/components/layout/footer.html`, sloupec „Stránky“, za „Kalkulačka distribuční sazby“ | `<li><a href="https://zmenitdodavatele.cz/kalkulacky/?utm_source=porovnanienergii&utm_medium=referral&utm_campaign=odkazy&utm_content=paticka">Kalkulačky úspory a výpovědi</a></li>` | `/kalkulacky/` |

**Zatím ne:** banner nad kalkulačkou na úvodní stránce PE (callout `kampan/bannery/porovnanienergii-callout.html` vede na formulář na jiném webu → kanibalizace). Použít jen, pokud by PE stránku /zdrazeni-2027 přestalo mít.

### Text issue pro Porovnanienergii_2026 (pro Pabyšku)

> **Název:** Odkazy na kalkulačky zmenitdodavatele.cz (3 místa)
>
> Ahoj, prosím o tři malé odkazy na náš nový web zmenitdodavatele.cz (stejná firma, kalkulačky, které PE nemá). Nic jiného neměnit.
>
> 1. `src/pages/zdrazeni-2027.astro` – pod seznam „Termíny pro zdražení od 1. 1. 2027“ přidat odstavec:
>    `<p>Nevíte, kdy přesně vám běží výpovědní lhůta u jiné smlouvy (fixace, doba neurčitá)? <a href="https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi?utm_source=porovnanienergii&utm_medium=referral&utm_campaign=odkazy&utm_content=zdrazeni-2027">Spočítejte si termín výpovědi</a> v kalkulačce.</p>`
> 2. `src/content/poradna/konec-fixace-elektriny-a-plynu.json` – za odstavec o 20denní lhůtě (§ 11c) přidat větu:
>    `Poslední den pro výpověď si můžete <a href="https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi?utm_source=porovnanienergii&utm_medium=referral&utm_campaign=odkazy&utm_content=konec-fixace">spočítat v kalkulačce termínu výpovědi</a>.`
> 3. `src/components/layout/footer.html` – ve sloupci „Stránky“ za `Kalkulačka distribuční sazby`:
>    `<li><a href="https://zmenitdodavatele.cz/kalkulacky/?utm_source=porovnanienergii&utm_medium=referral&utm_campaign=odkazy&utm_content=paticka">Kalkulačky úspory a výpovědi</a></li>`
>
> Odkazy bez `nofollow`. Díky!

## nejsemosel.cz – 3 místa

| # | Kde (soubor) | Text | Kam vede |
|---|---|---|---|
| NO1 | `src/pages/index.astro`, pod hero (nad první sekcí) – do **22. 12. 2026**, pak odstranit | Banner z `kampan/bannery/nejsemosel-banner.html`: „Zdražuje vám ČEZ od 1. 1. 2027? … Ověřit za tři otázky →“ | `https://zmenitdodavatele.cz/zdrazeni-cez/?utm_source=nejsemosel&utm_medium=referral&utm_campaign=zdrazeni-cez&utm_content=banner` |
| NO2 | `src/content/pruvodce/zdrazeni-2027.md`, na konec části o lhůtách | „Kdy přesně podat výpověď u vaší smlouvy, si **spočítáte v kalkulačce termínu výpovědi**.“ | `https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi?utm_source=nejsemosel&utm_medium=referral&utm_campaign=odkazy&utm_content=pruvodce-zdrazeni` |
| NO3 | `src/components/layout/Footer.astro`, nav „Stránky webu“ za „Evidoo – měření spotřeby“ | „Kalkulačky změny dodavatele“ | `https://zmenitdodavatele.cz/kalkulacky/?utm_source=nejsemosel&utm_medium=referral&utm_campaign=odkazy&utm_content=paticka` |

### Text issue pro nejsemosel

> **Název:** Banner Zdražení ČEZ + odkazy na kalkulačky zmenitdodavatele.cz
>
> 1. `src/pages/index.astro` – pod hero vložit blok z `strakaw-cmd/leadweb` → `kampan/bannery/nejsemosel-banner.html` (inline styly, bez skriptů a cookies). Zobrazovat do 22. 12. 2026, pak smazat.
> 2. `src/content/pruvodce/zdrazeni-2027.md` – na konec části o lhůtách: `Kdy přesně podat výpověď u vaší smlouvy, si [spočítáte v kalkulačce termínu výpovědi](https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi?utm_source=nejsemosel&utm_medium=referral&utm_campaign=odkazy&utm_content=pruvodce-zdrazeni).`
> 3. `src/components/layout/Footer.astro` – v `<nav aria-label="Stránky webu">` za odkaz Evidoo přidat odkaz se stejnými třídami: text „Kalkulačky změny dodavatele“, href `https://zmenitdodavatele.cz/kalkulacky/?utm_source=nejsemosel&utm_medium=referral&utm_campaign=odkazy&utm_content=paticka`.

## Jak se to pozná v číslech

Lead z odkazu má v e-mailu z CRM (`Zprava z kalkulatoru` → turkova@) řádky `akce: zmenitdodavatele`, `Přišel z: porovnanienergii.cz (utm_source=porovnanienergii)` a `tracking: utm_source=porovnanienergii, …, utm_site=zmenitdodavatele.cz`.
