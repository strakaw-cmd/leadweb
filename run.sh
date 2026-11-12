#!/usr/bin/env bash
# Spuštění webu na boxu + veřejný Cloudflare Quick Tunnel (bez účtu; URL se mění při restartu tunelu).
cd "$(dirname "$0")"
node src/build.mjs
pgrep -f "node server.js" >/dev/null || (PORT=8787 nohup node server.js >> data/server.log 2>&1 &)
pgrep -f "cloudflared tunnel --url" >/dev/null || (nohup cloudflared tunnel --no-autoupdate --url http://127.0.0.1:8787 >> data/tunnel.log 2>&1 &)
sleep 8; grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' data/tunnel.log | tail -1
