/* ==================================================================
   fx-builder.js — BUILDER MODE · Shadow Fight engine
   Silhouette fighters on the hero, ember ambience, slash + spark FX,
   ember cursor trail, "VS" contact stage.
   ================================================================== */
window.FX_BUILDER = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeIn = t => t * t * t;
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* limb lengths (unscaled px) and poses (absolute angles, facing right) */
  const L = { torso: 60, neck: 8, head: 14, upper: 36, fore: 34, thigh: 48, shin: 46 };
  const P = {
    idle:      { torso: -1.45, fUp: 0.35, fFore: -1.25, bUp: 0.12, bFore: -1.45, fThigh: 1.2,  fShin: 1.62, bThigh: 1.95, bShin: 1.5 },
    guard:     { torso: -1.5,  fUp: 0.05, fFore: -1.55, bUp: -0.15, bFore: -1.65, fThigh: 1.25, fShin: 1.6, bThigh: 1.9, bShin: 1.5 },
    punchWind: { torso: -1.38, fUp: 0.95, fFore: -1.0,  bUp: 0.25, bFore: -1.35, fThigh: 1.2,  fShin: 1.62, bThigh: 2.0,  bShin: 1.5 },
    punch:     { torso: -1.18, fUp: -0.22, fFore: -0.04, bUp: 0.55, bFore: -1.25, fThigh: 1.0, fShin: 1.72, bThigh: 2.2, bShin: 1.4 },
    kickWind:  { torso: -1.62, fUp: 0.4,  fFore: -1.3,  bUp: 0.1,  bFore: -1.5,  fThigh: 0.75, fShin: 2.15, bThigh: 1.75, bShin: 1.58 },
    kick:      { torso: -1.92, fUp: 0.7,  fFore: -0.9,  bUp: -0.5, bFore: -2.0,  fThigh: -0.12, fShin: -0.02, bThigh: 1.8, bShin: 1.6 },
    hit:       { torso: -1.98, fUp: -0.9, fFore: -2.3,  bUp: -1.1, bFore: -2.5,  fThigh: 1.35, fShin: 1.6, bThigh: 1.85, bShin: 1.55 }
  };

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, mobile = false;
  let embers = [], sparks = [], slashes = [], trail = [], tweens = [];
  let player = null, enemy = null, shake = 0, round = 1, altKind = 0, stageRect = null;
  let onResize = null, onVis = null, contactCleanup = null, koTimer = 0;

  /* ---------- fighters ---------- */
  function makeFighter(face, isEnemy) {
    return {
      face, enemy: isEnemy, pose: { ...P.idle }, from: { ...P.idle }, to: P.idle, t: 1, dur: 1, ease: easeInOut,
      dx: 0, dxT: 0, flash: 0, hp: 100, seq: null, seqI: 0, seqT: 0, seqDur: 0, bob: rand(0, 6), fall: 0, ko: false, pts: null, idleTimer: rand(2, 4)
    };
  }
  function setPose(f, name, dur, ease) { f.from = { ...f.pose }; f.to = P[name]; f.t = 0; f.dur = Math.max(0.01, dur); f.ease = ease || easeInOut; }
  function runSeq(f, steps) { f.seq = steps; f.seqI = -1; nextStep(f); }
  function nextStep(f) {
    f.seqI++;
    const s = f.seq && f.seq[f.seqI];
    if (!s) { f.seq = null; setPose(f, 'idle', 0.35); f.dxT = 0; return; }
    setPose(f, s.pose, s.dur, s.ease);
    if (s.dx !== undefined) f.dxT = s.dx;
    if (s.on) s.on();
    f.seqT = 0; f.seqDur = s.dur + (s.hold || 0);
  }
  function updateFighter(f, dt) {
    if (f.t < 1) {
      f.t = Math.min(1, f.t + dt / f.dur);
      const e = f.ease(f.t);
      for (const k in f.to) f.pose[k] = lerp(f.from[k], f.to[k], e);
    }
    if (f.seq) { f.seqT += dt; if (f.seqT >= f.seqDur) nextStep(f); }
    f.dx = lerp(f.dx, f.dxT, 1 - Math.pow(0.0005, dt));
    f.flash = Math.max(0, f.flash - dt * 3);
    if (f.enemy && !f.seq && !f.ko) {
      f.idleTimer -= dt;
      if (f.idleTimer <= 0) { f.idleTimer = rand(2.5, 5); runSeq(f, [{ pose: 'guard', dur: 0.25 }, { pose: 'guard', dur: 0.3 }, { pose: 'idle', dur: 0.4 }]); }
    }
  }
  function mixColor(a, b, t) {
    const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
    const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
    return `rgb(${Math.round(lerp(pa[0], pb[0], t))},${Math.round(lerp(pa[1], pb[1], t))},${Math.round(lerp(pa[2], pb[2], t))})`;
  }
  function drawFighter(f, gx, gy, s) {
    const p = f.pose, face = f.face;
    const bob = Math.sin(T * 2.2 + f.bob) * 2.2 * s;
    const hip = { x: gx + f.dx * s, y: gy - (L.thigh + L.shin) * 0.9 * s + bob };
    const pt = (o, a, l) => ({ x: o.x + Math.cos(a) * l * s * face, y: o.y + Math.sin(a) * l * s });
    ctx.save();
    if (f.fall > 0) { const px = hip.x - 26 * s * face, py = gy; ctx.translate(px, py); ctx.rotate(-face * f.fall * 1.5); ctx.translate(-px, -py); }
    const neck = pt(hip, p.torso, L.torso);
    const shoulder = pt(hip, p.torso, L.torso * 0.88);
    const head = pt(neck, p.torso, L.neck + L.head * 0.7);
    const fEl = pt(shoulder, p.fUp, L.upper), fHand = pt(fEl, p.fFore, L.fore);
    const bEl = pt(shoulder, p.bUp, L.upper), bHand = pt(bEl, p.bFore, L.fore);
    const fKnee = pt(hip, p.fThigh, L.thigh), fFoot = pt(fKnee, p.fShin, L.shin);
    const bKnee = pt(hip, p.bThigh, L.thigh), bFoot = pt(bKnee, p.bShin, L.shin);
    f.pts = { hip, neck, head, fHand, fFoot, bHand, bFoot };

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath(); ctx.ellipse(hip.x, gy + 3, 46 * s, 7 * s, 0, 0, Math.PI * 2); ctx.fill();

    const base = f.enemy ? '#0e0709' : '#08070a';
    const col = f.flash > 0 ? mixColor(base, '#ff3b2f', f.flash * 0.85) : base;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = f.enemy ? 'rgba(224,30,55,0.6)' : 'rgba(255,110,40,0.65)';
    ctx.shadowBlur = 20 * s;
    ctx.strokeStyle = col; ctx.fillStyle = col;
    const seg = (a, b, w) => { ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    seg(shoulder, bEl, 9); seg(bEl, bHand, 8);
    seg(hip, bKnee, 11); seg(bKnee, bFoot, 10);
    seg(hip, neck, 15);
    seg(hip, fKnee, 11); seg(fKnee, fFoot, 10);
    seg(shoulder, fEl, 9); seg(fEl, fHand, 8);
    ctx.beginPath(); ctx.arc(head.x, head.y, L.head * s, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.arc(fHand.x, fHand.y, 5.5 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(bHand.x, bHand.y, 5 * s, 0, Math.PI * 2); ctx.fill();

    if (f.enemy) {
      ctx.strokeStyle = '#e01e37'; ctx.fillStyle = '#e01e37'; ctx.lineWidth = 2.5 * s;
      for (const d of [-1, 1]) {
        const ax = head.x + d * 6 * s, ay = head.y - L.head * s;
        const tx = ax + d * 10 * s + Math.sin(T * 5 + d) * 2 * s, ty = ay - 16 * s;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(ax + d * 2 * s, ay - 12 * s, tx, ty); ctx.stroke();
        ctx.beginPath(); ctx.arc(tx, ty, 3 * s, 0, Math.PI * 2); ctx.fill();
      }
    } else {
      ctx.strokeStyle = '#ff4d1c'; ctx.lineWidth = 3 * s;
      const hx = head.x - L.head * s * 0.7 * face, hy = head.y - 2 * s;
      for (let i = 0; i < 2; i++) {
        const w = Math.sin(T * 7 + i * 1.7) * 6 * s, w2 = Math.sin(T * 6 + i * 2.3) * 9 * s;
        ctx.beginPath(); ctx.moveTo(hx, hy + i * 4 * s);
        ctx.quadraticCurveTo(hx - 24 * s * face, hy + 4 * s + w + i * 6 * s, hx - (46 + i * 8) * s * face, hy + 14 * s + w2 + i * 8 * s);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* ---------- combat ---------- */
  function attack() {
    if (!player || player.seq || reduce) return false;
    const kind = (altKind++ % 3 === 2) ? 'kick' : 'punch';
    runSeq(player, [
      { pose: kind + 'Wind', dur: 0.1, ease: easeOut, dx: -8 },
      { pose: kind, dur: 0.08, ease: easeOut, dx: kind === 'kick' ? 34 : 46 },
      { pose: kind, dur: 0.16, on: () => strike(kind) },
      { pose: 'idle', dur: 0.32, ease: easeInOut, dx: 0 }
    ]);
    return true;
  }
  function strike(kind) {
    const tip = kind === 'kick' ? player.pts && player.pts.fFoot : player.pts && player.pts.fHand;
    if (!tip) return;
    addSlash(tip.x, tip.y, kind === 'kick' ? 1.4 : 1, 1);
    burst(tip.x, tip.y, kind === 'kick' ? 22 : 14);
    shake = kind === 'kick' ? 9 : 6;
    hitEnemy(kind === 'kick' ? rand(20, 28) : rand(12, 18));
  }
  function hitEnemy(dmg) {
    if (!enemy || enemy.ko) return;
    enemy.hp = Math.max(0, enemy.hp - dmg); enemy.flash = 1;
    runSeq(enemy, [{ pose: 'hit', dur: 0.07, ease: easeOut, dx: 30 }, { pose: 'hit', dur: 0.2 }, { pose: 'idle', dur: 0.4, ease: easeInOut, dx: 0 }]);
    setHud();
    if (enemy.hp <= 0) knockout();
  }
  function knockout() {
    enemy.ko = true; enemy.seq = null; setPose(enemy, 'hit', 0.1); enemy.dxT = 14;
    tweens.push({ o: enemy, k: 'fall', from: 0, to: 1, dur: 0.6, t: 0, ease: easeIn });
    shake = 14;
    const ko = env && env.hud && env.hud.ko;
    if (ko) { ko.classList.remove('show'); void ko.offsetWidth; ko.classList.add('show'); }
    clearTimeout(koTimer);
    koTimer = setTimeout(() => {
      if (!enemy) return;
      tweens.push({ o: enemy, k: 'fall', from: 1, to: 0, dur: 0.45, t: 0, ease: easeOut });
      enemy.hp = 100; enemy.ko = false; enemy.dxT = 0; setPose(enemy, 'idle', 0.4); round++; setHud();
    }, 2600);
  }
  function setHud() {
    const h = env && env.hud; if (!h) return;
    if (h.enemy) h.enemy.style.width = enemy.hp + '%';
    if (h.round) h.round.textContent = 'R' + round;
  }

  /* ---------- effects ---------- */
  function addSlash(x, y, size, dir) { slashes.push({ x, y, size, dir, a: rand(-1.1, -0.2), t: 0, life: 0.3 }); }
  function drawSlashes(dt) {
    slashes = slashes.filter(sl => {
      sl.t += dt; const p = sl.t / sl.life; if (p >= 1) return false;
      const r = 72 * sl.size * (0.55 + 0.45 * easeOut(p));
      fctx.save(); fctx.translate(sl.x, sl.y); fctx.rotate(sl.a); fctx.scale(sl.dir, 1);
      fctx.globalAlpha = 1 - p; fctx.lineCap = 'round'; fctx.shadowColor = '#ff7a3d'; fctx.shadowBlur = 26;
      const grad = fctx.createLinearGradient(-r, 0, r, 0);
      grad.addColorStop(0, 'rgba(255,180,84,0)'); grad.addColorStop(0.5, '#ffffff'); grad.addColorStop(1, 'rgba(255,77,28,0)');
      fctx.strokeStyle = grad; fctx.lineWidth = 12 * sl.size * (1 - p * 0.7);
      fctx.beginPath(); fctx.arc(0, r * 0.9, r, -Math.PI * 0.82, -Math.PI * 0.18); fctx.stroke();
      fctx.restore(); return true;
    });
  }
  function burst(x, y, n) {
    for (let i = 0; i < n; i++) { const a = rand(0, Math.PI * 2), sp = rand(120, 480); sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 90, life: rand(0.3, 0.7), t: 0, w: rand(1, 2.5) }); }
    if (sparks.length > 400) sparks.splice(0, sparks.length - 400);
  }
  function drawSparks(dt) {
    sparks = sparks.filter(sp => {
      sp.t += dt; if (sp.t > sp.life) return false;
      sp.vy += 700 * dt; sp.x += sp.vx * dt; sp.y += sp.vy * dt;
      const p = 1 - sp.t / sp.life;
      fctx.strokeStyle = `rgba(255,${Math.round(150 + 80 * p)},60,${p})`; fctx.lineWidth = sp.w;
      fctx.beginPath(); fctx.moveTo(sp.x, sp.y); fctx.lineTo(sp.x - sp.vx * 0.03, sp.y - sp.vy * 0.03); fctx.stroke();
      return true;
    });
  }
  function newEmber(fromBottom) { return { x: rand(0, W), y: fromBottom ? H + 10 : rand(0, H), vy: rand(12, 42), vx: rand(-8, 8), r: rand(0.8, 2.6), ph: rand(0, 6.28), sp: rand(3, 8), hue: rand(14, 40) }; }
  function initEmbers() { const n = mobile ? 40 : 110; embers = []; for (let i = 0; i < n; i++) embers.push(newEmber(false)); }
  function drawEmbers(dt) {
    for (const e of embers) {
      e.y -= e.vy * dt; e.x += (e.vx + Math.sin(T * 0.8 + e.ph) * 12) * dt;
      if (e.y < -10 || e.x < -20 || e.x > W + 20) Object.assign(e, newEmber(true));
      const a = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(T * e.sp + e.ph));
      ctx.fillStyle = `hsla(${e.hue},100%,62%,${a})`;
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 6.283); ctx.fill();
      if (e.r > 2) { ctx.fillStyle = `hsla(${e.hue},100%,60%,${a * 0.18})`; ctx.beginPath(); ctx.arc(e.x, e.y, e.r * 3, 0, 6.283); ctx.fill(); }
    }
  }
  function drawTrail(dt) {
    trail = trail.filter(p => {
      p.t += dt; if (p.t > p.life) return false;
      p.x += p.vx * dt; p.y += p.vy * dt; const k = 1 - p.t / p.life;
      fctx.fillStyle = `rgba(255,${Math.round(120 + 100 * k)},50,${k})`;
      fctx.beginPath(); fctx.arc(p.x, p.y, p.r * k + 0.4, 0, 6.283); fctx.fill();
      return true;
    });
  }

  /* ---------- arena ---------- */
  function drawArena(dt) {
    const r = stageRect; if (!r || r.width < 40) return;
    if (r.bottom < -60 || r.top > H + 60) { updateFighter(player, dt); updateFighter(enemy, dt); return; }
    const s = clamp(r.height / 560, 0.55, 1.05);
    const gy = r.top + r.height * 0.86;
    const cx = r.left + r.width / 2;
    const g = ctx.createRadialGradient(cx, gy, 10, cx, gy, r.width * 0.65);
    g.addColorStop(0, 'rgba(255,90,30,0.32)'); g.addColorStop(0.5, 'rgba(255,60,20,0.10)'); g.addColorStop(1, 'rgba(255,60,20,0)');
    ctx.fillStyle = g; ctx.fillRect(r.left - 120, r.top - 20, r.width + 240, r.height + 60);
    const fl = ctx.createLinearGradient(r.left, 0, r.right, 0);
    fl.addColorStop(0, 'rgba(255,180,84,0)'); fl.addColorStop(0.5, 'rgba(255,180,84,0.75)'); fl.addColorStop(1, 'rgba(255,180,84,0)');
    ctx.strokeStyle = fl; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(r.left, gy + 4); ctx.lineTo(r.right, gy + 4); ctx.stroke();
    ctx.save();
    if (shake > 0) ctx.translate(rand(-shake, shake), rand(-shake, shake));
    updateFighter(player, dt); updateFighter(enemy, dt);
    drawFighter(player, r.left + r.width * 0.32, gy, s);
    drawFighter(enemy, r.left + r.width * 0.7, gy, s);
    ctx.restore();
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
    ctx.clearRect(0, 0, W, H); fctx.clearRect(0, 0, W, H);
    drawEmbers(dt);
    stageRect = env.stage ? env.stage.getBoundingClientRect() : null;
    tweens = tweens.filter(tw => { tw.t += dt / tw.dur; tw.o[tw.k] = lerp(tw.from, tw.to, tw.ease(Math.min(1, tw.t))); return tw.t < 1; });
    drawArena(dt);
    shake = Math.max(0, shake - dt * 45);
    drawTrail(dt); drawSlashes(dt); drawSparks(dt);
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function drawOnce() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < 30; i++) { const e = newEmber(false); ctx.fillStyle = `hsla(${e.hue},100%,62%,0.6)`; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 6.283); ctx.fill(); }
    stageRect = env.stage ? env.stage.getBoundingClientRect() : null;
    drawArena(0);
  }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    player = makeFighter(1, false); enemy = makeFighter(-1, true); round = 1; altKind = 0; shake = 0;
    resize(); initEmbers(); setHud();
    onResize = () => { resize(); initEmbers(); if (reduce) drawOnce(); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    if (reduce) { drawOnce(); window.addEventListener('scroll', drawOnce, { passive: true }); } else start();
  }
  function unmount() {
    stop(); clearTimeout(koTimer);
    window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('scroll', drawOnce);
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    embers = []; sparks = []; slashes = []; trail = []; tweens = []; player = enemy = null; env = null;
    contactUnmount();
  }
  function pointer(x, y) {
    if (reduce || !running) return;
    for (let i = 0; i < 2; i++) trail.push({ x: x + rand(-3, 3), y: y + rand(-3, 3), vx: rand(-20, 20), vy: rand(-70, -20), t: 0, life: rand(0.4, 0.8), r: rand(1, 2.6) });
    if (trail.length > 180) trail.splice(0, trail.length - 180);
  }
  function click(x, y) {
    if (reduce || !running) return false;
    const r = stageRect;
    const inArena = r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    if (inArena) { attack(); if (env.hud && env.hud.hint) env.hud.hint.style.opacity = '0'; return true; }
    addSlash(x, y, 0.6, Math.random() < 0.5 ? 1 : -1); burst(x, y, 8);
    return false;
  }
  function contactMount(stageEl, links) {
    contactUnmount();
    const btn = stageEl && stageEl.querySelector('#fightBtn'); if (!btn) return;
    const status = stageEl.querySelector('.vs-status');
    const handler = () => {
      const r = stageEl.getBoundingClientRect(); stageEl.classList.add('fought');
      for (let i = 0; i < 6; i++) setTimeout(() => {
        if (!running) return;
        const x = r.left + rand(r.width * 0.2, r.width * 0.8), y = r.top + rand(r.height * 0.2, r.height * 0.8);
        addSlash(x, y, rand(0.8, 1.3), Math.random() < 0.5 ? 1 : -1); burst(x, y, 12); shake = 5;
        const cut = document.createElement('i'); cut.className = 'cut'; cut.style.top = rand(15, 85) + '%'; cut.style.transform = `rotate(${rand(-25, 25)}deg)`;
        stageEl.appendChild(cut); setTimeout(() => cut.remove(), 600);
      }, i * 90);
      setTimeout(() => {
        if (status) status.textContent = 'Round 1 — send the brief. Moves unlocked below.';
        links.forEach((l, i) => setTimeout(() => { l.classList.remove('slam'); void l.offsetWidth; l.classList.add('slam'); }, i * 110));
      }, 560);
      btn.textContent = 'Fight again';
    };
    btn.addEventListener('click', handler);
    contactCleanup = () => { btn.removeEventListener('click', handler); stageEl.classList.remove('fought'); links.forEach(l => l.classList.remove('slam')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'builder', mount, unmount, pointer, click, contactMount, contactUnmount };
})();
