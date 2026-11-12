(() => {
  const B = document.documentElement.dataset.base || '', STATIC = document.documentElement.dataset.static === '1';
  const fmt = (n) => Math.round(n).toLocaleString('cs-CZ') + ' Kč';
  const val = (f, n) => { const v = (f.elements[n]?.value || '').replace(/\s/g, '').replace(',', '.'); return v === '' ? null : Number(v); };
  const utm = {}; const sp = new URLSearchParams(location.search);
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']) { const v = sp.get(k) || sessionStorage.getItem('u_' + k); if (v) { utm[k] = v; sessionStorage.setItem('u_' + k, v); } }

  // ---- měření se souhlasem (aktivní jen když build vložil window.TRACK; jinak vše níže nic nedělá) ----
  const T = window.TRACK || null, CK = 'consent_v1';
  const M = { a: false, m: false, loaded: {}, queue: [] };
  const getConsent = () => { try { return JSON.parse(localStorage.getItem(CK) || 'null'); } catch { return null; } };
  const addScript = (src) => { const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); return s; };
  function applyConsent(c) {
    if (!T || !c) return;
    M.a = !!c.a; M.m = !!c.m;
    const g = (v) => (v ? 'granted' : 'denied');
    window.gtag('consent', 'update', { analytics_storage: g(M.a), ad_storage: g(M.m), ad_user_data: g(M.m), ad_personalization: g(M.m) });
    const needG = (M.a && T.ga4) || (M.m && T.ads);
    if (needG && !M.loaded.g) { M.loaded.g = 1; addScript('https://www.googletagmanager.com/gtag/js?id=' + (T.ga4 || T.ads)); window.gtag('js', new Date()); }
    if (M.a && T.ga4 && !M.loaded.ga4) { M.loaded.ga4 = 1; window.gtag('config', T.ga4); }
    if (M.m && T.ads && !M.loaded.ads) { M.loaded.ads = 1; window.gtag('config', T.ads); }
    if (M.m && (T.sklik || T.sklikRtg) && !M.loaded.rc) { M.loaded.rc = 1; const s = addScript('https://c.seznam.cz/js/rc.js'); s.onload = () => { if (T.sklikRtg && window.rc && window.rc.retargetingHit) window.rc.retargetingHit({ rtgId: Number(T.sklikRtg), consent: 1 }); flush(); }; }
    if (M.m && T.meta && !M.loaded.fb) { M.loaded.fb = 1;
      const f = window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); }; if (!window._fbq) window._fbq = f; f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
      addScript('https://connect.facebook.net/en_US/fbevents.js'); window.fbq('init', T.meta); window.fbq('track', 'PageView'); }
    flush();
  }
  function flush() { const q = M.queue.splice(0); q.forEach((fn) => { if (!fn()) M.queue.push(fn); }); }
  // Konverze: lead = odeslaný formulář potvrzený CRM (značka v sessionStorage, odpálí se na děkovné stránce, jednou), phone = klik na telefon.
  function conv(kind, p = {}) {
    if (!T) return;
    if (M.a && T.ga4) window.gtag('event', kind === 'lead' ? 'generate_lead' : 'phone_click', { send_to: T.ga4, ...p });
    if (M.m && T.ads) { const l = kind === 'lead' ? T.adsLead : T.adsCall; if (l) window.gtag('event', 'conversion', { send_to: T.ads + '/' + l }); }
    if (M.m && T.meta && window.fbq) window.fbq('track', kind === 'lead' ? 'Lead' : 'Contact');
    if (M.m && T.sklik && kind === 'lead') M.queue.push(() => { if (!(window.rc && window.rc.conversionHit)) return false; window.rc.conversionHit({ id: Number(T.sklik), value: null, consent: 1 }); return true; });
    flush();
  }
  function banner() {
    if (!T) return;
    let el = document.getElementById('cookiebar');
    if (!el) {
      el = document.createElement('div'); el.id = 'cookiebar'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Nastavení cookies');
      el.innerHTML = '<p><strong>Cookies</strong> – s vaším souhlasem použijeme analytické cookies (měření návštěvnosti) a marketingové cookies (měření reklam). Bez souhlasu web funguje stejně. <a href="' + B + '/ochrana-osobnich-udaju">Podrobnosti</a></p>'
        + '<div class="cb-opts" hidden><label class="ch"><input type="checkbox" disabled checked> Nezbytné</label><label class="ch"><input type="checkbox" name="a"> Analytické</label><label class="ch"><input type="checkbox" name="m"> Marketingové</label></div>'
        + '<div class="cb-btns"><button class="btn" data-c="all">Přijmout vše</button><button class="btn" data-c="none">Odmítnout</button><button class="btn ghost" data-c="set">Nastavení</button></div>';
      document.body.appendChild(el);
      el.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const opts = el.querySelector('.cb-opts');
        if (b.dataset.c === 'set') { if (opts.hidden) { opts.hidden = false; b.textContent = 'Uložit výběr'; return; } }
        const c = b.dataset.c === 'all' ? { a: true, m: true } : b.dataset.c === 'none' ? { a: false, m: false } : { a: opts.querySelector('[name=a]').checked, m: opts.querySelector('[name=m]').checked };
        c.t = new Date().toISOString(); try { localStorage.setItem(CK, JSON.stringify(c)); } catch {}
        el.hidden = true; applyConsent(c);
      });
    }
    const c = getConsent(); if (c) { el.querySelector('[name=a]').checked = !!c.a; el.querySelector('[name=m]').checked = !!c.m; }
    el.hidden = false;
  }
  if (T) {
    const c = getConsent(); if (c) applyConsent(c); else banner();
    document.addEventListener('click', (e) => { if (e.target.closest('[data-consent-open]')) { e.preventDefault(); banner(); } });
    try { const ok = sessionStorage.getItem('lead_ok'); if (ok && document.querySelector('[data-thanks-page]')) { sessionStorage.removeItem('lead_ok'); conv('lead', JSON.parse(ok)); } } catch {}
  }
  document.addEventListener('click', (e) => { const a = e.target.closest('a[href^="tel:"]'); if (a) { conv('phone', { link_url: a.getAttribute('href') }); ev('phone_click', { c: 'zdrazeni-cez' }); } });

  // Události funnelu jen tam, kde běží vlastní backend (server.js / Cloudflare). Na statickém hostingu (GitHub Pages) se na server nic neposílá;
  // pokud je zapnuté měření a návštěvník souhlasil s analytikou, kroky funnelu jdou do GA4.
  const beacon = STATIC ? () => {} : (e, extra = {}) => { try { const b = JSON.stringify({ e, p: location.pathname, ...extra }); navigator.sendBeacon ? navigator.sendBeacon(B + '/api/event', new Blob([b], { type: 'application/json' })) : fetch(B + '/api/event', { method: 'POST', body: b, keepalive: true }).catch(() => {}); } catch {} };
  const ev = (e, extra = {}) => { beacon(e, extra); if (T && M.a && T.ga4) window.gtag('event', e, { send_to: T.ga4, ...extra }); };
  let quizText = '';

  // ---- zbývající dny do lhůty (jen informace z data v cez.mjs; po lhůtě se nic nepřidá) ----
  document.querySelectorAll('[data-deadline]').forEach((el) => {
    const [y, mo, d] = el.dataset.deadline.split('-').map(Number), n = new Date(), sp = el.querySelector('.dleft');
    const days = Math.round((Date.UTC(y, mo - 1, d) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
    if (sp && days >= 0) sp.textContent = days === 0 ? ' – dnes je poslední den' : days === 1 ? ' – zbývá 1 den' : ` – zbývají ${days} dny`.replace(/zbývají (\d+) dny/, (m, k) => (k >= 5 ? `zbývá ${k} dní` : m));
    const box = el.querySelector('.cd-num');
    if (box && days >= 0) { box.querySelector('.cd-n').textContent = days === 0 ? 'dnes' : days; box.querySelector('.cd-k').textContent = days === 0 ? 'poslední den' : days >= 2 && days <= 4 ? 'zbývají' : 'zbývá'; box.querySelector('.cd-u').textContent = days === 0 ? '' : days === 1 ? 'den' : days <= 4 ? 'dny' : 'dní'; box.hidden = false; el.classList.add('on'); }
  });

  // ---- kvíz Zdražení ČEZ (fakta: src/cez.mjs, předávají se přes data-*) ----
  document.querySelectorAll('section.quiz').forEach((sec) => {
    const f = sec.querySelector('form'), out = sec.querySelector('.quizres'), seg = sec.dataset.seg;
    let started = false;
    f.addEventListener('change', () => { if (!started) { started = true; ev('quiz_start', { c: 'zdrazeni-cez' }); } });
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const q1 = f.elements.q1.value, q2 = f.elements.q2.value, forma = f.elements.forma ? f.elements.forma.value : '';
      if (!q1 || !q2) { out.hidden = false; out.innerHTML = '<p class="err">Odpovězte prosím na otázky 1 a 2.</p>'; return; }
      const el = val(f, 'q3el'), pl = val(f, 'q3pl'), z = val(f, 'q3z');
      const cez = ['el', 'pl', 'oboje'].includes(q1);
      let r, html;
      const right = forma === 'po'
        ? '<p>U firem (s.r.o., a.s.), SVJ a družstev se zákonné právo odejít bez postihu podle § 11a nevztahuje automaticky – rozhoduje smlouva a obchodní podmínky ČEZ. Zkontrolujte oznámení o změně ceny.</p>'
        : '<p><strong>Výpověď bez sankce stačí odeslat do 22. prosince 2026.</strong> Smlouva pak skončí 31. prosince 2026 a nový dodavatel může navázat od 1. ledna 2027.</p>';
      if (cez && q2 === 'neurcita') { r = 'tyka'; html = '<h3>Zdražení se vás týká</h3><p>Od 1. ledna 2027 platí u vaší smlouvy nové ceny ČEZ.</p>' + right; }
      else if ((cez && q2 === 'nevim') || (q1 === 'nevim' && q2 !== 'fixace')) { r = 'asi'; html = '<h3>Pravděpodobně se vás týká</h3><p>Ověřte na vyúčtování nebo v zákaznickém účtu, kdo je váš dodavatel a zda máte produkt „na dobu neurčitou“. Pokud ano:</p>' + right; }
      else if (cez && q2 === 'fixace') { r = 'fixace'; html = '<h3>Během fixace se vás zdražení netýká</h3><p>Pevnou cenu dodavatel během fixace měnit nemůže. Pohlídejte si konec fixace – při automatickém prodloužení musí výpověď dorazit nejpozději 20. den před koncem. <a href="' + B + '/kalkulacky/termin-vypovedi">Spočítat termín</a>.</p>'; }
      else { r = 'netyka'; html = '<h3>Tohle zdražení se vás netýká</h3><p>Týká se jen zákazníků ČEZ Prodej se smlouvou na dobu neurčitou. I jiní dodavatelé ale mohou ceny měnit – zdražení vám musí oznámit nejméně 30 dní předem.</p>'; }
      if (r === 'tyka' || r === 'asi') {
        const rows = [];
        if (el && q1 !== 'pl') rows.push(`elektřina ${el.toLocaleString('cs-CZ')} MWh × 330 Kč = <b>${fmt(el * 330)}</b> ročně navíc`);
        if (pl && q1 !== 'el') { if (seg === 'firmy' || forma) rows.push('plyn: ceník ČEZ pro podnikatele jsme neověřili, odhad neuvádíme'); else rows.push(`plyn ${pl.toLocaleString('cs-CZ')} MWh × 180 Kč = <b>${fmt(pl * 180)}</b> ročně navíc`); }
        const numeric = rows.some((x) => x.includes('<b>'));
        if (rows.length && !numeric) html += `<p class="muted">${rows.join(' ')}</p>`;
        if (numeric) html += `<p>Orientační navýšení za samotnou dodávku (s DPH):</p><ul><li>${rows.join('</li><li>')}</li></ul><p class="muted">Podle ceníků ČEZ (elektřina +330 Kč/MWh, u části dvoutarifních sazeb domácností +340 ve VT) a údajů ČEZ pro plyn domácností (+180 Kč/MWh). Bez změn regulované části.</p>`;
        else if (z) html += '<p class="muted">Z výše zálohy navýšení spolehlivě spočítat nejde (záloha je jen odhad). Pro odhad zadejte roční spotřebu z vyúčtování.</p>';
        html += '<p><a class="btn" href="#poptavka">Chci porovnat nabídky</a> <a class="btn ghost" href="tel:+420737225960">Zavolat 737 225 960</a></p>';
      }
      out.hidden = false; out.innerHTML = html;
      ev('quiz_done', { c: 'zdrazeni-cez', r });
      const L = { el: 'elektřina od ČEZ', pl: 'plyn od ČEZ', oboje: 'elektřina i plyn od ČEZ', jiny: 'jiný dodavatel', nevim: 'nevím' };
      quizText = `výsledek=${r}; dodavatel=${L[q1]}; smlouva=${q2}${forma ? '; odběratel=' + (forma === 'po' ? 'právnická osoba' : 'OSVČ') : ''}${el ? '; el ' + el + ' MWh' : ''}${pl ? '; plyn ' + pl + ' MWh' : ''}${z ? '; záloha ' + z + ' Kč' : ''}`;
      const lf = document.querySelector('form.leadform[data-campaign]');
      if (lf) {
        const k = { el: 'elektrina', pl: 'plyn', oboje: 'oboje' }[q1]; if (k) lf.querySelector(`input[name=komodita][value=${k}]`).checked = true;
        if (seg === 'firmy' || forma) lf.querySelector('input[name=segment][value=firma]').checked = true;
        if (!lf.elements.note.value) lf.elements.note.value = 'Zdražení ČEZ – neurčitá smlouva';
      }
    });
  });

  // ---- přímé odeslání do CRM (statický hosting): stejný formát jako functions/api/lead.js ----
  const SEG = { domacnost: 'Domácnost', firma: 'Firma / podnikatel', svj: 'SVJ / bytový dům' };
  const KOM = { elektrina: 'Elektřina', plyn: 'Plyn', oboje: 'Elektřina i plyn' };
  async function sendCrm(d) {
    const tag = 'zmenitdodavatele-web', t = new Date().toISOString();
    const id = (crypto.randomUUID && crypto.randomUUID()) || Date.now().toString(36) + Math.random().toString(36).slice(2);
    const phone = d.phone.replace(/[\s-]+/g, '').replace(/^(?:\+|00)420(?=\d{9}$)/, '');
    const note = d.note.slice(0, 1000), camp = d.campaign === 'zdrazeni-cez';
    const message = [`Jméno: ${d.name}`, `Telefon: ${phone}`, `E-mail: ${d.email}`, `Typ odběrného místa: ${SEG[d.segment]}`, `Komodita: ${KOM[d.komodita]}`, `Poznámka: ${note || '-'}`,
      ...(camp ? ['Kampaň: zdrazeni-cez', `Odpovědi z kvízu: ${String(d.quiz || '-').slice(0, 600)}`] : []), `Stránka: ${d.page || '-'}`, `Zdroj: ${tag} (obsahový web)`, `Souhlas GDPR: ano (${t})`, `ID na webu: ${id}`].join('\n');
    const body = new URLSearchParams({ h: '1', name: d.name.slice(0, 120), email: d.email.slice(0, 160), t: phone, subject: `${camp ? '[Zdražení ČEZ – neurčitá smlouva] ' : ''}Lead z webu ${tag}: ${SEG[d.segment]} – ${KOM[d.komodita]}`, promo: 'porovnanienergii.cz', marketing_optin: '0', message });
    for (const [k, v] of Object.entries(d.utm || {})) body.append(k, String(v).slice(0, 200));
    const r = await fetch('https://porovnanienergii.cz/api/send-msg', { method: 'POST', body, headers: { Accept: 'application/json' } });
    const j = await r.json().catch(() => null);
    return r.ok && Array.isArray(j) && j.length === 3;
  }

  const markLead = (d) => { if (T) try { sessionStorage.setItem('lead_ok', JSON.stringify({ lead_segment: d.segment, lead_commodity: d.komodita, campaign: d.campaign || 'web' })); } catch {} };
  // ---- lead form ----
  document.querySelectorAll('form.leadform').forEach((f) => {
    const t0 = Date.now(); const st = f.querySelector('.status'); const btn = f.querySelector('button');
    let fs = false; f.addEventListener('input', () => { if (!fs && f.dataset.campaign) { fs = true; ev('form_start', { c: f.dataset.campaign }); } });
    const showErr = (errs) => {
      f.querySelectorAll('.err').forEach((e) => e.remove());
      for (const [k, m] of Object.entries(errs)) { const el = f.elements[k]; const host = (el && (el.length ? el[0].closest('fieldset') : el.closest('label'))) || f; const p = document.createElement('p'); p.className = 'err'; p.textContent = m; host.appendChild(p); }
    };
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = { name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), email: f.elements.email.value.trim(), segment: f.elements.segment.value, komodita: f.elements.komodita.value,
        note: f.elements.note.value.trim(), website: f.elements.website.value, gdpr: f.elements.gdpr.checked, page: location.pathname, utm, ts: t0, campaign: f.dataset.campaign || '', quiz: f.dataset.campaign ? (quizText || 'kvíz nevyplněn') : '' };
      const errs = {};
      if (d.name.length < 2) errs.name = 'Vyplňte jméno.';
      if (!/^\d{9}$/.test(d.phone.replace(/[\s-]+/g, '').replace(/^(?:\+|00)420(?=\d{9}$)/, ''))) errs.phone = 'Telefon zadejte jako 9 číslic (případně s +420).';
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(d.email)) errs.email = 'Zkontrolujte e-mail.';
      if (!d.segment) errs.segment = 'Vyberte typ odběrného místa.';
      if (!d.komodita) errs.komodita = 'Vyberte energii.';
      if (!d.gdpr) errs.gdpr = 'Bez souhlasu nemůžeme údaje zpracovat.';
      showErr(errs); if (Object.keys(errs).length) return;
      btn.disabled = true; st.textContent = 'Odesílám…';
      try {
        const thanks = f.dataset.thanks || B + '/dekujeme';
        if (STATIC) {
          // honeypot a minimální čas vyplnění: robotům tváříme úspěch, nic neodesíláme
          if (d.website || Date.now() - t0 < 2500) { location.href = thanks; return; }
          if (await sendCrm(d)) { markLead(d); location.href = thanks; return; }
          throw new Error('crm');
        }
        const r = await fetch(B + '/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.ok) { markLead(d); location.href = thanks; return; }
        if (j.errors) showErr(j.errors);
        st.textContent = j.error || 'Odeslání se nepovedlo, zkuste to prosím znovu.';
      } catch { st.textContent = 'Odeslání se nepovedlo, zkontrolujte připojení a zkuste to znovu.'; }
      btn.disabled = false;
    });
  });

  // ---- calculators ----
  const row = (a, b, c) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`;
  function savings(cur, nw, vat, penalty) {
    const k = 1 + (vat ?? 21) / 100, diff = (cur - nw) * k;
    let out = `<p>Roční náklad na neregulovanou část (s DPH): současná smlouva <b>${fmt(cur * k)}</b>, nová nabídka <b>${fmt(nw * k)}</b>.</p>`;
    out += diff > 0 ? `<p class="big">Odhad úspory: ${fmt(diff)} ročně (${fmt(diff / 12)} měsíčně)</p>` : `<p class="big">Nová nabídka vychází o ${fmt(-diff)} ročně dráž.</p>`;
    if (penalty && diff > 0) { const m = penalty / (diff / 12); out += `<p>Smluvní pokuta ${fmt(penalty)} se vrátí zhruba za <b>${m.toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} měsíců</b>.</p>`; }
    return out + '<p class="muted">Distribuce, poplatky a daň z energie se změnou dodavatele nemění, proto nejsou zahrnuty. Výsledek je orientační.</p>';
  }
  document.querySelectorAll('form.calc').forEach((f) => {
    const res = f.querySelector('.result');
    if (f.dataset.calc === 'vypoved') {
      const sync = () => { const t = f.elements.typ.value; f.querySelectorAll('[class^="t-"],[class*=" t-"]').forEach((el) => { if (el.tagName === 'DIV' || el.tagName === 'LABEL') el.hidden = !el.className.split(' ').includes('t-' + t); }); };
      f.addEventListener('change', sync); sync();
    }
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const c = f.dataset.calc;
      if (c === 'el') {
        const vt = val(f, 'vt') || 0, nt = val(f, 'nt') || 0;
        const need = ['c_vt', 'c_fix', 'n_vt', 'n_fix'].concat(nt ? ['c_nt', 'n_nt'] : []);
        if (!vt || need.some((n) => val(f, n) == null)) { res.innerHTML = '<p class="err">Vyplňte spotřebu, ceny za MWh a stálé platy (NT jen pokud ho máte).</p>'; return; }
        const cost = (p) => (vt / 1000) * val(f, p + '_vt') + (nt / 1000) * (val(f, p + '_nt') || 0) + 12 * val(f, p + '_fix');
        res.innerHTML = savings(cost('c'), cost('n'), val(f, 'vat'), val(f, 'penalty'));
      } else if (c === 'pl') {
        let kwh = val(f, 'kwh'); const m3 = val(f, 'm3'), coef = val(f, 'coef');
        if (!kwh && m3 && coef) kwh = m3 * coef;
        if (!kwh || ['c_p', 'c_fix', 'n_p', 'n_fix'].some((n) => val(f, n) == null)) { res.innerHTML = '<p class="err">Vyplňte spotřebu (kWh, nebo m³ a koeficient) a ceny.</p>'; return; }
        const cost = (p) => (kwh / 1000) * val(f, p + '_p') + 12 * val(f, p + '_fix');
        res.innerHTML = `<p>Počítáme se spotřebou ${Math.round(kwh).toLocaleString('cs-CZ')} kWh/rok.</p>` + savings(cost('c'), cost('n'), val(f, 'vat'), val(f, 'penalty'));
      } else {
        const t = f.elements.typ.value, d = (s) => s ? new Date(s + 'T12:00:00') : null, cz = (x) => x.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
        if (t === 'urcita') {
          const k = d(f.elements.konec.value); if (!k) { res.innerHTML = '<p class="err">Zadejte konec smlouvy.</p>'; return; }
          const last = new Date(k); last.setDate(last.getDate() - 20);
          res.innerHTML = `<p class="big">Výpověď musí být doručena nejpozději ${cz(last)}.</p><p>Smlouva pak skončí ${cz(k)}. Dodavatel vám má nejméně 30 dní před prodloužením poslat oznámení o nových podmínkách.</p>`;
        } else {
          const r = d(f.elements.doruceni.value); if (!r) { res.innerHTML = '<p class="err">Zadejte datum doručení výpovědi.</p>'; return; }
          const start = new Date(r.getFullYear(), r.getMonth() + 1, 1, 12);
          let end;
          if (t === 'stehovani') { end = new Date(start); end.setDate(end.getDate() + 14); }
          else { const m = Math.max(0, Math.round(val(f, 'mesice') ?? 3)); end = new Date(start.getFullYear(), start.getMonth() + m, 0, 12); }
          res.innerHTML = `<p>Výpovědní doba začne běžet ${cz(start)}.</p><p class="big">Smlouva skončí ${cz(end)}.</p><p>Nová dodávka by měla začít ${cz(new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1, 12))}.</p>`;
        }
      }
    });
  });
})();
