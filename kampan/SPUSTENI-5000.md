# Test 5 000 Kč – zmenitdodavatele.cz (7 dní, 23.–29. 11. 2026)

Stav 20. 11. 2026: **nic není založené ani spuštěné.** Rozpočet schválil Václav: strop **5 000 Kč** na test zhruba na týden, pak vyhodnocení.
Čísla CPC, konverzí a leadů jsou **ODHADY**. Ověřit je půjde až z prvních dnů.

## 1. Reklamní účty – co je připravené

| Kanál | Účet | Platba | Měření na zmenitdodavatele.cz | API / skript | Verdikt |
|---|---|---|---|---|---|
| **Google Ads** | 582-729-4543 (běží G7 250, G6 40, G4 90, G5 70 Kč/den) | **automatické platby, aktivní** (kampaně utrácejí) | **zapnuto 20. 11.**: konverze „Odeslání formuláře (generate_lead)“ `AW-17912521333/bn31CLehifYbEPXErd1C` (stejná jako na PE), Consent Mode v2 + cookie lišta, odpálí se na děkovné stránce po potvrzení CRM | API funguje (`marketing-agenti/scripts/google_*.py`), ale skripty jsou natvrdo pro G4–G7, obecný skript pro novou kampaň není | **použít**, žádný nový závazek |
| Sklik | účet existuje, 1 kampaň „01 \| BRAND \| nejsemosel.cz“ (pozastavená) | **neověřeno**; Sklik je předplacený kredit → nutné dobití = nový závazek | `SKLIK_CONV_ID` nenastaveno | konektor Fénix, ale token jen pro čtení (`scope: r`); Sklik v plánu odložen do 1. 2. 2027 | teď ne |
| Meta | Business 270807690598411, stránka PE 101025148756075 | **neověřeno** (úkol MAJ-09 „limit útraty, platba, ověření inzerenta“ čeká) | **bez Pixelu** (žádný dataset/pixel ID) | `create_meta_pe_leads.py` je pro Lead Ads PE; aplikace není v režimu Live | teď ne |

Proč ne Sklik/Meta v tomto testu: oba by znamenaly nový platební závazek a Meta bez Pixelu optimalizuje jen na prokliky. Za 7 dní by se nestihly naučit.

## 2. Plán do 5 000 Kč (vše Google Ads 582-729-4543)

| Kampaň | Segment | Kč/den | 7 dní max | CPC (odhad) | Konv. poměr (odhad) | Leady za 7 dní (odhad) | CPL (odhad) | Limit CPL |
|---|---|---|---|---|---|---|---|---|
| **G8 \| ZD \| Search \| Výpověď a termín** | domácnosti (+ OSVČ) | **450** | 3 150 | 8–15 Kč | 2–4 % | 4–10 | 300–600 | 420 |
| **G9 \| ZD \| Search \| Zdražení ČEZ firmy** | OSVČ, firmy, SVJ | **200** | 1 400 | 15–30 Kč | 3–5 % | 1–4 | 350–1 400 | 1 320 |
| **G7 – varianta reklam 50/50 na zmenitdodavatele.cz** | domácnosti | **0 navíc** (rozpočet G7 250 Kč/den beze změny) | 0 | jako G7 | – | porovnání PE vs. ZD | – | 420 |
| **Celkem nové peníze** | | **650 Kč/den** | **≤ 4 550 Kč** | | | **~5–14 (odhad)** | | |

Rezerva do stropu: 450 Kč. Google smí jeden den utratit až 2× denní rozpočet, ale za dny, kdy kampaň běží, nevyúčtuje víc než součet denních rozpočtů. Při konci 29. 11. je tedy tvrdý strop 4 550 Kč.

**Proč tohle a ne víc ČEZ slov:** G7 už kupuje „čez zdražení“, „výpověď čez“ atd. pro PE. Druhá kampaň na stejná slova by soutěžila sama se sebou. Proto:
- **G8** cílí na záměr „výpověď smlouvy / výpovědní lhůta“. V G7 není a zmenitdodavatele.cz na něj má unikátní kalkulačku termínu výpovědi s formulářem. Slova „čez“ a „innogy“ jsou v G8 vylučující, takže ČEZ dotazy zůstávají v G7.
- **G9** cílí na podnikatele a ČEZ ceník. Google u totožného dotazu dá přednost přesnější shodě G9 před frázovou „čez zdražení“ v G7. Firmy tak skončí na firemní landing page s firemními fakty, G7 na domácnosti zůstává.
- **G7 varianta reklam** (bez peněz): polovina zobrazení G7 vede na `zmenitdodavatele.cz/zdrazeni-cez/domacnost` místo `porovnanienergii.cz/zdrazeni-2027`. Za týden je vidět, která stránka dělá víc leadů na proklik.

### Pravidla testu

- **Denně** projít hledané výrazy u G8/G9 a nesmysly přidat do vylučujících.
- **Vypnout G8**, když utratí **840 Kč bez leadu**, nebo když je po 3 leadech CPL nad 420 Kč.
- **Vypnout G9**, když utratí **1 320 Kč bez leadu** (prakticky celý týdenní rozpočet).
- **Vypnout sestavu**, když má CTR pod 2 % po 500 zobrazeních. Nejdřív zkusit opravit texty.
- **Lead se počítá** z e-mailu z CRM (`akce: zmenitdodavatele`, `utm_content=g8-vypoved` / `g9-firmy` / `g7-zd`), ne jen z Google Ads (konverze se do Ads propíše jen při souhlasu s cookies).
- Do vyhodnocení **nenavyšovat**.

### Vyhodnocení (30. 11. – 1. 12.)

Po kampaních: útrata, prokliky, CPC, leady z CRM, CPL vs. limit, kvalita leadů (dovolali jsme se, zájem, segment). G7 varianta: leady na proklik PE vs. ZD.
**Rozhodnutí pro špičku 2.–12. 12.** (ČEZ rozesílá oznámení):
- co je pod 70 % limitu CPL, pokračuje (+30 %),
- co je nad limitem, se vypne,
- vítězná landing page G7 dostane 100 %.

## 3. Co je založené a pozastavené

- **V Google Ads zatím nic.** Obecný skript pro novou kampaň v `marketing-agenti` není (skripty jsou natvrdo pro G4–G7) a nový skript s klíči z `.env` jsem nepsal. Do marketing-agenti jsem nic nezapisoval.
- **Hotové na webu:** měření konverzí Google Ads (proměnné repa `GADS_ID`, `GADS_LEAD_LABEL`, nasazeno a ověřeno 20. 11.). Cílové stránky vracejí 200 a mají formulář.
- **Podklad pro založení:** `kampan/spusteni-5000-google-ads-editor.csv` (generuje `kampan/spusteni5000.py`, kontroluje délky textů a součet rozpočtu). Kampaně jsou v něm se stavem **Paused**.

## 4. Co udělat v prohlížeči

### A) Zkontrolovat konverzi (2 min)
<https://ads.google.com> → účet 582-729-4543 → **Cíle → Konverze → Souhrn** → akce „Odeslání formuláře“ / generate_lead se štítkem `bn31CLehifYbEPXErd1C` musí existovat a být **aktivní** (ideálně primární). Pokud je jiná, pošlete štítek a změním proměnnou `GADS_LEAD_LABEL`.

### B) Založit G8 a G9 jako POZASTAVENÉ
**Varianta 1 – Google Ads Editor** (nejrychlejší): stáhnout účet → *Účet → Importovat → Z souboru* → `spusteni-5000-google-ads-editor.csv` → zkontrolovat náhled (stav Paused, rozpočty 450/200, konec 29. 11.) → *Odeslat*.
Pokud Editor nějaký sloupec nepozná, použít variantu 2.
**Varianta 2 – ručně ve webu:** Kampaně → **+ Nová kampaň** → Cíl: Potenciální zákazníci → Vyhledávání → web `zmenitdodavatele.cz` → konverze „Odeslání formuláře“ → nastavení přesně podle tabulek níže. **Vypnout „Partneři ve vyhledávání“ i „Obsahovou síť“**, lokalita Česko – „Přítomnost“, jazyk čeština, *Další nastavení → datum zahájení 23. 11., ukončení 29. 11. 2026*. Nabídky: Kliknutí → Max. CPC limit. Na konci průvodce kampaň **pozastavit** (nebo uložit a hned přepnout stav na Pozastaveno).
**Spuštění:** 23. 11. ráno přepnout G8 a G9 na *Aktivní*.

### C) G7 varianta reklam 50/50 (bez peněz)
Kampaně → **Experimenty → Varianty reklam → +** → Kampaně: jen *G7 | PE | Search | Zdražení 2027* → Typ: **Aktualizovat adresy URL** → Finální URL: najít `https://porovnanienergii.cz/zdrazeni-2027?` a nahradit za
`https://zmenitdodavatele.cz/zdrazeni-cez/domacnost?utm_content=g7-zd&`
→ rozdělení **50 %**, začátek 23. 11., konec 29. 11. 2026 → Uložit.
(UTM z G7 zůstanou za tím, web vezme první `utm_content` = `g7-zd`.)
Pozor: 5 dřívějších zamítnutí G7 bylo za 404. Stránka PE teď vrací 200 (ověřeno 20. 11.), u zamítnutých reklam dát *Odvolat se*.

## 5. Kampaně – texty, slova, URL (stejné jako v CSV)

### G8 | ZD | Search | Výpověď a termín

Denní rozpočet **450 Kč**, Max. kliknutí, strop CPC **20 Kč**, 2026-11-23 – 2026-11-29, jen Vyhledávání Google (bez partnerů), Česko – přítomnost, čeština, stav POZASTAVENO.

**Sestava „Výpověď smlouvy“** – cílová URL `https://zmenitdodavatele.cz/kalkulacky/termin-vypovedi`, přípona finální URL `utm_source=google&utm_medium=cpc&utm_campaign=zd-test-5000&utm_content=g8-vypoved&utm_term={keyword}`

Klíčová slova: "výpověď smlouvy na elektřinu", "výpověď smlouvy na plyn", "výpověď smlouvy na energie", "jak vypovědět smlouvu na elektřinu", "jak vypovědět smlouvu na plyn", "výpovědní lhůta elektřina", "výpovědní doba elektřina", "výpovědní lhůta plyn", "kdy podat výpověď elektřina", "výpověď dodavateli elektřiny", "výpověď smlouvy na dobu neurčitou elektřina", [výpověď smlouvy elektřina], [výpověď elektřiny]

Vylučující (frázová, na kampaň): čez, innogy, vzor, pdf, word, stěhování, úmrtí, nájem, nájemní, pronájem, zaměstnanec, pracovní, internet, telefon, o2, vodafone, t-mobile, pojištění, odstoupení od smlouvy uzavřené na dálku, zdarma ke stažení

| # | Nadpis (≤ 30) | Zn. |
|---|---|---|
| 1 | Výpověď smlouvy na energie | 26 |
| 2 | Spočítejte termín výpovědi | 26 |
| 3 | Kalkulačka výpovědi zdarma | 26 |
| 4 | Kdy můžete smlouvu vypovědět | 28 |
| 5 | Výpověď elektřiny i plynu | 25 |
| 6 | Lhůta 20 dní před koncem | 24 |
| 7 | Bez fixace? 3 měsíce výpovědi | 29 |
| 8 | Nezávazné srovnání nabídek | 26 |
| 9 | Zprostředkovatel ERÚ | 20 |
| 10 | Pomůžeme s výběrem dodavatele | 29 |
| 11 | Nic nepodepisujete předem | 25 |
| 12 | Výsledek hned na obrazovce | 26 |
| 13 | Domácnosti, OSVČ i firmy | 24 |
| 14 | Zavolá vám člověk, ne robot | 27 |
| 15 | Firma od roku 2009 | 18 |

| # | Popis (≤ 90) | Zn. |
|---|---|---|
| 1 | Zadejte typ smlouvy a datum. Kalkulačka ukáže poslední den, kdy výpověď musí dorazit. | 85 |
| 2 | Smlouvu na dobu neurčitou lze vypovědět kdykoli, výpovědní doba jsou tři měsíce (ERÚ). | 86 |
| 3 | Chcete levnějšího dodavatele? Připravíme nezávazné srovnání a pomůžeme se změnou. | 81 |
| 4 | Registrovaný zprostředkovatel ERÚ. Ozveme se zpravidla do jednoho pracovního dne. | 81 |

### G9 | ZD | Search | Zdražení ČEZ firmy

Denní rozpočet **200 Kč**, Max. kliknutí, strop CPC **35 Kč**, 2026-11-23 – 2026-11-29, jen Vyhledávání Google (bez partnerů), Česko – přítomnost, čeština, stav POZASTAVENO.

**Sestava „ČEZ podnikatelé“** – cílová URL `https://zmenitdodavatele.cz/zdrazeni-cez/firmy`, přípona finální URL `utm_source=google&utm_medium=cpc&utm_campaign=zd-test-5000&utm_content=g9-firmy&utm_term={keyword}`

Klíčová slova: [čez zdražení podnikatelé], "čez zdražení podnikatelé", "čez ceník podnikatelé 2027", "čez elektřina podnikatelé", "elektřina na dobu neurčitou podnikatelé", "čez zdražení firmy", "čez zdražení osvč", "čez zdražení živnostník", "zdražení elektřiny podnikatelé 2027", "zdražení energií firmy 2027", "čez zdražení svj"

Vylučující (frázová, na kampaň): domácnost, domácnosti, byt, akcie, dividenda, burza, práce, kariéra, e.on, eon, innogy

| # | Nadpis (≤ 30) | Zn. |
|---|---|---|
| 1 | Zdražení ČEZ pro podnikatele | 28 |
| 2 | ČEZ od 1. 1. 2027 +330 Kč/MWh | 29 |
| 3 | Ceník na dobu neurčitou dráž | 28 |
| 4 | OSVČ mohou odejít bez sankce | 28 |
| 5 | U s.r.o. rozhoduje smlouva | 26 |
| 6 | Nezávazná nabídka pro firmu | 27 |
| 7 | Elektřina pro firmy a SVJ | 25 |
| 8 | Ozvěte se do 12. 12. 2026 | 25 |
| 9 | Zprostředkovatel ERÚ | 20 |
| 10 | Spočítejte dopad zdražení | 25 |
| 11 | Nabídka na míru zdarma | 22 |
| 12 | Pro OSVČ, firmy i SVJ | 21 |
| 13 | Nic nepodepisujete předem | 25 |
| 14 | Zavolá vám člověk, ne robot | 27 |
| 15 | Firma od roku 2009 | 18 |

| # | Popis (≤ 90) | Zn. |
|---|---|---|
| 1 | ČEZ zvyšuje ceník Elektřina na dobu neurčitou pro podnikatele o 330 Kč/MWh s DPH. | 81 |
| 2 | Podnikající fyzické osoby mohou bez sankce odejít. U právnických osob rozhoduje smlouva. | 88 |
| 3 | Připravíme nezávaznou nabídku na míru. Nic nepodepisujete předem, rozhodnutí je na vás. | 87 |
| 4 | Registrovaný zprostředkovatel ERÚ. Aby nový dodavatel stihl 1. 1., ozvěte se do 12. 12. | 87 |
