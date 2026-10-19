(async () => {
  const cfg = window.SUPABASE_CONFIG || {};
  const configured = cfg.url && cfg.anonKey && !cfg.url.includes('PASTE_') && !cfg.anonKey.includes('PASTE_');
  if (configured) {
    try {
      const r = await fetch(`${cfg.url}/rest/v1/restaurant_site?id=eq.1&select=config`, {headers:{apikey:cfg.anonKey, Authorization:`Bearer ${cfg.anonKey}`}});
      if (r.ok) { const rows = await r.json(); if (rows[0]?.config) window.RESTAURANT_CONFIG = rows[0].config; }
    } catch (e) { console.warn('Cloud settings unavailable; using bundled config.', e); }
  }
  const s = document.createElement('script'); s.src = 'script.js'; document.body.appendChild(s);
})();
