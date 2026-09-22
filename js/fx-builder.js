/* ==================================================================
   fx-builder.js — BUILDER · Shadow Fight engine
   A sunlit bamboo forest painted into the hero, a samurai silhouette
   with a katana, and an opponent called Excuses. Click the arena to
   strike. Knock an excuse out and the next one steps in.
   ================================================================== */
window.FX_BUILDER = (function () {
  'use strict';
  const rand = (a, b) => a + Math.random() * (b - a);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeIn = t => t * t * t;
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const L = { torso: 62, neck: 8, head: 13, upper: 36, fore: 34, thigh: 50, shin: 48 };
  const P = {
    idle:      { torso: -1.47, fUp: 0.5,  fFore: -0.55, bUp: 0.15, bFore: -1.5,  fThigh: 1.05, fShin: 1.7, bThigh: 2.1,  bShin: 1.45 },
    guard:     { torso: -1.52, fUp: 0.1,  fFore: -1.5,  bUp: -0.2, bFore: -1.7,  fThigh: 1.2,  fShin: 1.62, bThigh: 1.95, bShin: 1.5 },
    slashWind: { torso: -1.6,  fUp: -1.3, fFore: -1.9,  bUp: 0.3,  bFore: -1.2,  fThigh: 1.05, fShin: 1.7, bThigh: 2.1,  bShin: 1.45 },
    slash:     { torso: -1.15, fUp: 0.25, fFore: 0.45,  bUp: -0.9, bFore: -1.9,  fThigh: 0.85, fShin: 1.78, bThigh: 2.3,  bShin: 1.4 },
    kickWind:  { torso: -1.62, fUp: 0.4,  fFore: -1.3,  bUp: 0.1,  bFore: -1.5,  fThigh: 0.75, fShin: 2.15, bThigh: 1.75, bShin: 1.58 },
    kick:      { torso: -1.92, fUp: 0.7,  fFore: -0.9,  bUp: -0.5, bFore: -2.0,  fThigh: -0.12, fShin: -0.02, bThigh: 1.8, bShin: 1.6 },
    hit:       { torso: -1.98, fUp: -0.9, fFore: -2.3,  bUp: -1.1, bFore: -2.5,  fThigh: 1.35, fShin: 1.6, bThigh: 1.85, bShin: 1.55 },
    eIdle:     { torso: -1.5,  fUp: 0.9,  fFore: -1.0,  bUp: 0.6,  bFore: -1.2,  fThigh: 1.15, fShin: 1.65, bThigh: 2.0,  bShin: 1.5 }
  };

  let bg, ctx, fx, fctx, W = 0, H = 0, DPR = 1, raf = 0, running = false, last = 0, T = 0;
  let env = null, reduce = false, mobile = false, excuses = ['No budget'];
  let leaves = [], burstLeaves = [], slashes = [], tweens = [];
  let player = null, enemy = null, shake = 0, round = 1, excuseIdx = 0, altKind = 0, stageRect = null, heroRect = null;
  let forest = null, forestKey = '';
  const ptr = { nx: 0, ny: 0 }; const par = { x: 0, y: 0 };
  let onResize = null, onVis = null, contactCleanup = null, koTimer = 0;
  const S = () => window.SOUND;

  /* ---------- fighters ---------- */
  function makeFighter(face, isEnemy) {
    return { face, enemy: isEnemy, pose: { ...(isEnemy ? P.eIdle : P.idle) }, from: { ...P.idle }, to: isEnemy ? P.eIdle : P.idle, t: 1, dur: 1, ease: easeInOut,
      dx: 0, dxT: 0, flash: 0, hp: 100, seq: null, seqI: 0, seqT: 0, seqDur: 0, bob: rand(0, 6), fall: 0, ko: false, pts: null, idleTimer: rand(2, 4) };
  }
  function setPose(f, name, dur, ease) { f.from = { ...f.pose }; f.to = P[name]; f.t = 0; f.dur = Math.max(0.01, dur); f.ease = ease || easeInOut; }
  function runSeq(f, steps) { f.seq = steps; f.seqI = -1; nextStep(f); }
  function nextStep(f) {
    f.seqI++;
    const s = f.seq && f.seq[f.seqI];
    if (!s) { f.seq = null; setPose(f, f.enemy ? 'eIdle' : 'idle', 0.35); f.dxT = 0; return; }
    setPose(f, s.pose, s.dur, s.ease);
    if (s.dx !== undefined) f.dxT = s.dx;
    if (s.on) s.on();
    f.seqT = 0; f.seqDur = s.dur + (s.hold || 0);
  }
  function updateFighter(f, dt) {
    if (f.t < 1) { f.t = Math.min(1, f.t + dt / f.dur); const e = f.ease(f.t); for (const k in f.to) f.pose[k] = lerp(f.from[k], f.to[k], e); }
    if (f.seq) { f.seqT += dt; if (f.seqT >= f.seqDur) nextStep(f); }
    f.dx = lerp(f.dx, f.dxT, 1 - Math.pow(0.0005, dt));
    f.flash = Math.max(0, f.flash - dt * 3);
    if (f.enemy && !f.seq && !f.ko) { f.idleTimer -= dt; if (f.idleTimer <= 0) { f.idleTimer = rand(2.5, 5); runSeq(f, [{ pose: 'guard', dur: 0.3 }, { pose: 'guard', dur: 0.3 }, { pose: 'eIdle', dur: 0.4 }]); } }
  }
  function drawFighter(f, gx, gy, s) {
    const p = f.pose, face = f.face;
    const bob = Math.sin(T * 2 + f.bob) * 2 * s;
    const hip = { x: gx + f.dx * s, y: gy - (L.thigh + L.shin) * 0.9 * s + bob };
    const pt = (o, a, l) => ({ x: o.x + Math.cos(a) * l * s * face, y: o.y + Math.sin(a) * l * s });
    ctx.save();
    if (f.fall > 0) { const px = hip.x - 26 * s * face, py = gy; ctx.translate(px, py); ctx.rotate(-face * f.fall * 1.5); ctx.translate(-px, -py); }
    const neck = pt(hip, p.torso, L.torso), shoulder = pt(hip, p.torso, L.torso * 0.88), head = pt(neck, p.torso, L.neck + L.head * 0.7);
    const fEl = pt(shoulder, p.fUp, L.upper), fHand = pt(fEl, p.fFore, L.fore);
    const bEl = pt(shoulder, p.bUp, L.upper), bHand = pt(bEl, p.bFore, L.fore);
    const fKnee = pt(hip, p.fThigh, L.thigh), fFoot = pt(fKnee, p.fShin, L.shin);
    const bKnee = pt(hip, p.bThigh, L.thigh), bFoot = pt(bKnee, p.bShin, L.shin);
    f.pts = { hip, neck, head, fHand, fFoot, bHand, bFoot, fFore: p.fFore };

    ctx.fillStyle = 'rgba(10,20,10,0.35)'; ctx.beginPath(); ctx.ellipse(hip.x, gy + 3, 50 * s, 7 * s, 0, 0, Math.PI * 2); ctx.fill();
    const col = f.flash > 0 ? `rgb(${Math.round(11 + 90 * f.flash)},${Math.round(16 + 20 * f.flash)},${Math.round(12 + 20 * f.flash)})` : '#0b100c';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.fillStyle = col;
    const wMul = f.enemy ? 1.3 : 1;
    const seg = (a, b, w) => { ctx.lineWidth = w * s * wMul; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    seg(shoulder, bEl, 10); seg(bEl, bHand, 9);
    seg(hip, bKnee, 13); seg(bKnee, bFoot, 11);
    /* robe / hakama: a filled trapezoid from hip to knees */
    ctx.beginPath(); ctx.moveTo(hip.x - 12 * s * face, hip.y - 4 * s); ctx.lineTo(hip.x + 12 * s * face, hip.y - 4 * s); ctx.lineTo(fKnee.x + 8 * s * face, fKnee.y); ctx.lineTo(bKnee.x - 8 * s * face, bKnee.y); ctx.closePath(); ctx.fill();
    seg(hip, neck, 17);
    /* shoulders / upper body mass */
    ctx.beginPath(); ctx.ellipse(shoulder.x, shoulder.y + 2 * s, 20 * s * wMul, 10 * s, 0, 0, Math.PI * 2); ctx.fill();
    seg(hip, fKnee, 13); seg(fKnee, fFoot, 11);
    seg(shoulder, fEl, 10); seg(fEl, fHand, 9);
    ctx.beginPath(); ctx.arc(head.x, head.y, L.head * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(fHand.x, fHand.y, 5.5 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(bHand.x, bHand.y, 5 * s, 0, Math.PI * 2); ctx.fill();

    if (f.enemy) {
      /* hood */
      ctx.beginPath(); ctx.moveTo(head.x - 20 * s, head.y + 8 * s); ctx.quadraticCurveTo(head.x, head.y - 30 * s, head.x + 20 * s, head.y + 8 * s); ctx.closePath(); ctx.fill();
    } else {
      /* straw hat */
      ctx.beginPath(); ctx.moveTo(head.x - 30 * s, head.y - 4 * s); ctx.quadraticCurveTo(head.x, head.y - 28 * s, head.x + 30 * s, head.y - 4 * s); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(11,16,12,0.9)'; ctx.fillRect(head.x - 32 * s, head.y - 5 * s, 64 * s, 2.5 * s);
      /* katana in the front hand, along the forearm direction */
      const a = p.fFore, dir = { x: Math.cos(a) * face, y: Math.sin(a) };
      const len = 92 * s, gx2 = fHand.x + dir.x * 6 * s, gy2 = fHand.y + dir.y * 6 * s;
      ctx.strokeStyle = '#0b100c'; ctx.lineWidth = 4 * s; ctx.lineCap = 'butt';
      ctx.beginPath(); ctx.moveTo(gx2 - dir.y * 7 * s, gy2 + dir.x * 7 * s); ctx.lineTo(gx2 + dir.y * 7 * s, gy2 - dir.x * 7 * s); ctx.stroke();
      ctx.lineWidth = 3.2 * s; ctx.beginPath(); ctx.moveTo(gx2, gy2);
      ctx.quadraticCurveTo(gx2 + dir.x * len * 0.5 - dir.y * 4 * s, gy2 + dir.y * len * 0.5 + dir.x * 4 * s, gx2 + dir.x * len, gy2 + dir.y * len); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 0.9 * s; ctx.beginPath(); ctx.moveTo(gx2 + dir.x * 10 * s, gy2 + dir.y * 10 * s);
      ctx.quadraticCurveTo(gx2 + dir.x * len * 0.5 - dir.y * 3 * s, gy2 + dir.y * len * 0.5 + dir.x * 3 * s, gx2 + dir.x * len * 0.96, gy2 + dir.y * len * 0.96); ctx.stroke();
      f.pts.tip = { x: gx2 + dir.x * len, y: gy2 + dir.y * len };
      /* sash */
      ctx.strokeStyle = '#7a1f1f'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round';
      for (let i = 0; i < 2; i++) {
        const w = Math.sin(T * 6 + i * 1.7) * 6 * s, w2 = Math.sin(T * 5 + i * 2.3) * 9 * s;
        ctx.beginPath(); ctx.moveTo(hip.x - 8 * s * face, hip.y - 2 * s + i * 3 * s);
        ctx.quadraticCurveTo(hip.x - 26 * s * face, hip.y + 10 * s + w, hip.x - (44 + i * 8) * s * face, hip.y + 26 * s + w2 + i * 6 * s); ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* ---------- combat ---------- */
  function attack() {
    if (!player || player.seq || reduce) return false;
    const kind = (altKind++ % 3 === 2) ? 'kick' : 'slash';
    if (S()) S().play('swoosh');
    runSeq(player, [
      { pose: kind + 'Wind', dur: 0.12, ease: easeOut, dx: -8 },
      { pose: kind, dur: 0.08, ease: easeOut, dx: kind === 'kick' ? 34 : 52 },
      { pose: kind, dur: 0.16, on: () => strike(kind) },
      { pose: 'idle', dur: 0.34, ease: easeInOut, dx: 0 }
    ]);
    return true;
  }
  function strike(kind) {
    const pts = player.pts; if (!pts) return;
    const tip = kind === 'kick' ? pts.fFoot : (pts.tip || pts.fHand);
    addSlash(tip.x, tip.y, kind === 'kick' ? 1.1 : 1.5);
    burst(tip.x, tip.y, kind === 'kick' ? 14 : 22);
    shake = kind === 'kick' ? 7 : 5;
    hitEnemy(kind === 'kick' ? rand(20, 28) : rand(14, 20));
  }
  function hitEnemy(dmg) {
    if (!enemy || enemy.ko) return;
    enemy.hp = Math.max(0, enemy.hp - dmg); enemy.flash = 1;
    if (S()) S().play('hit');
    runSeq(enemy, [{ pose: 'hit', dur: 0.07, ease: easeOut, dx: 30 }, { pose: 'hit', dur: 0.2 }, { pose: 'eIdle', dur: 0.4, ease: easeInOut, dx: 0 }]);
    setHud();
    if (enemy.hp <= 0) knockout();
  }
  function knockout() {
    enemy.ko = true; enemy.seq = null; setPose(enemy, 'hit', 0.1); enemy.dxT = 12;
    tweens.push({ o: enemy, k: 'fall', from: 0, to: 1, dur: 0.6, t: 0, ease: easeIn });
    shake = 12; if (S()) S().play('ko');
    const ko = env && env.hud && env.hud.ko;
    if (ko) { ko.querySelector('small').textContent = `"${excuses[excuseIdx % excuses.length]}" eliminated`; ko.classList.remove('show'); void ko.offsetWidth; ko.classList.add('show'); }
    if (env.hud.name) env.hud.name.style.textDecoration = 'line-through';
    clearTimeout(koTimer);
    koTimer = setTimeout(() => {
      if (!enemy) return;
      excuseIdx++; round++;
      tweens.push({ o: enemy, k: 'fall', from: 1, to: 0, dur: 0.45, t: 0, ease: easeOut });
      enemy.hp = 100; enemy.ko = false; enemy.dxT = 0; setPose(enemy, 'eIdle', 0.4);
      if (env.hud.name) env.hud.name.style.textDecoration = 'none';
      setHud();
    }, 2600);
  }
  function setHud() {
    const h = env && env.hud; if (!h) return;
    if (h.enemy) h.enemy.style.width = enemy.hp + '%';
    if (h.round) h.round.textContent = 'Round ' + round;
    if (h.name) h.name.textContent = excuses[excuseIdx % excuses.length];
  }

  /* ---------- effects (fx canvas) ---------- */
  function addSlash(x, y, size) { slashes.push({ x, y, size, a: rand(-1.2, -0.3), t: 0, life: 0.32 }); }
  function drawSlashes(dt) {
    slashes = slashes.filter(sl => {
      sl.t += dt; const p = sl.t / sl.life; if (p >= 1) return false;
      const r = 70 * sl.size * (0.5 + 0.5 * easeOut(p));
      fctx.save(); fctx.translate(sl.x, sl.y); fctx.rotate(sl.a); fctx.globalAlpha = 1 - p; fctx.lineCap = 'round';
      fctx.shadowColor = 'rgba(255,255,255,0.8)'; fctx.shadowBlur = 18;
      const g = fctx.createLinearGradient(-r, 0, r, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(240,198,90,0)');
      fctx.strokeStyle = g; fctx.lineWidth = 10 * sl.size * (1 - p * 0.7);
      fctx.beginPath(); fctx.arc(0, r * 0.9, r, -Math.PI * 0.85, -Math.PI * 0.15); fctx.stroke();
      fctx.restore(); return true;
    });
  }
  function burst(x, y, n) {
    for (let i = 0; i < n; i++) { const a = rand(0, Math.PI * 2), sp = rand(80, 320); burstLeaves.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 120, rot: rand(0, 6.28), vr: rand(-6, 6), life: rand(0.6, 1.2), t: 0, w: rand(4, 8), h: rand(2, 3.5), c: Math.random() < 0.6 ? '#4d8f3a' : '#a7c957' }); }
    if (burstLeaves.length > 260) burstLeaves.splice(0, burstLeaves.length - 260);
  }
  function drawBurst(dt) {
    burstLeaves = burstLeaves.filter(l => {
      l.t += dt; if (l.t > l.life) return false;
      l.vy += 420 * dt; l.vx *= 1 - 1.4 * dt; l.x += l.vx * dt; l.y += l.vy * dt; l.rot += l.vr * dt;
      const k = 1 - l.t / l.life;
      fctx.save(); fctx.translate(l.x, l.y); fctx.rotate(l.rot); fctx.globalAlpha = k; fctx.fillStyle = l.c;
      fctx.beginPath(); fctx.ellipse(0, 0, l.w, l.h, 0, 0, 6.283); fctx.fill(); fctx.restore();
      return true;
    });
  }

  /* ---------- forest (pre-rendered per hero size) ---------- */
  function buildForest(w, h) {
    const key = Math.round(w) + 'x' + Math.round(h); if (forestKey === key && forest) return;
    forestKey = key;
    const mk = () => { const c = document.createElement('canvas'); c.width = Math.round(w * DPR); c.height = Math.round(h * DPR); const g = c.getContext('2d'); g.setTransform(DPR, 0, 0, DPR, 0, 0); return { c, g }; };
    const sky = mk();
    const grd = sky.g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, '#dfe9b9'); grd.addColorStop(0.45, '#a9c86a'); grd.addColorStop(1, '#5a8a3a');
    sky.g.fillStyle = grd; sky.g.fillRect(0, 0, w, h);
    const sun = sky.g.createRadialGradient(w * 0.22, h * 0.12, 0, w * 0.22, h * 0.12, w * 0.5);
    sun.addColorStop(0, 'rgba(255,246,200,0.9)'); sun.addColorStop(0.4, 'rgba(255,240,180,0.25)'); sun.addColorStop(1, 'rgba(255,240,180,0)');
    sky.g.fillStyle = sun; sky.g.fillRect(0, 0, w, h);
    /* light rays */
    sky.g.save(); sky.g.globalCompositeOperation = 'lighter'; sky.g.translate(w * 0.22, -h * 0.1);
    for (let i = 0; i < 7; i++) { const a = -0.25 + i * 0.16 + rand(-0.03, 0.03); sky.g.save(); sky.g.rotate(a); const rg = sky.g.createLinearGradient(0, 0, 0, h * 1.6); rg.addColorStop(0, 'rgba(255,250,210,0.28)'); rg.addColorStop(1, 'rgba(255,250,210,0)'); sky.g.fillStyle = rg; sky.g.fillRect(-rand(18, 40), 0, rand(40, 90), h * 1.7); sky.g.restore(); }
    sky.g.restore();
    const stalkLayer = (n, minW, maxW, col, alpha, sparseLeft) => {
      const l = mk(); l.g.globalAlpha = alpha;
      for (let i = 0; i < n; i++) {
        const x = rand(-20, w + 20), sw = rand(minW, maxW), lean = rand(-0.06, 0.06);
        if (sparseLeft && x < w * 0.56 && Math.random() < sparseLeft) continue;
        l.g.strokeStyle = col; l.g.lineWidth = sw; l.g.lineCap = 'butt';
        l.g.beginPath(); l.g.moveTo(x, h + 10); l.g.lineTo(x + lean * h, -20); l.g.stroke();
        /* nodes */
        l.g.fillStyle = col;
        for (let y = h - rand(20, 60); y > 0; y -= rand(70, 130)) { const nx = x + lean * (h - y); l.g.fillRect(nx - sw * 0.75, y - 2, sw * 1.5, 4); }
        /* leaves */
        for (let k = 0; k < 4; k++) { const ly = rand(0, h * 0.7), lx = x + lean * (h - ly); l.g.save(); l.g.translate(lx, ly); l.g.rotate(rand(-1.2, 1.2)); l.g.beginPath(); l.g.ellipse(rand(14, 26), 0, rand(16, 30), rand(3, 5), 0, 0, 6.283); l.g.fill(); l.g.restore(); }
      }
      return l.c;
    };
    const back = stalkLayer(Math.round(w / 34), 6, 12, '#7fae4e', 0.5, 0);
    const mid = stalkLayer(Math.round(w / 46), 10, 18, '#3f6f2e', 0.8, 0.55);
    const front = stalkLayer(Math.round(w / 80), 16, 28, '#12200f', 0.95, 0.85);
    /* ground */
    const ground = mk();
    const gg = ground.g.createLinearGradient(0, h * 0.78, 0, h); gg.addColorStop(0, 'rgba(18,32,15,0)'); gg.addColorStop(1, 'rgba(18,32,15,0.95)');
    ground.g.fillStyle = gg; ground.g.fillRect(0, h * 0.78, w, h * 0.22);
    ground.g.fillStyle = '#12200f'; ground.g.beginPath(); ground.g.moveTo(0, h);
    for (let x = 0; x <= w; x += 6) ground.g.lineTo(x, h - 14 - Math.abs(Math.sin(x * 0.21) * 10) - Math.abs(Math.sin(x * 0.053) * 8));
    ground.g.lineTo(w, h); ground.g.closePath(); ground.g.fill();
    forest = { sky: sky.c, back, mid, front, ground: ground.c, w, h };
  }
  function drawForest(r) {
    if (!forest) return;
    const x = r.left, y = r.top;
    ctx.drawImage(forest.sky, x, y, forest.w, forest.h);
    ctx.drawImage(forest.back, x + par.x * 6, y + par.y * 2, forest.w, forest.h);
    ctx.drawImage(forest.mid, x + par.x * 14, y + par.y * 4, forest.w, forest.h);
    ctx.drawImage(forest.ground, x, y, forest.w, forest.h);
    ctx.drawImage(forest.front, x + par.x * 26, y + par.y * 6, forest.w, forest.h);
    /* narrow screens: the copy spans the full width, so wash the upper forest with paper */
    if (W < 900) {
      const wash = ctx.createLinearGradient(0, y, 0, y + forest.h);
      wash.addColorStop(0, 'rgba(242,245,233,0.88)'); wash.addColorStop(0.55, 'rgba(242,245,233,0.72)'); wash.addColorStop(0.72, 'rgba(242,245,233,0.15)'); wash.addColorStop(1, 'rgba(242,245,233,0)');
      ctx.fillStyle = wash; ctx.fillRect(x, y, forest.w, forest.h);
    }
    /* soften edges into the page: bright sky at the top, paper at the bottom */
    const top = ctx.createLinearGradient(0, y, 0, y + 170);
    top.addColorStop(0, 'rgba(242,245,233,0.9)'); top.addColorStop(1, 'rgba(242,245,233,0)');
    ctx.fillStyle = top; ctx.fillRect(x, y, forest.w, 170);
    const fade = ctx.createLinearGradient(0, y + forest.h - 120, 0, y + forest.h);
    fade.addColorStop(0, 'rgba(242,245,233,0)'); fade.addColorStop(1, 'rgba(242,245,233,1)');
    ctx.fillStyle = fade; ctx.fillRect(x, y + forest.h - 120, forest.w, 120);
  }

  /* ---------- ambient leaves ---------- */
  function newLeaf(any) { return { x: rand(-40, W + 40), y: any ? rand(-40, H) : -30, vx: rand(10, 40), vy: rand(18, 46), rot: rand(0, 6.28), vr: rand(-1.5, 1.5), w: rand(5, 10), h: rand(2.5, 4), ph: rand(0, 6.28), c: Math.random() < 0.5 ? 'rgba(77,143,58,0.55)' : 'rgba(167,201,87,0.6)' }; }
  function initLeaves() { const n = mobile ? 14 : 34; leaves = []; for (let i = 0; i < n; i++) leaves.push(newLeaf(true)); }
  function drawLeaves(dt) {
    for (const l of leaves) {
      l.x += (l.vx + Math.sin(T * 0.7 + l.ph) * 18) * dt; l.y += l.vy * dt; l.rot += l.vr * dt;
      if (l.y > H + 30 || l.x > W + 60) Object.assign(l, newLeaf(false));
      ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(l.rot); ctx.fillStyle = l.c; ctx.beginPath(); ctx.ellipse(0, 0, l.w, l.h, 0, 0, 6.283); ctx.fill(); ctx.restore();
    }
  }

  /* ---------- arena ---------- */
  function drawArena(dt) {
    const r = stageRect; if (!r || r.width < 40) return;
    if (r.bottom < -60 || r.top > H + 60) { updateFighter(player, dt); updateFighter(enemy, dt); return; }
    const s = clamp(r.height / 500, 0.6, 1.15);
    const gy = heroRect ? Math.min(heroRect.top + heroRect.height * 0.8, r.bottom - 10) : r.top + r.height * 0.84;
    ctx.save();
    if (shake > 0) ctx.translate(rand(-shake, shake), rand(-shake, shake));
    updateFighter(player, dt); updateFighter(enemy, dt);
    drawFighter(player, r.left + r.width * 0.3, gy, s);
    drawFighter(enemy, r.left + r.width * 0.72, gy, s);
    ctx.restore();
  }

  /* ---------- loop ---------- */
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight; mobile = W < 720;
    for (const c of [bg, fx]) { c.width = Math.round(W * DPR); c.height = Math.round(H * DPR); }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    forest = null; forestKey = '';
  }
  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000) || 0; last = now; T += dt;
    const k = 1 - Math.pow(0.05, dt); par.x += (ptr.nx - par.x) * k; par.y += (ptr.ny - par.y) * k;
    ctx.clearRect(0, 0, W, H); fctx.clearRect(0, 0, W, H);
    heroRect = forestRect();
    if (heroRect && heroRect.bottom > 0 && heroRect.top < H) { buildForest(heroRect.width, heroRect.height); drawForest(heroRect); }
    drawLeaves(dt);
    stageRect = env.stage ? env.stage.getBoundingClientRect() : null;
    tweens = tweens.filter(tw => { tw.t += dt / tw.dur; tw.o[tw.k] = lerp(tw.from, tw.to, tw.ease(Math.min(1, tw.t))); return tw.t < 1; });
    drawArena(dt);
    shake = Math.max(0, shake - dt * 45);
    drawSlashes(dt); drawBurst(dt);
  }
  function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  /* the forest covers the hero down to the stats strip, never the stats themselves */
  function forestRect() {
    if (!env || !env.hero) return null;
    const r = env.hero.getBoundingClientRect();
    let bottom = r.bottom;
    if (env.stats) { const s = env.stats.getBoundingClientRect(); if (s.height > 0) bottom = Math.min(bottom, s.top - 12); }
    return { left: r.left, top: r.top, right: r.right, bottom, width: r.width, height: Math.max(200, bottom - r.top) };
  }
  function drawOnce() {
    ctx.clearRect(0, 0, W, H);
    heroRect = forestRect();
    if (heroRect) { buildForest(heroRect.width, heroRect.height); drawForest(heroRect); }
    stageRect = env.stage ? env.stage.getBoundingClientRect() : null; drawArena(0);
  }

  /* ---------- public ---------- */
  function mount(e) {
    env = e; bg = e.bg; fx = e.fx; reduce = !!e.reduce; excuses = (e.excuses && e.excuses.length) ? e.excuses : excuses;
    ctx = bg.getContext('2d'); fctx = fx.getContext('2d');
    player = makeFighter(1, false); enemy = makeFighter(-1, true); round = 1; excuseIdx = 0; altKind = 0; shake = 0;
    resize(); initLeaves(); setHud();
    onResize = () => { resize(); initLeaves(); if (reduce) drawOnce(); };
    onVis = () => { if (reduce) return; if (document.hidden) stop(); else start(); };
    window.addEventListener('resize', onResize); document.addEventListener('visibilitychange', onVis);
    if (S()) S().ambience('wind');
    if (reduce) { drawOnce(); window.addEventListener('scroll', drawOnce, { passive: true }); } else start();
  }
  function unmount() {
    stop(); clearTimeout(koTimer);
    window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('scroll', drawOnce);
    if (ctx) ctx.clearRect(0, 0, W, H); if (fctx) fctx.clearRect(0, 0, W, H);
    leaves = []; burstLeaves = []; slashes = []; tweens = []; player = enemy = null; env = null; forest = null; forestKey = '';
    contactUnmount();
  }
  function pointer(x, y) { ptr.nx = (x / W - 0.5) * 2; ptr.ny = (y / H - 0.5) * 2; }
  function click(x, y) {
    if (reduce || !running) return false;
    const r = stageRect;
    if (r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) { attack(); if (env.hud && env.hud.hint) env.hud.hint.style.opacity = '0'; return true; }
    burst(x, y, 6);
    return false;
  }
  function contactMount(stageEl, links) {
    contactUnmount();
    const btn = stageEl && stageEl.querySelector('#fightBtn'); if (!btn) return;
    const status = stageEl.querySelector('.vs-status');
    const handler = () => {
      const r = stageEl.getBoundingClientRect(); stageEl.classList.add('fought'); if (S()) S().play('swoosh');
      for (let i = 0; i < 5; i++) setTimeout(() => {
        if (!running) return;
        const x = r.left + rand(r.width * 0.2, r.width * 0.8), y = r.top + rand(r.height * 0.2, r.height * 0.8);
        addSlash(x, y, rand(0.8, 1.3)); burst(x, y, 10); if (S() && i % 2) S().play('hit');
        const cut = document.createElement('i'); cut.className = 'cut'; cut.style.top = rand(15, 85) + '%'; cut.style.transform = `rotate(${rand(-25, 25)}deg)`;
        stageEl.appendChild(cut); setTimeout(() => cut.remove(), 600);
      }, i * 110);
      setTimeout(() => {
        if (status) status.textContent = 'Round one is yours. Send the brief.';
        links.forEach((l, i) => setTimeout(() => { l.classList.remove('slam'); void l.offsetWidth; l.classList.add('slam'); }, i * 110));
      }, 620);
      btn.textContent = 'Again';
    };
    btn.addEventListener('click', handler);
    contactCleanup = () => { btn.removeEventListener('click', handler); stageEl.classList.remove('fought'); links.forEach(l => l.classList.remove('slam')); };
  }
  function contactUnmount() { if (contactCleanup) { contactCleanup(); contactCleanup = null; } }

  return { name: 'builder', mount, unmount, pointer, click, contactMount, contactUnmount };
})();
