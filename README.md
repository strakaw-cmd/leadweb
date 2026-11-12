# Změnit dodavatele – obsahový lead-gen web

- `src/build.mjs` → statický web do `public/` (průvodci `src/articles.mjs`, kalkulačky a formulář `src/app.js`).
- Formulář posílá JSON na `/api/lead`; backend ověří vstup, honeypot (`website`) a minimální čas vyplnění, a lead přepošle do CRM
  na veřejný endpoint webových formulářů `https://porovnanienergii.cz/api/send-msg` (stejný formát jako formuláře porovnanienergii.cz / nejsemosel.cz:
  urlencoded `h=1, name, email, t, subject, promo, marketing_optin=0, message` + utm). Úspěch = JSON pole délky 3. Žádný API klíč.
- Backend 1: `server.js` (Node, bez závislostí) – ukládá `data/leads.jsonl`, `data/crm-log.jsonl`, návštěvnost bez cookies `data/pageviews.jsonl`,
  přehled na tajné cestě `data/stats-path.txt`. Spuštění `./run.sh`.
- Backend 2: Cloudflare Pages – `public/` jako výstup, `functions/api/lead.js` jako funkce (volitelný KV binding `LEADS` jako záloha).
  Analytika: Cloudflare Web Analytics (bez cookies) zapnout v nastavení projektu Pages.
- Build pro produkční doménu: `SITE_URL=https://www.zmenitdodavatele.cz node src/build.mjs` (bez SITE_URL je web `noindex`).
- Web nikomu neposílá e-maily ani SMS.

## Kampaň Zdražení ČEZ (funnel)
- Fakta na jednom místě: `src/cez.mjs` (datum účinnosti, lhůta výpovědi, navýšení, zdroje). Stránky: `src/funnel.mjs`, kvíz v `src/app.js`.
- `/zdrazeni-cez` (rozcestník + kvíz + formulář + FAQ), `/zdrazeni-cez/domacnost`, `/zdrazeni-cez/firmy`, `/zdrazeni-cez/dekujeme`, průvodce `/pruvodce/zdrazeni-cez-2027`.
- Lead z funnelu: subject začíná `[Zdražení ČEZ – neurčitá smlouva]`, zpráva obsahuje `Kampaň: zdrazeni-cez` a `Odpovědi z kvízu: …`.
- Kroky funnelu (bez cookies): zobrazení landingu, `quiz_start`, `quiz_done` (+ výsledek), `form_start`, `lead` → přehled statistik, sekce „Funnel Zdražení ČEZ“.
- UTM odkazy (doplnit doménu):
  - nejsemosel.cz: `/zdrazeni-cez?utm_source=nejsemosel&utm_medium=referral&utm_campaign=zdrazeni-cez`
  - Google Ads domácnosti: `/zdrazeni-cez/domacnost?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez&utm_content=domacnost`
  - Google Ads firmy: `/zdrazeni-cez/firmy?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez&utm_content=firmy`
  - Sklik: `/zdrazeni-cez?utm_source=seznam&utm_medium=cpc&utm_campaign=zdrazeni-cez`
  - Facebook/Meta: `/zdrazeni-cez?utm_source=facebook&utm_medium=paid_social&utm_campaign=zdrazeni-cez`
- Kontrola odkazů: `node scripts-linkcheck.mjs` (proti běžícímu serveru).

## GitHub Pages (statický hosting)
- Živě: https://strakaw-cmd.github.io/leadweb/ – nasazuje `.github/workflows/pages.yml` při každém pushi do `main`.
- Build: `SITE_URL=https://strakaw-cmd.github.io/leadweb BASE_PATH=/leadweb STATIC=1 node src/build.mjs`.
  `BASE_PATH` přidá podcestu ke všem interním odkazům, `STATIC=1` přepne formulář na přímé odeslání z prohlížeče
  na `https://porovnanienergii.cz/api/send-msg` (stejný formát jako `functions/api/lead.js`, CORS povoleno), honeypot a minimální čas
  vyplnění se kontrolují v prohlížeči. Události funnelu (`/api/event`) se na statickém hostingu neposílají a lead se neukládá jinam než do CRM.
- Složka `data/` (leady, návštěvnost, logy) se do gitu nikdy nedává.

## Měření, vlastní doména, kampaň
- Celý plán kampaně (doména, měření, CRO, Google Ads/Sklik/Meta, bannery, SEO): `KAMPAN-CEZ.md`. Texty reklam + kontrola délek: `python3 kampan/ads.py --md`. Bannery: `kampan/bannery/`.
- Měření je vypnuté, dokud nejsou vyplněné proměnné repozitáře `GA4_ID`, `GADS_ID`, `GADS_LEAD_LABEL`, `GADS_CALL_LABEL`, `SKLIK_CONV_ID`, `SKLIK_RTG_ID`, `META_PIXEL_ID` (bez nich žádný skript ani cookie lišta). S nimi: Consent Mode v2 (výchozí odmítnuto), cookie lišta, nástroje se načtou až po souhlasu, konverze `lead` na děkovné stránce po potvrzení CRM.
- Vlastní doména: proměnná `CUSTOM_DOMAIN` (např. `www.zmenitdodavatele.cz`) → build bez `/leadweb`, s `CNAME`; v Settings → Pages nastavit stejnou doménu.

## Vzhled

Design 2026: `src/style.css` (bez frameworku, mobile-first), ikony inline SVG ve stylu Lucide (`src/icons.mjs`), písmo Inter (SIL OFL) v podmnožině pro češtinu v `src/fonts/` (~41 kB, kopíruje se do `public/fonts/`). Odpočet dní do lhůty doplňuje `app.js` do `.cd-num` z `data-deadline`.
