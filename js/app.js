/* ==================================================================
   app.js — mode manager, rendering, smooth scroll, reveals,
   transitions, sound toggle, nav, filters, contact form.
   Depends on data.js, sound.js and the three engines.
   GSAP + ScrollTrigger (+ ScrollSmoother, SplitText) are optional.
   ================================================================== */
(function () {
  'use strict';
  const D = window.PROFILE, M = D.modes, html = document.documentElement;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const MODES = ['founder', 'builder', 'engineer'];
  const THEMES = { founder: window.FX_FOUNDER, builder: window.FX_BUILDER, engineer: window.FX_ENGINEER };
  const THEME_COLOR = { founder: '#0c1220', builder: '#f2f5e9', engineer: '#f5f1ea' };
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const hasSmoother = hasGsap && typeof window.ScrollSmoother !== 'undefined';
  const hasSplit = hasGsap && typeof window.SplitText !== 'undefined';
  if (hasGsap) { const plugins = [ScrollTrigger]; if (hasSmoother) plugins.push(ScrollSmoother); if (hasSplit) plugins.push(SplitText); gsap.registerPlugin(...plugins); }
  const rand = (a, b) => a + Math.random() * (b - a);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ext = href => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '');
  let mode = null, busy = false, triggers = [], splits = [], storyTrigs = [], smoother = null;

  /* ================= static rendering ================= */
  function renderStatic() {
    const items = D.marquee.concat(D.marquee);
    $('#marqueeTrack').innerHTML = items.map(t => `<span>${esc(t)}</span>`).join('');

    $('#principlesList').innerHTML = D.principles.map(p => `
      <div class="prow" data-reveal><span class="n">${p.n}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></div>`).join('');

    $('#timeline').innerHTML = D.experience.map(x => `
      <div class="tl-item" data-reveal>
        <div class="tl-date">${esc(x.date)}${x.current ? '<span class="now">Now</span>' : ''}</div>
        <div><h3 class="tl-role">${esc(x.role)}</h3><p class="tl-org">${esc(x.org)}</p>
          <ul>${x.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
      </div>`).join('');

    $('#filters').innerHTML = D.repoFilters.map(([k, l], i) => `<button class="fbtn${i === 0 ? ' active' : ''}" data-f="${k}" type="button">${esc(l)}</button>`).join('');
    $('#repoGrid').innerHTML = D.repos.map(r => `
      <article class="card repo" data-cats="${r.cat.join(' ')}" data-reveal>
        <div class="repo-top"><span class="repo-name">${esc(r.n)}</span><span class="repo-badge">${esc(r.badge)}</span></div>
        <p>${esc(r.desc)}</p>
        <div class="repo-tags">${r.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="repo-foot">
          <span class="lang"><i style="background:${D.langColors[r.lang] || '#888'}"></i>${esc(r.lang)}</span>
          <span class="repo-links"><a href="${r.link}"${ext(r.link)}>${/github\.com/.test(r.link) ? 'GitHub' : 'Open'} ↗</a>${r.link2 ? `<a href="${r.link2}"${ext(r.link2)}>${/github\.com/.test(r.link2) ? 'Code' : 'Site'} ↗</a>` : ''}</span>
        </div>
      </article>`).join('');

    $('#countries').innerHTML = D.world.countries.map(([code, n]) => `<span class="country" data-reveal><img class="flag" src="https://flagcdn.com/32x24/${code}.png" srcset="https://flagcdn.com/64x48/${code}.png 2x" width="22" height="16" alt="" loading="lazy">${esc(n)}</span>`).join('');
    $('#worldFacts').innerHTML = D.world.facts.map(f => `<div class="wfact" data-reveal><div class="wfact-v">${esc(f.v)}</div><div class="wfact-l">${esc(f.l)}</div></div>`).join('');

    $('#eduGrid').innerHTML = D.education.map(e => `
      <article class="card edu" data-reveal><h3>${esc(e.title)}</h3><p class="org">${esc(e.org)}</p>${e.desc ? `<p class="desc">${esc(e.desc)}</p>` : ''}<span class="when">${esc(e.status)}</span></article>`).join('');
    $('#recGrid').innerHTML = D.recognition.map(r => `
      <article class="card rec" data-reveal><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p>${r.link ? `<a class="arrow-link" href="${r.link}"${ext(r.link)}>${esc(r.linkText)}</a>` : ''}</article>`).join('');

    $('#contactLinks').innerHTML = D.contactLinks.map(([k, v, h]) => `<a class="clink" href="${h}"${ext(h)} data-reveal><span class="clink-k">${esc(k)}</span><span class="clink-v">${esc(v)}</span></a>`).join('');

    $('#quoteText').innerHTML = `“${esc(D.quote.text).replace('appears', '<em>appears</em>')}”`;
    $('#quoteBy').textContent = D.quote.by;
    $('#year').textContent = new Date().getFullYear();
  }

  /* ================= per-mode content ================= */
  function applyCopy() {
    const C = M[mode];
    $$('[data-copy]').forEach(el => { const v = C[el.dataset.copy]; if (v == null) return; el.textContent = v; });
    $('#heroTitle').innerHTML = C.title.map(l => `<span>${esc(l)}</span>`).join('');
    const c1 = $('#cta1'), c2 = $('#cta2');
    c1.textContent = C.cta1.t; c1.setAttribute('href', C.cta1.h);
    c2.textContent = C.cta2.t; c2.setAttribute('href', C.cta2.h);
    $('#fmsg').placeholder = C.formPlaceholder;
    document.title = `Bhuvan Boddu · ${C.label}`;
    $('#stats').innerHTML = C.stats.map(s => `
      <div class="stat" data-reveal><div class="stat-v" data-count="${s.v}" data-dec="${s.dec || 0}" data-pre="${esc(s.pre || '')}" data-suf="${esc(s.suf || '')}">${esc((s.pre || '') + '0' + (s.suf || ''))}</div><div class="stat-l">${esc(s.l)}</div></div>`).join('');
    $('#casesGrid').innerHTML = C.cases.map(k => {
      const c = D.cases[k]; if (!c) return '';
      const l1 = c.link ? `<a class="arrow-link" href="${c.link}"${ext(c.link)}>${esc(c.linkText)}</a>` : `<span class="arrow-link muted">${esc(c.linkText)}</span>`;
      const l2 = c.link2 ? `<a class="arrow-link" href="${c.link2}"${ext(c.link2)}>${esc(c.link2Text)}</a>` : '';
      return `<article class="card case" data-reveal>
        <div class="case-kind"><span>${esc(c.kind)}</span></div>
        <h3>${esc(c.title)}</h3>
        <p class="case-what">${esc(c.what)}</p>
        <div class="case-row"><b>My role</b><span>${esc(c.role)}</span></div>
        <div class="case-row"><b>What I owned</b><span>${esc(c.owned)}</span></div>
        <div class="case-row"><b>Outcome</b><span>${esc(c.outcome)}</span></div>
        <div class="case-foot"><span class="status tone-${c.tone}">${esc(c.status)}</span><span class="case-links">${l1}${l2}</span></div>
      </article>`;
    }).join('');
    $('#storySteps').innerHTML = C.story.map(s => `<div class="step"><span class="k">${esc(s.k)}</span><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div>`).join('');
    $('#storyProgress').innerHTML = C.story.map(() => '<i></i>').join('');
    $('#viewsGrid').innerHTML = C.views.map(v => `<article class="card view" data-reveal><h3>${esc(v.h)}</h3><p>${esc(v.p)}</p></article>`).join('');
    const pn = $('#problemName'); if (pn) pn.textContent = 'Your problem';
  }

  /* ================= reveals ================= */
  const RECIPES = {
    founder: { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' } },
    builder: { from: { y: 34, opacity: 0, rotate: 0.6, transformOrigin: 'left bottom' }, to: { y: 0, opacity: 1, rotate: 0, duration: 1.05, ease: 'power3.out' } },
    engineer: { from: { x: -26, opacity: 0 }, to: { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' } }
  };
  function onRevealStart(el) {
    const heads = el.matches('.h2') ? [el] : $$('.h2', el);
    heads.forEach(h => setTimeout(() => h.classList.add('in'), 200));
    $$('[data-count]', el).forEach(countUp);
    if (el.matches('[data-count]')) countUp(el);
  }
  function teardownReveals() {
    triggers.forEach(t => t.kill()); triggers = [];
    splits.forEach(s => { try { s.revert(); } catch (e) { /* ignore */ } }); splits = [];
  }
  function setupReveals() {
    teardownReveals();
    const els = $$('[data-reveal]');
    $$('.h2').forEach(h => h.classList.remove('in'));
    if (!hasGsap || reduce) { els.forEach(el => { el.style.cssText = ''; onRevealStart(el); }); return; }
    gsap.set(els, { clearProps: 'all' });
    const R = RECIPES[mode];
    els.forEach(el => {
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal')) : [el];
      const delay = Math.min(Math.max(0, sibs.indexOf(el)), 6) * 0.08;
      const heads = el.matches('.h1, .h2') ? [el] : $$('.h1, .h2', el);
      let anim;
      if (hasSplit && heads.length) {
        anim = gsap.timeline({ paused: true, delay, onStart: () => onRevealStart(el) });
        heads.forEach(h => {
          try {
            const sp = SplitText.create(h, { type: 'lines', mask: 'lines', linesClass: 'sline' }); splits.push(sp);
            anim.from(sp.lines, { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.09 }, 0);
          } catch (e) { anim.from(h, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, 0); }
        });
        const others = Array.from(el.children).filter(c => !heads.includes(c));
        if (others.length) anim.from(others, { y: 22, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, 0.15);
      } else {
        anim = gsap.fromTo(el, R.from, Object.assign({}, R.to, { paused: true, delay, onStart: () => onRevealStart(el) }));
      }
      triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => anim.play() }));
    });
  }
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    if (reduce || !hasGsap) { el.textContent = pre + to.toFixed(dec) + suf; return; }
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = pre + o.v.toFixed(dec) + suf; } });
  }

  /* ================= story pin ================= */
  function setupStory() {
    storyTrigs.forEach(t => t.kill()); storyTrigs = [];
    const steps = $$('.step'), bars = $$('#storyProgress i'), list = $('#storySteps');
    list.classList.remove('has-active'); steps.forEach(s => s.classList.remove('is-active'));
    if (!hasGsap || reduce) { bars.forEach(b => b.classList.add('on')); return; }
    if (window.innerWidth >= 900) storyTrigs.push(ScrollTrigger.create({ trigger: '#storyGrid', start: 'top 110px', end: 'bottom bottom', pin: '#storyLeft', pinSpacing: false }));
    steps.forEach((st, i) => storyTrigs.push(ScrollTrigger.create({
      trigger: st, start: 'top 62%', end: 'bottom 38%',
      onToggle: s => { if (s.isActive) { list.classList.add('has-active'); steps.forEach(x => x.classList.toggle('is-active', x === st)); bars.forEach((b, j) => b.classList.toggle('on', j <= i)); } }
    })));
  }

  /* ================= transitions ================= */
  const TR = {
    founder(swap) {
      return new Promise(res => {
        const I = $('.trans-iris'), Bt = $('.trans-bat'), Hh = $('.trans-hole');
        gsap.set(I, { visibility: 'visible', clipPath: 'circle(0% at 50% 50%)' }); gsap.set(Bt, { scale: 0.2, rotation: -540, opacity: 0 });
        gsap.timeline({ onComplete: () => { gsap.set([I, Hh], { visibility: 'hidden' }); gsap.set(Hh, { width: 0, height: 0 }); res(); } })
          .to(I, { clipPath: 'circle(75% at 50% 50%)', duration: 0.6, ease: 'power2.in' })
          .to(Bt, { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '<0.15')
          .add(swap, '+=0.1')
          .to(Bt, { scale: 1.6, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.25')
          .set(Hh, { visibility: 'visible', width: 0, height: 0 }).set(I, { visibility: 'hidden' })
          .to(Hh, { width: '320vmax', height: '320vmax', duration: 0.9, ease: 'power2.inOut' });
      });
    },
    builder(swap) {
      return new Promise(res => {
        const A = $('.trans-ink-2'), B = $('.trans-ink');
        const start = 'polygon(-10% 0%, -10% 0%, -20% 100%, -20% 100%)', cover = 'polygon(-10% 0%, 110% 0%, 100% 100%, -20% 100%)', exit = 'polygon(110% 0%, 110% 0%, 100% 100%, 100% 100%)';
        gsap.set([A, B], { visibility: 'visible', clipPath: start });
        gsap.timeline({ onComplete: () => { gsap.set([A, B], { visibility: 'hidden' }); res(); } })
          .to(A, { clipPath: cover, duration: 0.55, ease: 'power3.inOut' })
          .to(B, { clipPath: cover, duration: 0.55, ease: 'power3.inOut' }, 0.14)
          .add(swap, '+=0.05')
          .to(A, { clipPath: exit, duration: 0.6, ease: 'power3.inOut' }, '+=0.15')
          .to(B, { clipPath: exit, duration: 0.6, ease: 'power3.inOut' }, '<0.14');
      });
    },
    engineer(swap) {
      return new Promise(res => {
        const G = $('.trans-hud'), ring = $('.trans-hud-ring'), label = $('.trans-hud-label');
        gsap.set(G, { visibility: 'visible', opacity: 0 }); gsap.set(ring, { scale: 0.5, rotation: -90, opacity: 0 }); gsap.set(label, { opacity: 0 });
        gsap.timeline({ onComplete: () => { gsap.set(G, { visibility: 'hidden' }); res(); } })
          .to(G, { opacity: 1, duration: 0.3, ease: 'power2.out' })
          .to(ring, { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'power4.out' }, '<0.05')
          .to(label, { opacity: 1, duration: 0.2 }, '<0.3')
          .add(swap, '+=0.05')
          .to(ring, { scale: 1.15, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.3')
          .to(G, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '<0.1');
      });
    }
  };

  /* ================= mode switching ================= */
  async function switchMode(next, opts) {
    opts = opts || {};
    if (next === 'ai') next = 'engineer';
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
    teardownReveals();
    mode = next; html.dataset.mode = next;
    try { localStorage.setItem('bb-mode', next); } catch (e) { /* ignore */ }
    const tc = $('meta[name="theme-color"]'); if (tc) tc.setAttribute('content', THEME_COLOR[next]);
    updateToggle(); applyCopy();
    const T = THEMES[next];
    if (T) {
      T.mount({ bg: $('#bg'), fx: $('#fx'), stage: next === 'engineer' ? $('#reactor') : $('#arena'), hero: $('#top'), stats: $('#stats'), excuses: D.excuses,
        hud: { enemy: $('#hpEnemy'), round: $('#hudRound'), ko: $('#ko'), hint: next === 'engineer' ? $('#reactorHint') : $('#arenaHint'), name: $('#excuseName') },
        hudVals: $$('#reactor [data-base]'), reduce });
      if (T.contactMount) T.contactMount($('#stage'), $$('.clink'), D);
    }
    const finish = () => { if (mode !== next) return; setupReveals(); setupStory(); if (hasGsap) requestAnimationFrame(() => ScrollTrigger.refresh()); };
    if (hasGsap && !reduce && document.fonts && document.fonts.status === 'loading') {
      gsap.set($$('[data-reveal]'), { opacity: 0 });
      Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 900))]).then(finish, finish);
    } else finish();
  }
  function updateToggle() {
    $('.mode-pill').style.setProperty('--i', MODES.indexOf(mode));
    $$('#modeToggle button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  }

  /* ================= pointer / click ================= */
  const spot = $('#spot'); const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2, rx: window.innerWidth / 2, ry: window.innerHeight / 2 };
  function spotLoop() { requestAnimationFrame(spotLoop); if (mode !== 'founder' || !spot) return; cur.rx += (cur.x - cur.rx) * 0.12; cur.ry += (cur.y - cur.ry) * 0.12; spot.style.transform = `translate(${cur.rx}px, ${cur.ry}px)`; }
  document.addEventListener('pointermove', e => {
    cur.x = e.clientX; cur.y = e.clientY;
    if (mode && THEMES[mode] && THEMES[mode].pointer) THEMES[mode].pointer(e.clientX, e.clientY);
    if (fine && !reduce && hasGsap) {
      const b = e.target.closest ? e.target.closest('.btn') : null;
      if (b) { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - (r.left + r.width / 2)) * 0.16, y: (e.clientY - (r.top + r.height / 2)) * 0.22, duration: 0.5, ease: 'power3.out', overwrite: 'auto' }); }
    }
  }, { passive: true });
  document.addEventListener('pointerout', e => {
    const b = e.target.closest ? e.target.closest('.btn') : null;
    if (b && hasGsap && !(e.relatedTarget && b.contains(e.relatedTarget))) gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
  });
  window.addEventListener('scroll', () => { if (mode && THEMES[mode] && THEMES[mode].scroll) THEMES[mode].scroll(window.scrollY); }, { passive: true });
  document.addEventListener('click', e => {
    if (!mode || e.target.closest('#trans')) return;
    const T = THEMES[mode];
    if (T && T.click) T.click(e.clientX, e.clientY, e);
    const btn = e.target.closest('.btn'); if (btn) buttonFx(btn, e);
  });
  function retrigger(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function buttonFx(btn, e) {
    const r = btn.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (mode === 'builder') retrigger(btn, 'struck');
    else if (mode === 'founder') { retrigger(btn, 'lit'); ripple(btn, x, y); }
    else { retrigger(btn, 'pulse'); ripple(btn, x, y); }
    if (window.SOUND) window.SOUND.play('click');
  }
  function ripple(btn, x, y) {
    if (reduce || !hasGsap) return;
    const el = document.createElement('span'); el.className = 'ripple';
    el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = el.style.height = '12px';
    btn.appendChild(el);
    gsap.to(el, { width: 300, height: 300, opacity: 0, duration: 0.75, ease: 'power2.out', onComplete: () => el.remove() });
  }

  /* ================= smooth scroll & nav ================= */
  function scrollToTarget(sel) {
    const el = $(sel); if (!el) return;
    if (smoother) smoother.scrollTo(el, true, 'top 72px');
    else { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); }
  }
  function initSmooth() {
    if (hasSmoother && !reduce && fine && window.innerWidth >= 900) {
      try { smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.1, effects: true, smoothTouch: 0, normalizeScroll: false }); } catch (e) { smoother = null; }
    }
    if (!smoother) html.classList.add('native-scroll');
    document.addEventListener('click', e => {
      const a = e.target.closest ? e.target.closest('a[href^="#"]') : null; if (!a) return;
      const href = a.getAttribute('href'); if (href.length < 2) return;
      e.preventDefault(); scrollToTarget(href); $('#nav').classList.remove('open');
    });
  }
  function initNav() {
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    $('#burger').addEventListener('click', () => nav.classList.toggle('open'));
    $('#modeToggle').addEventListener('click', e => { const b = e.target.closest('button[data-mode]'); if (b) switchMode(b.dataset.mode); });
    if (hasGsap) $$('main section[id]').forEach(sec => ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: s => { if (s.isActive) $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id)); }
    }));
    document.addEventListener('keydown', e => {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === '1') switchMode('founder'); else if (e.key === '2') switchMode('builder'); else if (e.key === '3') switchMode('engineer');
    });
  }
  function initSound() {
    const btn = $('#soundToggle'), label = $('.sound-label');
    const set = on => { btn.setAttribute('aria-pressed', String(on)); if (label) label.textContent = on ? 'Sound on' : 'Sound off'; };
    set(false);
    btn.addEventListener('click', () => { if (!window.SOUND) return; const on = !window.SOUND.isEnabled(); window.SOUND.setEnabled(on); set(on); if (on) window.SOUND.play('click'); });
  }

  /* ================= filters / form ================= */
  function initFilters() {
    $('#filters').addEventListener('click', e => {
      const b = e.target.closest('.fbtn'); if (!b) return;
      $$('.fbtn').forEach(x => x.classList.toggle('active', x === b));
      const f = b.dataset.f, cards = $$('.repo');
      cards.forEach(c => c.classList.toggle('hide', !(f === 'all' || c.dataset.cats.split(' ').includes(f))));
      const shown = cards.filter(c => !c.classList.contains('hide'));
      if (hasGsap && !reduce) gsap.fromTo(shown, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: 'power2.out', overwrite: true });
      if (hasGsap) ScrollTrigger.refresh();
    });
  }
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2800); }
  function initForm() {
    const msg = $('#fmsg'), pn = $('#problemName');
    msg.addEventListener('input', () => { if (!pn) return; const v = msg.value.trim(); pn.textContent = v ? (v.length > 34 ? v.slice(0, 34) + '…' : v) : 'Your problem'; });
    $('#cform').addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#fname').value.trim(), from = $('#femail').value.trim(), body = msg.value.trim();
      const subject = encodeURIComponent(`${name || 'Hello'} → Bhuvan (${M[mode].label})`);
      const text = encodeURIComponent(`${body}\n\n— ${name}${from ? ' (' + from + ')' : ''}`);
      toast({ founder: 'Signal sent. Opening your mail app.', builder: 'Problem received. Opening your mail app.', engineer: 'Transmitting. Opening your mail app.' }[mode]);
      setTimeout(() => { window.location.href = `mailto:${D.email}?subject=${subject}&body=${text}`; }, 450);
    });
  }

  /* ================= boot ================= */
  function init() {
    html.classList.remove('no-js');
    renderStatic(); initSmooth(); initNav(); initSound(); initFilters(); initForm(); spotLoop();
    let saved = null;
    try { saved = new URLSearchParams(window.location.search).get('mode') || localStorage.getItem('bb-mode'); } catch (e) { /* ignore */ }
    if (saved === 'ai') saved = 'engineer';
    const initial = MODES.includes(saved) ? saved : 'founder';
    const go = () => switchMode(initial, { instant: true });
    if (document.fonts && document.fonts.load) {
      const faces = ['400 1em Inter', '600 1em Inter', '400 1em "Bebas Neue"', 'italic 600 1em Fraunces', '600 1em Fraunces', '700 1em "Space Grotesk"', '400 1em "JetBrains Mono"'];
      Promise.race([Promise.all(faces.map(f => document.fonts.load(f).catch(() => null))), new Promise(r => setTimeout(r, 2600))]).then(go, go);
    } else go();
    let rt = 0; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (hasGsap) { setupStory(); ScrollTrigger.refresh(); } }, 200); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
