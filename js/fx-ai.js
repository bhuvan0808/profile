/* ==================================================================
   fx-ai.js — AI ENGINEER MODE · Neural engine
   Node graph with travelling pulses, pointer attraction, click
   shockwaves, typed terminals for the hero and the contact stage.
   ================================================================== */
window.FX_AI = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LINK = 130;

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, mobile = false;
  let nodes = [], pulses = [], rings = [], grid = null, spawnT = 0;
  const ptr = { x: -1e4, y: -1e4, active: false };
  let onResize = null, onVis = null, contactCleanup = null;

  /* ---------- graph ---------- */
  function init() {
    const n = Math.round(clamp((W * H) / 16000, 40, 120));
    nodes = []; pulses = []; rings = [];
    for (let i = 0; i < n; i++) nodes.push({ x: rand(0, W), y: rand(0, H), vx: rand(-14, 14), vy: rand(-14, 14), r: rand(1.4, 2.8), c: Math.random() < 0.72 ? 0 : 1, ph: rand(0, 6.28) });
    grid = document.createElement('canvas'); grid.width = Math.round(W * DPR); grid.height = Math.round(H * DPR);
    const g = grid.getContext('2d'); g.setTransform(DPR, 0, 0, DPR, 0, 0);
    g.strokeStyle = 'rgba(140,170,255,0.05)'; g.lineWidth = 1; g.beginPath();
    for (let x = 0; x <= W; x += 56) { g.moveTo(x, 0); g.lineTo(x, H); }
    for (let y = 0; y <= H; y += 56) { g.moveTo(0, y); g.lineTo(W, y); }
    g.stroke();
  }
  function neighbors(n) { const out = []; for (const m of nodes) { if (m === n) continue; if (Math.hypot(m.x - n.x, m.y - n.y) < LINK) out.push(m); } return out; }
  function spawnPulse(from) {
    const a = from || nodes[Math.floor(Math.random() * nodes.length)]; if (!a) return;
    const nb = neighbors(a); if (!nb.length) return;
    pulses.push({ a, b: nb[Math.floor(Math.random() * nb.length)], t: 0, sp: rand(0.8, 1.7) });
  }
  function blob(x, y, r, rgb, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function draw(dt) {
    ctx.clearRect(0, 0, W, H);
    const m = Math.min(W, H);
    blob(W * 0.2 + Math.sin(T * 0.2) * 80, H * 0.3 + Math.cos(T * 0.17) * 60, m * 0.5, '34,211,238', 0.09);
    blob(W * 0.82 + Math.cos(T * 0.15) * 90, H * 0.72 + Math.sin(T * 0.22) * 70, m * 0.55, '168,85,247', 0.11);
    if (grid) ctx.drawImage(grid, 0, 0, W, H);

    for (const n of nodes) {
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1;
      n.x = clamp(n.x, 0, W); n.y = clamp(n.y, 0, H);
      if (ptr.active) {
        const dx = ptr.x - n.x, dy = ptr.y - n.y, d = Math.hypot(dx, dy);
        if (d < 220 && d > 1) { const f = ((220 - d) / 220) * 34 * dt; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
      }
      const sp = Math.hypot(n.vx, n.vy); if (sp > 70) { n.vx *= 70 / sp; n.vy *= 70 / sp; }
      n.vx *= 1 - 0.12 * dt; n.vy *= 1 - 0.12 * dt;
      if (Math.abs(n.vx) + Math.abs(n.vy) < 6) { n.vx += rand(-4, 4); n.vy += rand(-4, 4); }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]; const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
        const d = Math.hypot(dx, dy); if (d > LINK) continue;
        const al = (1 - d / LINK) * 0.32;
        ctx.strokeStyle = (a.c || b.c) ? `rgba(168,85,247,${al})` : `rgba(34,211,238,${al})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    if (ptr.active) for (const n of nodes) {
      const d = Math.hypot(ptr.x - n.x, ptr.y - n.y);
      if (d < 170) { ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 170) * 0.55})`; ctx.beginPath(); ctx.moveTo(ptr.x, ptr.y); ctx.lineTo(n.x, n.y); ctx.stroke(); }
    }
    for (const n of nodes) {
      const tw = 0.55 + 0.45 * Math.sin(T * 2 + n.ph);
      ctx.fillStyle = n.c ? `rgba(168,85,247,${tw})` : `rgba(34,211,238,${tw})`;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.283); ctx.fill();
    }
    spawnT -= dt; if (spawnT <= 0) { spawnT = 0.14; spawnPulse(); }
    ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 10; ctx.fillStyle = 'rgba(255,255,255,0.95)';
    pulses = pulses.filter(p => {
      p.t += p.sp * dt;
      if (p.t >= 1) { if (Math.random() < 0.6 && pulses.length < 60) spawnPulse(p.b); return false; }
      const x = lerp(p.a.x, p.b.x, p.t), y = lerp(p.a.y, p.b.y, p.t);
      ctx.beginPath(); ctx.arc(x, y, 2, 0, 6.283); ctx.fill();
      return true;
    });
    ctx.shadowBlur = 0;
    rings = rings.filter(r => {
      r.r += 520 * dt; r.a -= dt * 1.5; if (r.a <= 0) return false;
      ctx.strokeStyle = `rgba(34,211,238,${r.a})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.283); ctx.stroke();
      return true;
    });
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
    draw(dt);
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  /* ---------- terminals ---------- */
  function typer(el, lines, opts) {
    opts = opts || {};
    let i = 0, alive = true, timer = 0, html = '';
    const cursor = '<span class="term-cursor"></span>';
    const render = extra => { el.innerHTML = html + (extra || '') + cursor; };
    const next = () => {
      if (!alive) return;
      if (i >= lines.length) {
        if (opts.loop) timer = setTimeout(() => { html = ''; i = 0; next(); }, 5000);
        else if (opts.onDone) opts.onDone();
        return;
      }
      const ln = lines[i++];
      if (ln.k === 'c' && !reduce) {
        let j = 0; const text = ln.t;
        const tick = () => {
          if (!alive) return; j++;
          render(`<span class="c">${esc(text.slice(0, j))}</span>`);
          if (j < text.length) timer = setTimeout(tick, 18 + Math.random() * 30);
          else { html += `<span class="c">${esc(text)}</span>\n`; timer = setTimeout(next, 240); }
        };
        tick();
      } else {
        timer = setTimeout(() => {
          if (!alive) return;
          html += ln.html ? ln.html + '\n' : `<span class="${ln.k || 'd'}">${esc(ln.t)}</span>\n`;
          render(); next();
        }, reduce ? 0 : (ln.d || 260));
      }
    };
    render(); next();
    return { stop() { alive = false; clearTimeout(timer); } };
  }
  const HERO_LINES = [
    { t: '$ python train.py --model buvn-2.0 --tokens 2B --gpu H100', k: 'c' },
    { t: 'arch    12 layers · 768 dim · 32K vocab · 1024 ctx · RoPE · RMSNorm · SwiGLU', k: 'd' },
    { t: 'step 04000   loss 3.92   ppl 50.4    320K tok/s   mfu 24%', k: 'd' },
    { t: 'step 12000   loss 3.51   ppl 33.5    320K tok/s', k: 'd' },
    { t: 'step 24000   loss 3.37   ppl 29.19   ✓ beats GPT-2 Small (29.41) at 9× fewer params', k: 'ok' },
    { t: 'wall 2h 04m · budget $1,150 · saved → beuvian/buvn-2.0', k: 'w' },
    { t: '$ ray up pipeline.yaml --nodes h100 --services 20 --models 16', k: 'c', d: 500 },
    { t: 'uptime 30d 00h 00m   failures 0   human-review −80%   → NeurIPS 2025', k: 'ok' },
    { t: '$ beuvian dispatch "ship the portfolio" --via whatsapp', k: 'c' },
    { t: 'agent-1 planning… agent-2 coding… agent-3 review… ✓ deployed to vercel', k: 'ok' }
  ];
  function heroTerminal(el) { if (!el) return null; return typer(el, HERO_LINES, { loop: true }); }
  function contactLines(P) {
    return [
      { t: '$ bhuvan contact --list', k: 'c' },
      { html: `<span class="p">→</span> email      <a href="mailto:${P.email}">${P.email}</a>` },
      { html: `<span class="p">→</span> linkedin   <a href="${P.linkedin}" target="_blank" rel="noopener">linkedin.com/in/bhuvanboddu</a>` },
      { html: `<span class="p">→</span> github     <a href="${P.github}" target="_blank" rel="noopener">github.com/bhuvan0808</a>` },
      { html: `<span class="p">→</span> phone      <a href="${P.phoneHref}">${P.phone}</a>` },
      { t: '$ bhuvan status', k: 'c', d: 400 },
      { t: 'open_to    AI/ML · agentic systems · full-stack AI · founder’s office · co-founder', k: 'd' },
      { t: 'location   Chennai → anywhere', k: 'd' },
      { t: 'response   fast. usually same day.', k: 'ok' }
    ];
  }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    resize(); init();
    onResize = () => { resize(); init(); if (reduce) draw(0); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', onVis);
    if (reduce) draw(0); else start();
  }
  function unmount() {
    stop(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis);
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    nodes = []; pulses = []; rings = []; grid = null; ptr.active = false; env = null;
    contactUnmount();
  }
  function pointer(x, y) { ptr.x = x; ptr.y = y; ptr.active = true; }
  function click(x, y) {
    if (reduce || !running) return false;
    rings.push({ x, y, r: 0, a: 1 });
    let nearest = null, nd = 1e9;
    for (const n of nodes) {
      const dx = n.x - x, dy = n.y - y, d = Math.hypot(dx, dy);
      if (d < 240 && d > 1) { const f = (1 - d / 240) * 160; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
      if (d < nd) { nd = d; nearest = n; }
    }
    for (let i = 0; i < 6; i++) spawnPulse(nearest);
    return false;
  }
  function contactMount(stageEl, links, P) {
    contactUnmount();
    const body = stageEl && stageEl.querySelector('#contactTermBody'); if (!body) return;
    const rerun = stageEl.querySelector('#termRerun');
    let t = null, started = false;
    const run = () => { if (t) t.stop(); links.forEach(l => l.classList.remove('decoded')); t = typer(body, contactLines(P), { onDone: () => links.forEach((l, i) => setTimeout(() => l.classList.add('decoded'), i * 120)) }); };
    const io = new IntersectionObserver(es => { es.forEach(en => { if (en.isIntersecting && !started) { started = true; run(); io.disconnect(); } }); }, { threshold: 0.3 });
    io.observe(stageEl);
    const onRerun = () => run();
    if (rerun) rerun.addEventListener('click', onRerun);
    contactCleanup = () => { io.disconnect(); if (t) t.stop(); if (rerun) rerun.removeEventListener('click', onRerun); body.innerHTML = ''; links.forEach(l => l.classList.remove('decoded')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'ai', mount, unmount, pointer, click, contactMount, contactUnmount, heroTerminal };
})();
