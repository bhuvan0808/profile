/* ==================================================================
   fx-engineer.js — AI ENGINEER · Stark engine
   An arc reactor drawn live inside the chest of an armour bust:
   chassis, counter-rotating segmented rings, a core that tilts toward
   the pointer, repulsor pulses on click, HUD readouts fed with live
   values, a boot sequence and a JARVIS-style greeting.
   ================================================================== */
window.FX_ENGINEER = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const S = () => window.SOUND;

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, coreRect = null;
  let pulses = [], flares = [], tilt = { x: 0, y: 0 }, tiltT = { x: 0, y: 0 }, power = 0, powerT = 1, hudTimer = 0, greeted = false, jarvisTyper = null;
  const ptr = { x: -1e4, y: -1e4 };
  let onResize = null, onVis = null, contactCleanup = null;

  /* ---------- reactor ---------- */
  function drawReactor(dt) {
    const r = coreRect; if (!r || r.width < 20) return;
    if (r.bottom < -80 || r.top > H + 80) return;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const R = Math.min(r.width, r.height) * 0.47;
    const k = 1 - Math.pow(0.03, dt); tilt.x += (tiltT.x - tilt.x) * k; tilt.y += (tiltT.y - tilt.y) * k;
    power += (powerT - power) * (1 - Math.pow(0.05, dt)); if (powerT > 1) powerT += (1 - powerT) * (1 - Math.pow(0.3, dt));
    const p = clamp(power, 0, 2);
    ctx.save(); ctx.translate(cx, cy);
    ctx.transform(1, tilt.y * 0.06, -tilt.x * 0.06, 1 - Math.abs(tilt.y) * 0.04, 0, 0);
    const halo = ctx.createRadialGradient(0, 0, R * 0.5, 0, 0, R * 2.6);
    halo.addColorStop(0, `rgba(62,200,255,${0.28 * p})`); halo.addColorStop(1, 'rgba(62,200,255,0)');
    ctx.fillStyle = halo; ctx.fillRect(-R * 2.6, -R * 2.6, R * 5.2, R * 5.2);
    const ch = ctx.createRadialGradient(0, -R * 0.2, R * 0.2, 0, 0, R * 1.08);
    ch.addColorStop(0, '#262a3a'); ch.addColorStop(0.7, '#141722'); ch.addColorStop(1, '#0b0d14');
    ctx.fillStyle = ch; ctx.beginPath(); ctx.arc(0, 0, R * 1.08, 0, 6.283); ctx.fill();
    ctx.strokeStyle = 'rgba(200,149,43,0.9)'; ctx.lineWidth = Math.max(1.5, R * 0.03); ctx.beginPath(); ctx.arc(0, 0, R * 1.06, 0, 6.283); ctx.stroke();
    ctx.save(); ctx.rotate(T * 0.18);
    for (let i = 0; i < 10; i++) {
      const a0 = (i / 10) * 6.283, a1 = a0 + 6.283 / 10 - 0.09;
      ctx.beginPath(); ctx.arc(0, 0, R * 0.88, a0, a1); ctx.lineWidth = R * 0.12; ctx.strokeStyle = i % 2 ? '#3a3f52' : '#4a5066'; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, R * 0.88, a0 + 0.02, a1 - 0.02); ctx.lineWidth = R * 0.035; ctx.strokeStyle = `rgba(62,200,255,${(0.3 + 0.5 * Math.max(0, Math.sin(T * 2 + i))) * p})`; ctx.stroke();
    }
    ctx.restore();
    ctx.save(); ctx.rotate(-T * 0.32); ctx.strokeStyle = 'rgba(200,149,43,0.85)'; ctx.lineWidth = Math.max(1, R * 0.02);
    for (let i = 0; i < 48; i++) { const a = (i / 48) * 6.283, l = i % 4 === 0 ? R * 0.09 : R * 0.04; ctx.beginPath(); ctx.moveTo(Math.cos(a) * R * 0.7, Math.sin(a) * R * 0.7); ctx.lineTo(Math.cos(a) * (R * 0.7 - l), Math.sin(a) * (R * 0.7 - l)); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.rotate(T * 0.1);
    for (let i = 0; i < 8; i++) { const a = (i / 8) * 6.283; ctx.save(); ctx.rotate(a); ctx.fillStyle = '#1d2130'; ctx.beginPath(); ctx.roundRect(R * 0.43, -R * 0.07, R * 0.16, R * 0.14, 2); ctx.fill(); ctx.strokeStyle = `rgba(62,200,255,${0.5 * p})`; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }
    ctx.restore();
    const pulse = (0.85 + 0.15 * Math.sin(T * 3.1)) * (0.4 + 0.6 * p) + Math.max(0, p - 1) * 0.5;
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.42 * pulse);
    core.addColorStop(0, 'rgba(255,255,255,1)'); core.addColorStop(0.35, 'rgba(180,240,255,0.95)'); core.addColorStop(0.7, `rgba(62,200,255,${0.6 * pulse})`); core.addColorStop(1, 'rgba(62,200,255,0)');
    ctx.fillStyle = core; ctx.beginPath(); ctx.arc(0, 0, R * 0.42 * pulse, 0, 6.283); ctx.fill();
    ctx.save(); ctx.rotate(-Math.PI / 2); ctx.strokeStyle = `rgba(255,255,255,${0.95 * clamp(p, 0, 1)})`; ctx.lineWidth = Math.max(1.5, R * 0.03); ctx.shadowColor = '#3ec8ff'; ctx.shadowBlur = 18;
    ctx.beginPath(); for (let i = 0; i < 3; i++) { const a = (i / 3) * 6.283; const x = Math.cos(a) * R * 0.27, y = Math.sin(a) * R * 0.27; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.stroke();
    ctx.restore();
    flares = flares.filter(f => { f.t += dt; if (f.t > f.life) return false; const q = f.t / f.life; ctx.save(); ctx.rotate(f.a + q * 1.4); ctx.globalAlpha = 1 - q; ctx.strokeStyle = '#bfefff'; ctx.lineWidth = 2; ctx.shadowColor = '#3ec8ff'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(0, 0, R * (0.5 + q * 0.45), -0.3, 0.3); ctx.stroke(); ctx.restore(); return true; });
    if (Math.random() < dt * 0.9 * p) flares.push({ a: rand(0, 6.283), t: 0, life: rand(0.5, 0.9) });
    ctx.restore();
    pulses = pulses.filter(pl => {
      pl.r += (R * 4) * dt; pl.a -= dt * 1.3; if (pl.a <= 0) return false;
      fctx.strokeStyle = `rgba(62,200,255,${pl.a})`; fctx.lineWidth = 2 + 6 * pl.a; fctx.beginPath(); fctx.arc(cx, cy, pl.r, 0, 6.283); fctx.stroke();
      return true;
    });
    const dx = (ptr.x - cx) / Math.max(1, W * 0.35), dy = (ptr.y - cy) / Math.max(1, H * 0.5);
    if (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5) { tiltT.x = clamp(dx, -0.6, 0.6); tiltT.y = clamp(dy, -0.6, 0.6); } else { tiltT.x = 0; tiltT.y = 0; }
  }
  function updateHud(dt) {
    hudTimer -= dt; if (hudTimer > 0 || !env || !env.hudVals) return; hudTimer = 0.28;
    env.hudVals.forEach(el => {
      const base = parseFloat(el.dataset.base), jit = parseFloat(el.dataset.jitter || '0'), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
      el.textContent = pre + (base * clamp(power, 0.05, 1.2) + rand(-jit, jit)).toFixed(dec) + suf;
    });
  }

  /* ---------- loop ---------- */
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight;
    for (const c of [bg, fx]) { c.width = Math.round(W * DPR); c.height = Math.round(H * DPR); }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000) || 0; last = now; T += dt;
    ctx.clearRect(0, 0, W, H); fctx.clearRect(0, 0, W, H);
    coreRect = env.stage ? env.stage.getBoundingClientRect() : null;
    /* the reactor sits inside the armour, so it renders on the top canvas */
    const bgCtx = ctx; ctx = fctx; drawReactor(dt); ctx = bgCtx;
    updateHud(dt);
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function drawOnce() { fctx.clearRect(0, 0, W, H); coreRect = env.stage ? env.stage.getBoundingClientRect() : null; power = 1; const bgCtx = ctx; ctx = fctx; drawReactor(0); ctx = bgCtx; }

  /* ---------- typing ---------- */
  function typer(el, lines, opts) {
    opts = opts || {};
    let i = 0, alive = true, timer = 0, html = '';
    const cursor = '<span class="term-cursor"></span>';
    const render = extra => { el.innerHTML = html + (extra || '') + cursor; };
    const next = () => {
      if (!alive) return;
      if (i >= lines.length) { if (opts.onDone) opts.onDone(); return; }
      const ln = lines[i++];
      if (ln.k === 'c' && !reduce) {
        let j = 0; const text = ln.t;
        const tick = () => { if (!alive) return; j++; render(`<span class="c">${esc(text.slice(0, j))}</span>`); if (j < text.length) timer = setTimeout(tick, 16 + Math.random() * 28); else { html += `<span class="c">${esc(text)}</span>\n`; if (S()) S().play('beep'); timer = setTimeout(next, 260); } };
        tick();
      } else {
        timer = setTimeout(() => { if (!alive) return; html += ln.html ? ln.html + '\n' : `<span class="${ln.k || 'd'}">${esc(ln.t)}</span>\n`; render(); next(); }, reduce ? 0 : (ln.d || 240));
      }
    };
    render(); next();
    return { stop() { alive = false; clearTimeout(timer); } };
  }
  function typeLine(el, text, speed, onDone) {
    let i = 0, alive = true, timer = 0;
    const tick = () => { if (!alive) return; i++; el.textContent = text.slice(0, i); if (i < text.length) timer = setTimeout(tick, speed); else if (onDone) onDone(); };
    if (reduce) { el.textContent = text; if (onDone) onDone(); } else tick();
    return { stop() { alive = false; clearTimeout(timer); } };
  }
  function channelLines(P) {
    return [
      { t: '> open channel --to bhuvan', k: 'c' },
      { t: 'handshake ok · encryption AES-256-GCM · latency 12 ms', k: 'd' },
      { html: `<span class="p">email</span>     <a href="mailto:${P.email}">${P.email}</a>` },
      { html: `<span class="p">linkedin</span>  <a href="${P.linkedin}" target="_blank" rel="noopener">linkedin.com/in/bhuvanboddu</a>` },
      { html: `<span class="p">github</span>    <a href="${P.github}" target="_blank" rel="noopener">github.com/bhuvan0808</a>` },
      { html: `<span class="p">phone</span>     <a href="${P.phoneHref}">${P.phone}</a>` },
      { t: '> status', k: 'c', d: 420 },
      { t: 'open_to    founding AI engineer · applied research · agentic systems · full-stack AI', k: 'd' },
      { t: 'location   Chennai → anywhere', k: 'd' },
      { t: 'response   usually the same day', k: 'ok' }
    ];
  }

  /* ---------- boot + greeting ---------- */
  function boot() {
    if (!env) return;
    power = reduce ? 1 : 0.05; powerT = 1;
    if (env.suit) { env.suit.classList.remove('boot'); void env.suit.offsetWidth; env.suit.classList.add('boot'); }
    if (env.jarvis) env.jarvis.textContent = '';
    if (S()) S().play('boot');
    setTimeout(() => { powerT = 1.6; }, 900);
  }
  function greet() {
    if (!env || greeted) return;
    greeted = true;
    const text = env.greeting || 'Systems online.';
    if (jarvisTyper) jarvisTyper.stop();
    if (env.jarvis) { env.jarvis.classList.add('on'); jarvisTyper = typeLine(env.jarvis, text, 34); }
    if (S()) S().speak(text);
    powerT = 1.8;
  }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce; greeted = false;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    resize(); pulses = []; flares = [];
    onResize = () => { resize(); if (reduce) drawOnce(); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', onVis);
    if (S()) S().ambience('hum');
    if (env.jarvis) { env.jarvis.textContent = ''; env.jarvis.classList.remove('on'); }
    if (reduce) { drawOnce(); window.addEventListener('scroll', drawOnce, { passive: true }); } else { boot(); start(); }
  }
  function unmount() {
    stop(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('scroll', drawOnce);
    if (jarvisTyper) { jarvisTyper.stop(); jarvisTyper = null; }
    if (S()) S().cancelSpeech();
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    pulses = []; flares = []; env = null; contactUnmount();
  }
  function pointer(x, y) { ptr.x = x; ptr.y = y; }
  function click(x, y) {
    if (reduce || !running) return false;
    const r = env.suit ? env.suit.getBoundingClientRect() : coreRect;
    const inStage = r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    pulses.push({ r: inStage ? 6 : 0, a: inStage ? 1 : 0.45 }); powerT = inStage ? 1.9 : 1.35;
    for (let i = 0; i < 3; i++) flares.push({ a: rand(0, 6.283), t: 0, life: rand(0.4, 0.8) });
    if (S()) S().play('repulsor');
    if (inStage && env.hud && env.hud.hint) env.hud.hint.style.opacity = '0';
    if (!greeted) greet();
    return inStage;
  }
  function contactMount(stageEl, links, P) {
    contactUnmount();
    const body = stageEl && stageEl.querySelector('#channelBody'); if (!body) return;
    const rerun = stageEl.querySelector('#channelRerun');
    let t = null, started = false;
    const run = () => { if (t) t.stop(); links.forEach(l => l.classList.remove('decoded')); t = typer(body, channelLines(P), { onDone: () => links.forEach((l, i) => setTimeout(() => l.classList.add('decoded'), i * 120)) }); };
    const io = new IntersectionObserver(es => { es.forEach(en => { if (en.isIntersecting && !started) { started = true; run(); io.disconnect(); } }); }, { threshold: 0.3 });
    io.observe(stageEl);
    const onRerun = () => run();
    if (rerun) rerun.addEventListener('click', onRerun);
    contactCleanup = () => { io.disconnect(); if (t) t.stop(); if (rerun) rerun.removeEventListener('click', onRerun); body.innerHTML = ''; links.forEach(l => l.classList.remove('decoded')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'engineer', mount, unmount, pointer, click, greet, contactMount, contactUnmount };
})();
