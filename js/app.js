/* ==================================================================
   app.js — mode manager, rendering, reveals, transitions, cursor,
   nav, filters, contact form. Depends on data.js and the three FX
   engines; GSAP + ScrollTrigger are optional (graceful fallback).
   ================================================================== */
(function () {
  'use strict';
  const D = window.PROFILE, M = D.modes, html = document.documentElement;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const MODES = ['builder', 'founder', 'ai'];
  const THEMES = { builder: window.FX_BUILDER, founder: window.FX_FOUNDER, ai: window.FX_AI };
  const THEME_COLOR = { builder: '#0a0809', founder: '#06070c', ai: '#050812' };
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  const rand = (a, b) => a + Math.random() * (b - a);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ext = href => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');
  let mode = null, busy = false, triggers = [], heroTyper = null;

  /* ================= static rendering ================= */
  function renderStatic() {
    $('#timeline').innerHTML = D.experience.map(x => `
      <div class="tl-item${x.current ? ' current' : ''}" data-reveal>
        <span class="tl-dot"></span>
        <div class="tl-date">${esc(x.date)}${x.current ? '<span class="tl-now">NOW</span>' : ''}</div>
        <h3 class="tl-role">${esc(x.role)}</h3>
        <p class="tl-org">${esc(x.org)}</p>
        <ul>${x.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>`).join('') + '<div class="tl-track"><i class="tl-line"></i></div>';

    $('#filters').innerHTML = D.repoFilters.map(([k, l], i) => `<button class="fbtn${i === 0 ? ' active' : ''}" data-f="${k}" type="button">${esc(l)}</button>`).join('');
    $('#repoGrid').innerHTML = D.repos.map(r => `
      <article class="card repo" data-cats="${r.cat.join(' ')}" data-reveal>
        <div class="repo-top"><span class="repo-name"><span>${r.emoji}</span>${esc(r.n)}</span><span class="repo-badge">${esc(r.badge)}</span></div>
        <p>${esc(r.desc)}</p>
        <div class="tags">${r.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="repo-foot">
          <span class="lang"><i style="background:${D.langColors[r.lang] || '#888'}"></i>${esc(r.lang)}</span>
          <span class="repo-links"><a href="${r.link}"${ext(r.link)}>${/github\.com/.test(r.link) ? 'GitHub' : 'Visit'} ↗</a>${r.link2 ? `<a href="${r.link2}"${ext(r.link2)}>${/github\.com/.test(r.link2) ? 'Code' : 'Site'} ↗</a>` : ''}</span>
        </div>
      </article>`).join('');

    $('#skillsGrid').innerHTML = D.skills.map(s => `
      <article class="card skill" data-reveal><h3><span>${s.icon}</span>${esc(s.title)}</h3>
        <div class="chips">${s.items.map(i => `<span class="chip">${esc(i)}</span>`).join('')}</div></article>`).join('');

    $('#eduGrid').innerHTML = D.education.map(e => `
      <article class="card edu${e.hot ? ' hot' : ''}" data-reveal><h3>${esc(e.title)}</h3><p class="edu-org">${esc(e.org)}</p>
        ${e.desc ? `<p class="edu-desc">${esc(e.desc)}</p>` : ''}<span class="edu-status">${esc(e.status)}</span></article>`).join('');

    $('#beyondGrid').innerHTML = D.beyond.map(b => `
      <article class="card bcard" data-reveal><span class="b-icon">${b.icon}</span><h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p>
        ${b.link ? `<a class="link-arrow" href="${b.link}"${ext(b.link)}>${esc(b.linkText)} ↗</a>` : ''}</article>`).join('');

    $('#principlesGrid').innerHTML = D.principles.map(p => `
      <article class="card pcard" data-reveal><span class="pcard-n">${p.n} //</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></article>`).join('');

    $('#venturesList').innerHTML = D.ventures.map(v => `
      <div class="card vrow" data-reveal>
        <div class="v-main"><h3>${esc(v.name)}</h3><p class="v-role">${esc(v.role)}</p></div>
        <p class="v-outcome">${esc(v.outcome)}</p>
        <div class="v-side"><span class="v-status tone-${v.tone}">${esc(v.status)}</span>${v.link ? `<a class="link-arrow" href="${v.link}"${ext(v.link)}>${esc(v.linkText)} ↗</a>` : ''}</div>
      </div>`).join('');

    $('#countries').innerHTML = D.world.countries.map(([code, n]) => `<span class="country" data-reveal><img class="flag" src="https://flagcdn.com/32x24/${code}.png" srcset="https://flagcdn.com/64x48/${code}.png 2x" width="24" height="18" alt="" loading="lazy">${esc(n)}</span>`).join('');
    $('#worldFacts').innerHTML = D.world.facts.map(f => `<div class="card wfact" data-reveal><div class="wfact-v">${esc(f.v)}</div><div class="wfact-l">${esc(f.l)}</div></div>`).join('');

    $('#contactLinks').innerHTML = [
      ['Email', D.email, 'mailto:' + D.email],
      ['LinkedIn', 'linkedin.com/in/bhuvanboddu', D.linkedin],
      ['GitHub', 'github.com/bhuvan0808 · 41 repos', D.github],
      ['Phone', D.phone, D.phoneHref],
      ['Products', 'linkyaar.com · goddie.linkyaar.com', D.links.linkyaar]
    ].map(([k, v, h]) => `<a class="clink" href="${h}"${ext(h)} data-reveal><span class="clink-k">${k}</span><span class="clink-v">${esc(v)}</span></a>`).join('');

    $('#quoteText').innerHTML = `“${esc(D.quote.text).replace('appears', '<em>appears</em>')}”`;
    $('#quoteBy').textContent = D.quote.by;
    $('#year').textContent = new Date().getFullYear();
  }

  /* ================= per-mode content ================= */
  function applyCopy() {
    const C = M[mode];
    $$('[data-copy]').forEach(el => { const v = C[el.dataset.copy]; if (v == null) return; el.textContent = v; el.dataset.text = v; });
    $('#heroTitle').innerHTML = C.title.map(l => `<span data-scramble>${esc(l)}</span>`).join('');
    const c1 = $('#cta1'), c2 = $('#cta2');
    c1.textContent = C.cta1.t; c1.setAttribute('href', C.cta1.h);
    c2.textContent = C.cta2.t; c2.setAttribute('href', C.cta2.h);
    $('#fmsg').placeholder = C.formPlaceholder;
    $('#glLabel').textContent = 'SWITCHING // ' + C.label.toUpperCase();
    document.title = `Bhuvan Boddu — ${C.label} mode`;
  }
  function renderStats() {
    $('#stats').innerHTML = M[mode].stats.map(s => `
      <div class="card stat" data-reveal><div class="stat-v" data-count="${s.v}" data-dec="${s.dec || 0}" data-pre="${esc(s.pre || '')}" data-suf="${esc(s.suf || '')}">${esc((s.pre || '') + '0' + (s.suf || ''))}</div><div class="stat-l">${esc(s.l)}</div></div>`).join('');
  }
  function renderFeatured() {
    $('#featuredGrid').innerHTML = M[mode].featured.map(k => {
      const f = D.featured[k]; if (!f) return '';
      const link = f.link ? `<a class="link-arrow" href="${f.link}"${ext(f.link)}>${esc(f.linkText)} ↗</a>` : `<span class="link-arrow disabled">${esc(f.linkText)}</span>`;
      const link2 = f.link2 ? `<a class="link-arrow" href="${f.link2}"${ext(f.link2)}>Code ↗</a>` : '';
      return `<article class="card fcard" data-reveal>
        <div class="fcard-top"><span class="fcard-kind">${esc(f.kind)}</span><span class="fcard-icon">${f.icon}</span></div>
        <h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p>
        <div class="tags">${f.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="fcard-foot"><span class="fcard-metric">${esc(f.metric)}</span><span>${link}${link2 ? ' &nbsp;·&nbsp; ' + link2 : ''}</span></div>
      </article>`;
    }).join('');
  }

  /* ================= reveal recipes ================= */
  const RECIPES = {
    builder: () => ({
      from: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', x: -28, skewX: -8 },
      to: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', x: 0, skewX: 0, duration: 0.8, ease: 'power4.out', clearProps: 'clipPath,skewX' }
    }),
    founder: () => ({
      from: { y: 60, opacity: 0, filter: 'brightness(0.2) blur(8px)' },
      to: { y: 0, opacity: 1, filter: 'brightness(1) blur(0px)', duration: 1.05, ease: 'power3.out', clearProps: 'filter' }
    }),
    ai: () => ({
      from: { opacity: 0, y: 26, scale: 0.97, filter: 'blur(10px)' },
      to: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power2.out', clearProps: 'filter' }
    })
  };
  function onRevealStart(el) {
    const heads = el.matches('.h2') ? [el] : $$('.h2', el);
    heads.forEach(h => setTimeout(() => h.classList.add('in'), 120));
    $$('[data-count]', el).forEach(countUp);
    if (mode === 'ai') {
      const s = el.matches('[data-scramble]') ? [el] : $$('[data-scramble]', el);
      s.forEach(scramble);
      if (el.classList.contains('card') && !reduce) { el.classList.add('glitch-in'); setTimeout(() => el.classList.remove('glitch-in'), 600); }
    }
  }
  function setupReveals() {
    triggers.forEach(t => t.kill()); triggers = [];
    const els = $$('[data-reveal]');
    $$('.h2').forEach(h => h.classList.remove('in'));
    if (!hasGsap || reduce) {
      els.forEach(el => { el.style.opacity = ''; el.style.transform = ''; el.style.clipPath = ''; el.style.filter = ''; onRevealStart(el); });
      return;
    }
    gsap.set(els, { clearProps: 'all' });
    els.forEach(el => {
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal')) : [el];
      const delay = Math.min(Math.max(0, sibs.indexOf(el)), 7) * 0.07;
      const R = RECIPES[mode]();
      const tw = gsap.fromTo(el, R.from, Object.assign({}, R.to, { delay, paused: true, onStart: () => onRevealStart(el) }));
      triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => tw.play() }));
    });
  }
  function countUp(el) {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    if (reduce || !hasGsap) { el.textContent = pre + to.toFixed(dec) + suf; return; }
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = pre + o.v.toFixed(dec) + suf; } });
  }
  function scramble(el, dur) {
    dur = dur || 900;
    const final = el.dataset.text || (el.dataset.text = el.textContent);
    if (!final.trim() || reduce) { el.textContent = final; return; }
    const chars = '01<>/[]{}#%&*+=?ABCDEFXYZ';
    const n = final.length, t0 = performance.now();
    const at = Array.from({ length: n }, (_, i) => dur * (0.15 + 0.85 * (i / n)) * rand(0.6, 1));
    const tick = () => {
      const t = performance.now() - t0; let out = '', done = true;
      for (let i = 0; i < n; i++) { const ch = final[i]; if (ch === ' ' || t >= at[i]) out += ch; else { done = false; out += chars[Math.floor(Math.random() * chars.length)]; } }
      el.textContent = out; if (!done) requestAnimationFrame(tick);
    };
    tick();
  }

  /* ================= transitions ================= */
  const TR = {
    builder(swap) {
      return new Promise(res => {
        const A = $('.trans-half-a'), B = $('.trans-half-b'), S = $('.trans-slash');
        const ang = (Math.atan2(-0.2 * window.innerHeight, window.innerWidth) * 180) / Math.PI;
        gsap.set([A, B, S], { visibility: 'visible' });
        gsap.set(S, { rotation: ang, clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 });
        gsap.set(A, { xPercent: 0, yPercent: -100 }); gsap.set(B, { xPercent: 0, yPercent: 100 });
        gsap.timeline({ onComplete: () => { gsap.set([A, B, S], { visibility: 'hidden' }); res(); } })
          .to(S, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.28, ease: 'power3.in' })
          .to([A, B], { yPercent: 0, duration: 0.32, ease: 'power4.in' }, '-=0.1')
          .add(swap, '+=0.02')
          .to(S, { opacity: 0, duration: 0.3 }, '+=0.18')
          .to(A, { xPercent: -30, yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '<')
          .to(B, { xPercent: 30, yPercent: 100, duration: 0.7, ease: 'power4.inOut' }, '<');
      });
    },
    founder(swap) {
      return new Promise(res => {
        const I = $('.trans-iris'), Bt = $('.trans-bat'), Hh = $('.trans-hole');
        gsap.set(I, { visibility: 'visible', clipPath: 'circle(0% at 50% 50%)' });
        gsap.set(Bt, { scale: 0.2, rotation: -540, opacity: 0 });
        gsap.timeline({ onComplete: () => { gsap.set([I, Hh], { visibility: 'hidden' }); gsap.set(Hh, { width: 0, height: 0 }); res(); } })
          .to(I, { clipPath: 'circle(75% at 50% 50%)', duration: 0.6, ease: 'power2.in' })
          .to(Bt, { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '<0.15')
          .add(swap, '+=0.1')
          .to(Bt, { scale: 1.6, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.25')
          .set(Hh, { visibility: 'visible', width: 0, height: 0 })
          .set(I, { visibility: 'hidden' })
          .to(Hh, { width: '320vmax', height: '320vmax', duration: 0.9, ease: 'power2.inOut' });
      });
    },
    ai(swap) {
      return new Promise(res => {
        const G = $('.trans-glitch'), stripes = $$('.gl-stripe'), L = $('#glLabel');
        gsap.set(G, { visibility: 'visible' }); gsap.set(L, { opacity: 0 });
        gsap.set(stripes, { xPercent: i => (i % 2 ? 102 : -102) });
        gsap.timeline({ onComplete: () => { gsap.set(G, { visibility: 'hidden' }); res(); } })
          .to(stripes, { xPercent: 0, duration: 0.38, ease: 'power3.inOut', stagger: { each: 0.03, from: 'random' } })
          .to(L, { opacity: 1, duration: 0.12 })
          .add(swap, '+=0.05')
          .to(L, { opacity: 0, duration: 0.15 }, '+=0.4')
          .to(stripes, { xPercent: i => (i % 2 ? 102 : -102), duration: 0.42, ease: 'power3.inOut', stagger: { each: 0.03, from: 'random' } });
      });
    }
  };

  /* ================= mode switching ================= */
  async function switchMode(next, opts) {
    opts = opts || {};
    if (!MODES.includes(next) || busy || next === mode) return;
    busy = true;
    const overlay = $('#trans');
    const swap = () => applyMode(next);
    if (reduce || !hasGsap || opts.instant) swap();
    else { overlay.classList.add('active'); try { await TR[next](swap); } catch (e) { swap(); } overlay.classList.remove('active'); }
    busy = false;
  }
  function applyMode(next) {
    const prev = mode;
    if (prev && THEMES[prev]) { if (THEMES[prev].contactUnmount) THEMES[prev].contactUnmount(); THEMES[prev].unmount(); }
    if (heroTyper) { heroTyper.stop(); heroTyper = null; }
    mode = next; html.dataset.mode = next; html.classList.add('has-mode');
    try { localStorage.setItem('bb-mode', next); } catch (e) { /* private mode */ }
    const intro = $('#intro'); if (intro) intro.remove();
    const tc = $('meta[name="theme-color"]'); if (tc) tc.setAttribute('content', THEME_COLOR[next]);
    updateToggle(); applyCopy(); renderStats(); renderFeatured();
    const T = THEMES[next];
    if (T) {
      T.mount({ bg: $('#bg'), fx: $('#fx'), stage: $('#arena'), hud: { enemy: $('#hpEnemy'), round: $('#hudRound'), ko: $('#ko'), hint: $('#arenaHint') }, reduce });
      if (T.contactMount) T.contactMount($('#stage'), $$('.clink'), D);
      if (next === 'ai' && T.heroTerminal) heroTyper = T.heroTerminal($('#heroTermBody'));
    }
    mountCursor(); setupReveals();
    if (hasGsap) requestAnimationFrame(() => ScrollTrigger.refresh());
  }
  function updateToggle() {
    $('.mode-pill').style.setProperty('--i', MODES.indexOf(mode));
    $$('#modeToggle button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  }

  /* ================= cursor + pointer FX ================= */
  const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2, rx: window.innerWidth / 2, ry: window.innerHeight / 2 };
  const curDot = $('#cursor'), curRing = $('#cursorRing'), spot = $('#spot');
  function mountCursor() { html.classList.toggle('fx-cursor', !reduce && fine); }
  function cursorLoop() {
    requestAnimationFrame(cursorLoop);
    cur.rx += (cur.x - cur.rx) * 0.16; cur.ry += (cur.y - cur.ry) * 0.16;
    if (html.classList.contains('fx-cursor')) {
      curDot.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      curRing.style.transform = `translate(${cur.rx}px, ${cur.ry}px)`;
    }
    if (mode === 'founder') spot.style.transform = `translate(${cur.rx}px, ${cur.ry}px)`;
  }
  document.addEventListener('pointermove', e => {
    cur.x = e.clientX; cur.y = e.clientY;
    if (mode && THEMES[mode] && THEMES[mode].pointer) THEMES[mode].pointer(e.clientX, e.clientY);
    const t = e.target && e.target.closest ? e.target.closest('a, button, .card, input, textarea, .country, .chip') : null;
    html.classList.toggle('cursor-hover', !!t);
    const c = e.target && e.target.closest ? e.target.closest('.card, .btn-primary') : null;
    if (c) {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      if (mode === 'ai' && hasGsap && !reduce && c.classList.contains('card')) {
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7, ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        gsap.to(c, { rotationX: rx, rotationY: ry, transformPerspective: 900, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      }
    }
  }, { passive: true });
  document.addEventListener('pointerout', e => {
    const c = e.target && e.target.closest ? e.target.closest('.card') : null;
    if (c && mode === 'ai' && hasGsap && !reduce && !(e.relatedTarget && c.contains(e.relatedTarget))) gsap.to(c, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
  });
  document.addEventListener('click', e => {
    if (!mode || e.target.closest('#intro') || e.target.closest('#trans')) return;
    const T = THEMES[mode];
    if (T && T.click) T.click(e.clientX, e.clientY, e);
    const btn = e.target.closest('.btn'); if (btn) buttonFx(btn, e);
  });
  function retrigger(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function buttonFx(btn, e) {
    const r = btn.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (mode === 'builder') { retrigger(btn, 'struck'); if (hasGsap && !reduce) gsap.fromTo('#main', { x: -4 }, { x: 0, duration: 0.35, ease: 'elastic.out(1, 0.3)' }); }
    else if (mode === 'founder') { retrigger(btn, 'lit'); ripple(btn, x, y); }
    else { retrigger(btn, 'glitched'); ripple(btn, x, y); zaps(btn, x, y); }
  }
  function ripple(btn, x, y) {
    if (reduce || !hasGsap) return;
    const el = document.createElement('span'); el.className = 'ripple';
    el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = el.style.height = '12px';
    btn.appendChild(el);
    gsap.to(el, { width: 300, height: 300, opacity: 0, duration: 0.75, ease: 'power2.out', onComplete: () => el.remove() });
  }
  function zaps(btn, x, y) {
    if (reduce) return;
    for (let i = 0; i < 6; i++) {
      const z = document.createElement('i'); z.className = 'zap';
      z.style.left = x + 'px'; z.style.top = y + 'px'; z.style.setProperty('--r', i * 60 + rand(-22, 22) + 'deg');
      btn.appendChild(z); setTimeout(() => z.remove(), 520);
    }
  }

  /* ================= nav ================= */
  function initNav() {
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    $('#burger').addEventListener('click', () => nav.classList.toggle('open'));
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
    $('#modeToggle').addEventListener('click', e => { const b = e.target.closest('button[data-mode]'); if (b) switchMode(b.dataset.mode); });
    if (hasGsap) $$('main section[id]').forEach(sec => ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: s => { if (s.isActive) $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id)); }
    }));
    document.addEventListener('keydown', e => {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === '1') switchMode('builder'); else if (e.key === '2') switchMode('founder'); else if (e.key === '3') switchMode('ai');
    });
  }

  /* ================= filters / timeline / form / intro ================= */
  function initFilters() {
    $('#filters').addEventListener('click', e => {
      const b = e.target.closest('.fbtn'); if (!b) return;
      $$('.fbtn').forEach(x => x.classList.toggle('active', x === b));
      const f = b.dataset.f, cards = $$('.repo');
      cards.forEach(c => c.classList.toggle('hide', !(f === 'all' || c.dataset.cats.split(' ').includes(f))));
      const shown = cards.filter(c => !c.classList.contains('hide'));
      if (hasGsap && !reduce) gsap.fromTo(shown, { opacity: 0, y: 14, clipPath: 'none' }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out', overwrite: true, clearProps: 'clipPath' });
      if (hasGsap) ScrollTrigger.refresh();
    });
  }
  function initTimeline() {
    if (!hasGsap) { $('.tl-line').style.setProperty('--p', 1); return; }
    ScrollTrigger.create({ trigger: '#timeline', start: 'top 75%', end: 'bottom 70%', scrub: 0.4, onUpdate: s => $('.tl-line').style.setProperty('--p', s.progress.toFixed(3)) });
  }
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2800); }
  function initForm() {
    $('#cform').addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#fname').value.trim(), from = $('#femail').value.trim(), msg = $('#fmsg').value.trim();
      const subject = encodeURIComponent(`[${M[mode].label} mode] ${name || 'Hello'} → Bhuvan`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}${from ? ' (' + from + ')' : ''}`);
      toast({ builder: 'Challenge sent — opening your mail app', founder: 'Signal sent — opening your mail app', ai: 'Prompt dispatched — opening your mail app' }[mode]);
      setTimeout(() => { window.location.href = `mailto:${D.email}?subject=${subject}&body=${body}`; }, 450);
    });
  }
  function initIntro() {
    const intro = $('#intro'); if (!intro) return;
    intro.addEventListener('click', e => {
      const p = e.target.closest('[data-pick]'); if (p) { switchMode(p.dataset.pick); return; }
      if (e.target.closest('#introSkip')) switchMode('founder');
    });
  }

  /* ================= boot ================= */
  function init() {
    html.classList.remove('no-js');
    renderStatic(); initNav(); initFilters(); initTimeline(); initForm(); initIntro(); cursorLoop();
    let saved = null;
    try { saved = new URLSearchParams(window.location.search).get('mode') || localStorage.getItem('bb-mode'); } catch (e) { /* ignore */ }
    if (saved && MODES.includes(saved)) switchMode(saved, { instant: true });
    else html.classList.remove('has-mode');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
