// Kontrola interních odkazů a kotev ve vygenerovaném public/ proti běžícímu serveru.
import fs from 'node:fs'; import path from 'node:path';
const base = process.argv[2] || 'http://127.0.0.1:8787';
const files = []; (function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })('public');
const links = new Map(); let bad = 0;
for (const f of files) { const h = fs.readFileSync(f, 'utf8'); for (const m of h.matchAll(/href="([^"]+)"/g)) { const u = m[1]; if (u.startsWith('/')) (links.get(u) || links.set(u, []).get(u)).push(f); } }
for (const [u, from] of links) {
  const [p, hash] = u.split('#'); const r = await fetch(base + (p || '/')); const t = await r.text();
  if (r.status !== 200) { bad++; console.log('BROKEN', r.status, u, 'z', from[0]); continue; }
  if (hash && !t.includes(`id="${hash}"`)) { bad++; console.log('NO ANCHOR', u, 'z', from[0]); }
}
console.log(`${files.length} stránek, ${links.size} interních odkazů, chyb: ${bad}`); process.exit(bad ? 1 : 0);
