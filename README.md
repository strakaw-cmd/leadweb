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
