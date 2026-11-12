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
