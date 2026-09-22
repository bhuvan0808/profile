/* ==================================================================
   fx-founder.js — FOUNDER MODE · Gotham engine
   Skyline, rain, drifting clouds, a signal that follows the pointer,
   lightning on click, "light the signal" contact stage.
   ================================================================== */
window.FX_FOUNDER = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const BAT = new Path2D('M100 28 L106 10 L112 30 C140 14 172 12 200 24 C182 36 172 52 168 66 C160 54 150 50 142 56 C138 68 132 76 126 84 C120 72 112 66 106 70 C104 78 102 84 100 90 C98 84 96 78 94 70 C88 66 80 72 74 84 C68 76 62 68 58 56 C50 50 40 54 32 66 C28 52 18 36 0 24 C28 12 60 14 88 30 L94 10 Z');

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, mobile = false;
  let rain = [], clouds = [], cityFar = null, cityNear = null;
  let flash = 0, bolt = null, boltT = 0, nextBolt = 5;
  const sig = { x: 0, y: 0, lock: null };
  const ptr = { x: 0, y: 0, t: -1e9 };
  let onResize = null, onVis = null, contactCleanup = null;

  /* ---------- city (pre-rendered layers) ---------- */
  function layer(minH, maxH, minW, maxW, litP, col, winCol) {
    const h0 = Math.ceil(maxH + 40);
    const c = document.createElement('canvas'); c.width = Math.round(W * DPR); c.height = Math.round(h0 * DPR);
    const g = c.getContext('2d'); g.setTransform(DPR, 0, 0, DPR, 0, 0);
    const bs = []; let x = -20;
    while (x < W + 40) { const w = rand(minW, maxW), h = rand(minH, maxH); bs.push({ x, w, h }); x += w + rand(2, 12); }
    g.fillStyle = col;
    for (const b of bs) { g.fillRect(b.x, h0 - b.h, b.w, b.h); if (Math.random() < 0.16) g.fillRect(b.x + b.w / 2 - 1, h0 - b.h - 18, 2, 18); }
    g.fillStyle = winCol;
    for (const b of bs) {
      const cols = Math.floor((b.w - 6) / 12), rows = Math.floor((b.h - 8) / 14);
      for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) if (Math.random() < litP) g.fillRect(b.x + 4 + cc * 12, h0 - b.h + 6 + r * 14, 6, 8);
    }
    return { c, h: h0 };
  }
  function buildCity() {
    cityFar = layer(H * 0.1, H * 0.3, 26, 70, 0.16, '#0a0c16', 'rgba(255,205,120,0.15)');
    cityNear = layer(H * 0.07, H * 0.4, 36, 100, 0.26, '#04050a', 'rgba(255,200,110,0.3)');
  }
  function initRain() { const n = mobile ? 70 : 230; rain = []; for (let i = 0; i < n; i++) rain.push({ x: rand(-100, W), y: rand(-H, H), l: rand(10, 24), v: rand(600, 1100) }); }
  function initClouds() { clouds = []; for (let i = 0; i < (mobile ? 5 : 9); i++) clouds.push({ x: rand(0, W), y: rand(0, H * 0.55), r: rand(140, 320), v: rand(4, 12), a: rand(0.05, 0.1) }); }

  /* ---------- drawing ---------- */
  function drawSky() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(5,6,12,0)'); g.addColorStop(0.6, 'rgba(12,16,32,0.35)'); g.addColorStop(1, 'rgba(22,28,56,0.9)');
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
    let tx, ty; const now = performance.now();
    if (sig.lock && now < sig.lock.until) { tx = sig.lock.x; ty = sig.lock.y; }
    else if (now - ptr.t < 2500) { tx = ptr.x; ty = ptr.y; }
    else { tx = W * (0.32 + 0.14 * Math.sin(T * 0.21)); ty = H * (0.26 + 0.09 * Math.cos(T * 0.16)); }
    const k = 1 - Math.pow(0.03, dt); sig.x += (tx - sig.x) * k; sig.y += (ty - sig.y) * k;
    const sx = W * 0.88, sy = H + 40, rx = clamp(W * 0.09, 70, 130);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const cg = ctx.createLinearGradient(sx, sy, sig.x, sig.y);
    cg.addColorStop(0, 'rgba(255,212,59,0)'); cg.addColorStop(0.5, 'rgba(255,212,59,0.05)'); cg.addColorStop(1, 'rgba(255,212,59,0.17)');
    ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(sx - 12, sy); ctx.lineTo(sx + 12, sy); ctx.lineTo(sig.x + rx, sig.y); ctx.lineTo(sig.x - rx, sig.y); ctx.closePath(); ctx.fill();
    const eg = ctx.createRadialGradient(sig.x, sig.y, 0, sig.x, sig.y, rx * 1.4);
    eg.addColorStop(0, 'rgba(255,236,150,0.85)'); eg.addColorStop(0.55, 'rgba(255,212,59,0.4)'); eg.addColorStop(1, 'rgba(255,212,59,0)');
    ctx.fillStyle = eg; ctx.save(); ctx.translate(sig.x, sig.y); ctx.scale(1, 0.5); ctx.beginPath(); ctx.arc(0, 0, rx * 1.4, 0, 6.283); ctx.fill(); ctx.restore();
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 160);
    sg.addColorStop(0, 'rgba(255,212,59,0.35)'); sg.addColorStop(1, 'rgba(255,212,59,0)');
    ctx.fillStyle = sg; ctx.fillRect(sx - 160, sy - 160, 320, 320);
    ctx.restore();
    const bw = rx * 1.5, bh = bw / 2;
    ctx.save(); ctx.translate(sig.x - bw / 2, sig.y - bh / 2); ctx.scale(bw / 200, bh / 100); ctx.fillStyle = 'rgba(5,6,12,0.93)'; ctx.fill(BAT); ctx.restore();
  }
  function drawRain(dt) {
    ctx.strokeStyle = 'rgba(170,190,235,0.22)'; ctx.lineWidth = 1; ctx.beginPath();
    for (const d of rain) {
      d.y += d.v * dt; d.x += d.v * 0.18 * dt;
      if (d.y > H) { d.y = rand(-200, -20); d.x = rand(-100, W); }
      ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + d.l * 0.18, d.y + d.l);
    }
    ctx.stroke();
  }
  function genBolt(x0, y0, y1) { const pts = [[x0, y0]]; let x = x0, y = y0; while (y < y1) { y += rand(14, 40); x += rand(-26, 26); pts.push([x, y]); } return pts; }
  function triggerBolt(x) { bolt = genBolt(x == null ? rand(W * 0.1, W * 0.9) : x, 0, H * rand(0.35, 0.6)); boltT = 0.16; flash = 1; }
  function drawLightning(dt) {
    nextBolt -= dt; if (nextBolt <= 0) { triggerBolt(); nextBolt = rand(7, 16); }
    if (boltT > 0 && bolt) {
      boltT -= dt; ctx.save(); ctx.strokeStyle = 'rgba(230,238,255,0.9)'; ctx.lineWidth = 2; ctx.shadowColor = '#bcd0ff'; ctx.shadowBlur = 24;
      ctx.beginPath(); bolt.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
    }
    if (flash > 0) { flash = Math.max(0, flash - dt * 3.5); ctx.fillStyle = `rgba(190,200,255,${flash * 0.16})`; ctx.fillRect(0, 0, W, H); }
  }
  function drawFog() {
    const g = ctx.createLinearGradient(0, H * 0.7, 0, H);
    g.addColorStop(0, 'rgba(30,36,60,0)'); g.addColorStop(1, 'rgba(30,36,60,0.45)');
    ctx.fillStyle = g; ctx.fillRect(0, H * 0.7, W, H * 0.3);
  }
  function drawCity() {
    if (cityFar) ctx.drawImage(cityFar.c, 0, H - cityFar.h, W, cityFar.h);
    if (cityNear) ctx.drawImage(cityNear.c, 0, H - cityNear.h, W, cityNear.h);
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
    ctx.clearRect(0, 0, W, H);
    drawSky(); drawClouds(dt); drawSignal(dt);
    if (cityFar) ctx.drawImage(cityFar.c, 0, H - cityFar.h, W, cityFar.h);
    drawRain(dt);
    if (cityNear) ctx.drawImage(cityNear.c, 0, H - cityNear.h, W, cityNear.h);
    drawLightning(dt); drawFog();
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function drawOnce() { ctx.clearRect(0, 0, W, H); drawSky(); drawClouds(0); sig.x = W * 0.35; sig.y = H * 0.3; drawSignal(0); drawCity(); drawFog(); }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    resize(); buildCity(); initRain(); initClouds(); sig.x = W * 0.35; sig.y = H * 0.3; nextBolt = rand(3, 7);
    onResize = () => { resize(); buildCity(); initRain(); initClouds(); if (reduce) drawOnce(); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', onVis);
    if (reduce) drawOnce(); else start();
  }
  function unmount() {
    stop(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis);
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    rain = []; clouds = []; cityFar = cityNear = null; bolt = null; sig.lock = null; env = null;
    contactUnmount();
  }
  function pointer(x, y) { ptr.x = x; ptr.y = y; ptr.t = performance.now(); }
  function click(x) { if (reduce || !running) return false; triggerBolt(x); return false; }
  function contactMount(stageEl, links) {
    contactUnmount();
    const btn = stageEl && stageEl.querySelector('#signalBtn'); if (!btn) return;
    const handler = () => {
      stageEl.classList.add('lit'); btn.textContent = 'Signal lit — I will answer';
      links.forEach((l, i) => setTimeout(() => l.classList.add('lit'), 900 + i * 220));
      const em = stageEl.querySelector('.emblem');
      if (em) { const r = em.getBoundingClientRect(); sig.lock = { x: r.left + r.width / 2, y: r.top + r.height / 2, until: performance.now() + 5000 }; }
      if (running) triggerBolt();
    };
    btn.addEventListener('click', handler);
    contactCleanup = () => { btn.removeEventListener('click', handler); stageEl.classList.remove('lit'); links.forEach(l => l.classList.remove('lit')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'founder', mount, unmount, pointer, click, contactMount, contactUnmount };
})();
