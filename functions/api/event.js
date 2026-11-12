// Cloudflare Pages: události funnelu se tu jen přijmou (Cloudflare Web Analytics vlastní události neumí – kroky funnelu jsou vidět jen v Node backendu na boxu).
export async function onRequestPost() { return new Response(null, { status: 204 }); }
