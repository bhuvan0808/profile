/* ==================================================================
   fx-consultant.js — CONSULTANT · the corner office
   A golden-hour city seen through office glass, painted into the
   hero: layered skyline, warm window lights, a slow reflection sweep,
   pointer parallax. A term sheet that signs itself, deal by deal.
   ================================================================== */
window.FX_CONSULTANT = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const S = () => window.SOUND;

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, mobile = false, scene = null, sceneKey = '', heroRect = null;
  const ptr = { nx: 0, ny: 0 }; const par = { x: 0, y: 0 };
  let onResize = null, onVis = null, contactCleanup = null, dealTimer = 0, dealIdx = 0, dealBusy = false;
  let sweep = -0.4;

  /* ---------- scene (pre-rendered per hero size) ---------- */
  function mk(w, h) { const c = document.createElement('canvas'); c.width = Math.round(w * DPR); c.height = Math.round(h * DPR); const g = c.getContext('2d'); g.setTransform(DPR, 0, 0, DPR, 0, 0); return { c, g }; }
  function skyline(w, h, opts) {
    const l = mk(w, h + 40); const g = l.g; const base = h + 40;
    let x = -30; const bs = [];
    while (x < w + 60) {
      const bw = rand(opts.minW, opts.maxW), bh = rand(opts.minH, opts.maxH);
      bs.push({ x, w: bw, h: bh, spire: Math.random() < opts.spire });
      x += bw + rand(3, 14);
    }
    g.fillStyle = opts.col;
    for (const b of bs) {
      const top = base - b.h;
      g.fillRect(b.x, top, b.w, b.h);
      if (Math.random() < 0.5) { const sw = b.w * rand(0.4, 0.7); g.fillRect(b.x + (b.w - sw) / 2, top - rand(8, 22), sw, 30); }
      if (b.spire) { const sx = b.x + b.w / 2; g.beginPath(); g.moveTo(sx - 3, top - 8); g.lineTo(sx, top - rand(40, 90)); g.lineTo(sx + 3, top - 8); g.closePath(); g.fill(); }
    }
    g.fillStyle = opts.win;
    for (const b of bs) {
      const cols = Math.floor((b.w - 6) / 9), rows = Math.floor((b.h - 8) / 12);
      for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) if (Math.random() < opts.lit) g.fillRect(b.x + 4 + cc * 9, base - b.h + 6 + r * 12, 4, 6);
    }
    return l.c;
  }
  function buildScene(w, h) {
    const key = Math.round(w) + 'x' + Math.round(h); if (sceneKey === key && scene) return; sceneKey = key;
    const sky = mk(w, h);
    const grd = sky.g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, '#0f1320'); grd.addColorStop(0.42, '#2a2740'); grd.addColorStop(0.68, '#7a4b3c'); grd.addColorStop(0.84, '#d98f52'); grd.addColorStop(1, '#efc078');
    sky.g.fillStyle = grd; sky.g.fillRect(0, 0, w, h);
    const sun = sky.g.createRadialGradient(w * 0.7, h * 0.7, 0, w * 0.7, h * 0.7, w * 0.42);
    sun.addColorStop(0, 'rgba(255,214,150,0.95)'); sun.addColorStop(0.25, 'rgba(255,170,90,0.45)'); sun.addColorStop(1, 'rgba(255,150,80,0)');
    sky.g.fillStyle = sun; sky.g.fillRect(0, 0, w, h);
    /* cloud streaks */
    for (let i = 0; i < 9; i++) {
      const cy = h * rand(0.12, 0.6), cw = w * rand(0.18, 0.5), ch = rand(6, 18);
      const cg = sky.g.createLinearGradient(0, cy, 0, cy + ch);
      cg.addColorStop(0, 'rgba(255,190,140,0.0)'); cg.addColorStop(0.5, `rgba(255,${Math.round(rand(160, 210))},140,${rand(0.12, 0.3)})`); cg.addColorStop(1, 'rgba(120,80,110,0)');
      sky.g.fillStyle = cg; sky.g.beginPath(); sky.g.ellipse(w * rand(0.1, 0.9), cy + ch / 2, cw / 2, ch / 2, 0, 0, 6.283); sky.g.fill();
    }
    const far = skyline(w, h * 0.42, { minW: 18, maxW: 46, minH: h * 0.08, maxH: h * 0.3, col: 'rgba(70,52,84,0.75)', win: 'rgba(255,205,150,0.18)', lit: 0.1, spire: 0.12 });
    const mid = skyline(w, h * 0.5, { minW: 26, maxW: 70, minH: h * 0.1, maxH: h * 0.38, col: '#2a2238', win: 'rgba(255,200,130,0.35)', lit: 0.18, spire: 0.2 });
    const near = skyline(w, h * 0.6, { minW: 40, maxW: 110, minH: h * 0.08, maxH: h * 0.44, col: '#121019', win: 'rgba(255,196,120,0.5)', lit: 0.24, spire: 0.16 });
    scene = { sky: sky.c, far, mid, near, w, h };
  }
  function drawScene(dt) {
    const r = heroRect; if (!scene || !r) return;
    const x = r.left, y = r.top, w = scene.w, h = scene.h;
    ctx.drawImage(scene.sky, x, y, w, h);
    ctx.drawImage(scene.far, x + par.x * 6, y + h - h * 0.42 - 40 + par.y * 2, w, h * 0.42 + 40);
    ctx.drawImage(scene.mid, x + par.x * 14, y + h - h * 0.5 - 40 + par.y * 4, w, h * 0.5 + 40);
    ctx.drawImage(scene.near, x + par.x * 24, y + h - h * 0.6 - 40 + par.y * 6, w, h * 0.6 + 40);
    /* haze near the ground */
    const haze = ctx.createLinearGradient(0, y + h * 0.7, 0, y + h);
    haze.addColorStop(0, 'rgba(240,192,120,0)'); haze.addColorStop(1, 'rgba(240,192,120,0.35)');
    ctx.fillStyle = haze; ctx.fillRect(x, y + h * 0.7, w, h * 0.3);
    /* glass reflection sweep */
    sweep += dt * 0.055; if (sweep > 1.5) sweep = -0.5;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    const sx = x + w * sweep;
    const rg = ctx.createLinearGradient(sx - w * 0.18, y, sx + w * 0.18, y + h);
    rg.addColorStop(0, 'rgba(255,255,255,0)'); rg.addColorStop(0.45, 'rgba(255,255,255,0.07)'); rg.addColorStop(0.5, 'rgba(255,255,255,0.11)'); rg.addColorStop(0.55, 'rgba(255,255,255,0.07)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg; ctx.fillRect(x, y, w, h);
    /* window mullions */
    ctx.fillStyle = 'rgba(20,16,24,0.35)';
    ctx.fillRect(x + w * 0.5 - 1.5, y, 3, h);
    ctx.restore();
    /* narrow screens: the copy spans the full width */
    if (W < 900) {
      const wash = ctx.createLinearGradient(0, y, 0, y + h);
      wash.addColorStop(0, 'rgba(244,239,230,0.9)'); wash.addColorStop(0.55, 'rgba(244,239,230,0.78)'); wash.addColorStop(0.75, 'rgba(244,239,230,0.15)'); wash.addColorStop(1, 'rgba(244,239,230,0)');
      ctx.fillStyle = wash; ctx.fillRect(x, y, w, h);
    }
    const top = ctx.createLinearGradient(0, y, 0, y + 150);
    top.addColorStop(0, 'rgba(244,239,230,0.85)'); top.addColorStop(1, 'rgba(244,239,230,0)');
    ctx.fillStyle = top; ctx.fillRect(x, y, w, 150);
    const fade = ctx.createLinearGradient(0, y + h - 130, 0, y + h);
    fade.addColorStop(0, 'rgba(244,239,230,0)'); fade.addColorStop(1, 'rgba(244,239,230,1)');
    ctx.fillStyle = fade; ctx.fillRect(x, y + h - 130, w, 130);
  }
  function sceneRect() {
    if (!env || !env.hero) return null;
    const r = env.hero.getBoundingClientRect();
    let bottom = r.bottom;
    if (env.stats) { const s = env.stats.getBoundingClientRect(); if (s.height > 0) bottom = Math.min(bottom, s.top - 12); }
    return { left: r.left, top: r.top, right: r.right, bottom, width: r.width, height: Math.max(200, bottom - r.top) };
  }

  /* ---------- term sheet ---------- */
  function showDeal(i, opts) {
    const d = env.deal; if (!d || !env.deals || !env.deals.length) return;
    const deal = env.deals[i % env.deals.length];
    const fields = { dealClient: deal.client, dealScope: deal.scope, dealTerms: deal.terms, dealValue: deal.value, dealNo: 'No. ' + String(41 + (i % env.deals.length)).padStart(4, '0') };
    d.classList.remove('signed');
    const swap = () => { Object.keys(fields).forEach(k => { const el = d.querySelector('#' + k); if (el) el.textContent = fields[k]; }); };
    if (opts && opts.instant) { swap(); d.classList.add('signed'); return; }
    dealBusy = true; d.classList.add('flip');
    setTimeout(() => { swap(); d.classList.remove('flip'); }, 260);
    setTimeout(() => { d.classList.add('signed'); if (S()) S().play('sign'); }, 420);
    setTimeout(() => { if (S()) S().play('stamp'); dealBusy = false; }, 1500);
  }
  function nextDeal() { if (dealBusy) return; dealIdx++; showDeal(dealIdx); scheduleDeal(); }
  function scheduleDeal() { clearTimeout(dealTimer); if (reduce) return; dealTimer = setTimeout(() => { if (running && env && env.deal) { const r = env.deal.getBoundingClientRect(); if (r.bottom > 0 && r.top < H) nextDeal(); else scheduleDeal(); } }, 6500); }

  /* ---------- loop ---------- */
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight; mobile = W < 720;
    for (const c of [bg, fx]) { c.width = Math.round(W * DPR); c.height = Math.round(H * DPR); }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scene = null; sceneKey = '';
  }
  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000) || 0; last = now; T += dt;
    const k = 1 - Math.pow(0.05, dt); par.x += (ptr.nx - par.x) * k; par.y += (ptr.ny - par.y) * k;
    ctx.clearRect(0, 0, W, H);
    heroRect = sceneRect();
    if (heroRect && heroRect.bottom > 0 && heroRect.top < H) { buildScene(heroRect.width, heroRect.height); drawScene(dt); }
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function drawOnce() { ctx.clearRect(0, 0, W, H); heroRect = sceneRect(); if (heroRect) { buildScene(heroRect.width, heroRect.height); drawScene(0); } }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    resize(); sweep = -0.4;
    onResize = () => { resize(); if (reduce) drawOnce(); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', onVis);
    if (S()) S().ambience('city');
    dealIdx = 0; if (env.deal) { showDeal(0, { instant: reduce }); if (!reduce) { env.deal.classList.remove('signed'); setTimeout(() => { if (env && env.deal) { env.deal.classList.add('signed'); if (S()) S().play('sign'); } }, 700); } scheduleDeal(); }
    if (reduce) { drawOnce(); window.addEventListener('scroll', drawOnce, { passive: true }); } else start();
  }
  function unmount() {
    stop(); clearTimeout(dealTimer);
    window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('scroll', drawOnce);
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    scene = null; sceneKey = ''; env = null; contactUnmount();
  }
  function pointer(x, y) { ptr.nx = (x / W - 0.5) * 2; ptr.ny = (y / H - 0.5) * 2; }
  function click(x, y) {
    if (!env || !env.deal) return false;
    const r = env.deal.getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) { nextDeal(); return true; }
    return false;
  }
  function contactMount(stageEl, links) {
    contactUnmount();
    const btn = stageEl && stageEl.querySelector('#signBtn'); if (!btn) return;
    const sheet = stageEl.querySelector('.terms');
    const handler = () => {
      if (!sheet) return;
      sheet.classList.remove('signed'); void sheet.offsetWidth; sheet.classList.add('signed');
      if (S()) S().play('sign');
      setTimeout(() => { if (S()) S().play('stamp'); }, 1100);
      links.forEach((l, i) => setTimeout(() => { l.classList.remove('slam'); void l.offsetWidth; l.classList.add('slam'); }, 600 + i * 110));
      btn.textContent = 'Signed. Now send it.';
    };
    btn.addEventListener('click', handler);
    contactCleanup = () => { btn.removeEventListener('click', handler); if (sheet) sheet.classList.remove('signed'); links.forEach(l => l.classList.remove('slam')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'consultant', mount, unmount, pointer, click, contactMount, contactUnmount };
})();
