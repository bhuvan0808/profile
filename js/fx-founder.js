/* ==================================================================
   fx-founder.js — FOUNDER · Gotham engine
   Three parallax skyline layers, two depths of rain, drifting cloud,
   a signal that follows the pointer while you are in the sky,
   lightning with thunder. Fixed to the viewport, content scrolls over.
   ================================================================== */
window.FX_FOUNDER = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const BAT = new Path2D('M100 28 L106 10 L112 30 C140 14 172 12 200 24 C182 36 172 52 168 66 C160 54 150 50 142 56 C138 68 132 76 126 84 C120 72 112 66 106 70 C104 78 102 84 100 90 C98 84 96 78 94 70 C88 66 80 72 74 84 C68 76 62 68 58 56 C50 50 40 54 32 66 C28 52 18 36 0 24 C28 12 60 14 88 30 L94 10 Z');

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, mobile = false, scrollY = 0;
  let rainFar = [], rainNear = [], clouds = [], layers = [];
  let flash = 0, bolt = null, boltT = 0, nextBolt = 6;
  const sig = { x: 0, y: 0, lock: null };
  const ptr = { x: 0, y: 0, t: -1e9, nx: 0, ny: 0 };
  const par = { x: 0, y: 0 };
  let onResize = null, onVis = null, contactCleanup = null;

  /* ---------- pre-rendered skyline layers ---------- */
  function layer(minH, maxH, minW, maxW, litP, col, winCol, gap) {
    const h0 = Math.ceil(maxH + 60);
    const c = document.createElement('canvas'); c.width = Math.round((W + 80) * DPR); c.height = Math.round(h0 * DPR);
    const g = c.getContext('2d'); g.setTransform(DPR, 0, 0, DPR, 0, 0);
    let x = -40;
    const bs = [];
    while (x < W + 60) { const w = rand(minW, maxW), h = rand(minH, maxH); bs.push({ x: x + 40, w, h }); x += w + rand(gap[0], gap[1]); }
    g.fillStyle = col;
    for (const b of bs) {
      g.fillRect(b.x, h0 - b.h, b.w, b.h);
      if (Math.random() < 0.22) { const aw = Math.max(2, b.w * 0.04); g.fillRect(b.x + b.w / 2 - aw / 2, h0 - b.h - rand(14, 34), aw, 40); }
      if (Math.random() < 0.3) { g.fillRect(b.x + b.w * 0.15, h0 - b.h - 8, b.w * 0.7, 8); }
    }
    g.fillStyle = winCol;
    for (const b of bs) {
      const cols = Math.floor((b.w - 8) / 11), rows = Math.floor((b.h - 10) / 13);
      for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) if (Math.random() < litP) g.fillRect(b.x + 5 + cc * 11, h0 - b.h + 7 + r * 13, 5, 7);
    }
    return { c, h: h0 };
  }
  function buildCity() {
    layers = [
      { img: layer(H * 0.12, H * 0.28, 22, 60, 0.12, '#0d1322', 'rgba(255,205,120,0.10)', [2, 10]), depth: 0.25, alpha: 0.9 },
      { img: layer(H * 0.1, H * 0.36, 30, 84, 0.2, '#090d18', 'rgba(255,200,110,0.2)', [3, 12]), depth: 0.55, alpha: 1 },
      { img: layer(H * 0.06, H * 0.42, 40, 110, 0.26, '#04060d', 'rgba(255,196,100,0.32)', [4, 16]), depth: 1, alpha: 1 }
    ];
  }
  function initRain() {
    rainFar = []; rainNear = [];
    const nf = mobile ? 60 : 180, nn = mobile ? 30 : 90;
    for (let i = 0; i < nf; i++) rainFar.push({ x: rand(-100, W), y: rand(-H, H), l: rand(8, 16), v: rand(520, 800) });
    for (let i = 0; i < nn; i++) rainNear.push({ x: rand(-100, W), y: rand(-H, H), l: rand(18, 30), v: rand(1000, 1400) });
  }
  function initClouds() { clouds = []; for (let i = 0; i < (mobile ? 5 : 9); i++) clouds.push({ x: rand(0, W), y: rand(0, H * 0.5), r: rand(160, 360), v: rand(4, 11), a: rand(0.05, 0.1) }); }

  /* ---------- drawing ---------- */
  function drawSky() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(6,8,15,0)'); g.addColorStop(0.55, 'rgba(14,20,38,0.35)'); g.addColorStop(1, 'rgba(24,32,60,0.85)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function drawClouds(dt) {
    for (const c of clouds) {
      c.x += c.v * dt; if (c.x - c.r > W) c.x = -c.r;
      const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
      g.addColorStop(0, `rgba(130,140,180,${c.a})`); g.addColorStop(1, 'rgba(130,140,180,0)');
      ctx.fillStyle = g; ctx.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
    }
  }
  function drawSignal(dt) {
    const now = performance.now();
    let tx, ty;
    const inSky = now - ptr.t < 2500 && ptr.y < H * 0.72 && scrollY < H * 0.9;
    if (sig.lock && now < sig.lock.until) { tx = sig.lock.x; ty = sig.lock.y; }
    else if (inSky) { tx = ptr.x; ty = ptr.y; }
    else { tx = W * (0.62 + 0.1 * Math.sin(T * 0.19)); ty = H * (0.24 + 0.07 * Math.cos(T * 0.15)); }
    const k = 1 - Math.pow(0.02, dt); sig.x += (tx - sig.x) * k; sig.y += (ty - sig.y) * k;
    const sx = W * 0.9, sy = H + 40, rx = clamp(W * 0.085, 70, 130);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const cg = ctx.createLinearGradient(sx, sy, sig.x, sig.y);
    cg.addColorStop(0, 'rgba(243,197,61,0)'); cg.addColorStop(0.55, 'rgba(243,197,61,0.05)'); cg.addColorStop(1, 'rgba(243,197,61,0.16)');
    ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(sx - 14, sy); ctx.lineTo(sx + 14, sy); ctx.lineTo(sig.x + rx, sig.y); ctx.lineTo(sig.x - rx, sig.y); ctx.closePath(); ctx.fill();
    const eg = ctx.createRadialGradient(sig.x, sig.y, 0, sig.x, sig.y, rx * 1.45);
    eg.addColorStop(0, 'rgba(255,238,160,0.9)'); eg.addColorStop(0.5, 'rgba(243,197,61,0.45)'); eg.addColorStop(1, 'rgba(243,197,61,0)');
    ctx.fillStyle = eg; ctx.save(); ctx.translate(sig.x, sig.y); ctx.scale(1, 0.5); ctx.beginPath(); ctx.arc(0, 0, rx * 1.45, 0, 6.283); ctx.fill(); ctx.restore();
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 200);
    sg.addColorStop(0, 'rgba(243,197,61,0.35)'); sg.addColorStop(1, 'rgba(243,197,61,0)');
    ctx.fillStyle = sg; ctx.fillRect(sx - 200, sy - 200, 400, 400);
    ctx.restore();
    const bw = rx * 1.5, bh = bw / 2;
    ctx.save(); ctx.translate(sig.x - bw / 2, sig.y - bh / 2); ctx.scale(bw / 200, bh / 100); ctx.fillStyle = 'rgba(6,8,15,0.94)'; ctx.fill(BAT); ctx.restore();
  }
  function drawRain(list, alpha, dt) {
    ctx.strokeStyle = `rgba(170,190,235,${alpha})`; ctx.lineWidth = 1; ctx.beginPath();
    for (const d of list) {
      d.y += d.v * dt; d.x += d.v * 0.16 * dt;
      if (d.y > H) { d.y = rand(-220, -20); d.x = rand(-100, W); }
      ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + d.l * 0.16, d.y + d.l);
    }
    ctx.stroke();
  }
  function drawLayer(L) {
    const px = par.x * 26 * L.depth, py = par.y * 10 * L.depth + scrollY * 0.02 * L.depth;
    ctx.globalAlpha = L.alpha; ctx.drawImage(L.img.c, -40 + px, H - L.img.h + py, W + 80, L.img.h); ctx.globalAlpha = 1;
  }
  function genBolt(x0, y0, y1) { const pts = [[x0, y0]]; let x = x0, y = y0; while (y < y1) { y += rand(14, 40); x += rand(-26, 26); pts.push([x, y]); } return pts; }
  function triggerBolt(x) {
    bolt = genBolt(x == null ? rand(W * 0.1, W * 0.9) : x, 0, H * rand(0.35, 0.6)); boltT = 0.16; flash = 1;
    if (window.SOUND) setTimeout(() => window.SOUND.play('thunder'), rand(120, 500));
  }
  function drawLightning(dt) {
    nextBolt -= dt; if (nextBolt <= 0) { triggerBolt(); nextBolt = rand(9, 18); }
    if (boltT > 0 && bolt) {
      boltT -= dt; ctx.save(); ctx.strokeStyle = 'rgba(230,238,255,0.9)'; ctx.lineWidth = 2; ctx.shadowColor = '#bcd0ff'; ctx.shadowBlur = 24;
      ctx.beginPath(); bolt.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
    }
    if (flash > 0) { flash = Math.max(0, flash - dt * 3.5); ctx.fillStyle = `rgba(190,200,255,${flash * 0.14})`; ctx.fillRect(0, 0, W, H); }
  }
  function drawFog() {
    const g = ctx.createLinearGradient(0, H * 0.66, 0, H);
    g.addColorStop(0, 'rgba(30,36,60,0)'); g.addColorStop(1, 'rgba(30,36,60,0.5)');
    ctx.fillStyle = g; ctx.fillRect(0, H * 0.66, W, H * 0.34);
  }

  /* ---------- loop ---------- */
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight; mobile = W < 720;
    for (const c of [bg, fx]) { c.width = Math.round(W * DPR); c.height = Math.round(H * DPR); }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000) || 0; last = now; T += dt;
    const k = 1 - Math.pow(0.05, dt); par.x += (ptr.nx - par.x) * k; par.y += (ptr.ny - par.y) * k;
    ctx.clearRect(0, 0, W, H);
    drawSky(); drawClouds(dt); drawSignal(dt);
    if (layers[0]) drawLayer(layers[0]);
    drawRain(rainFar, 0.18, dt);
    if (layers[1]) drawLayer(layers[1]);
    if (layers[2]) drawLayer(layers[2]);
    drawRain(rainNear, 0.3, dt);
    drawLightning(dt); drawFog();
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function drawOnce() { ctx.clearRect(0, 0, W, H); drawSky(); drawClouds(0); sig.x = W * 0.62; sig.y = H * 0.26; drawSignal(0); layers.forEach(drawLayer); drawFog(); }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    resize(); buildCity(); initRain(); initClouds(); sig.x = W * 0.62; sig.y = H * 0.26; nextBolt = rand(4, 9);
    onResize = () => { resize(); buildCity(); initRain(); initClouds(); if (reduce) drawOnce(); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', onVis);
    if (window.SOUND) window.SOUND.ambience('rain');
    if (reduce) drawOnce(); else start();
  }
  function unmount() {
    stop(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis);
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    rainFar = []; rainNear = []; clouds = []; layers = []; bolt = null; sig.lock = null; env = null;
    contactUnmount();
  }
  function pointer(x, y) { ptr.x = x; ptr.y = y; ptr.t = performance.now(); ptr.nx = (x / W - 0.5) * 2; ptr.ny = (y / H - 0.5) * 2; }
  function scroll(y) { scrollY = y; }
  function click(x) { if (reduce || !running) return false; triggerBolt(x); return false; }
  function contactMount(stageEl, links) {
    contactUnmount();
    const btn = stageEl && stageEl.querySelector('#signalBtn'); if (!btn) return;
    const handler = () => {
      stageEl.classList.add('lit'); btn.textContent = 'Signal lit. I will answer.';
      links.forEach((l, i) => setTimeout(() => l.classList.add('lit'), 900 + i * 220));
      const em = stageEl.querySelector('.emblem');
      if (em) { const r = em.getBoundingClientRect(); sig.lock = { x: r.left + r.width / 2, y: r.top + r.height / 2, until: performance.now() + 5000 }; }
      if (running) triggerBolt();
    };
    btn.addEventListener('click', handler);
    contactCleanup = () => { btn.removeEventListener('click', handler); stageEl.classList.remove('lit'); links.forEach(l => l.classList.remove('lit')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'founder', mount, unmount, pointer, scroll, click, contactMount, contactUnmount };
})();
