/* ==================================================================
   sound.js — synthesized sound design (Web Audio, no audio files).
   Off by default; the nav toggle enables it. Every cue is generated:
   swoosh / hit / ko (builder), thunder + rain (founder),
   hum / beep / repulsor (engineer). Safe under autoplay policies
   because everything starts from a user gesture.
   ================================================================== */
window.SOUND = (function () {
  'use strict';
  let ctx = null, master = null, enabled = false, ambience = null, ambienceName = null;
  const rand = (a, b) => a + Math.random() * (b - a);

  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.0001; master.connect(ctx.destination);
    return ctx;
  }
  function noiseBuffer(seconds) {
    const n = Math.floor(ctx.sampleRate * seconds), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function env(g, t0, a, d, peak) { g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + a); g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d); }

  const CUES = {
    swoosh() {
      const t = ctx.currentTime, src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.5);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
      f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3200, t + 0.16); f.frequency.exponentialRampToValueAtTime(600, t + 0.34);
      const g = ctx.createGain(); env(g, t, 0.05, 0.3, 0.5);
      src.connect(f).connect(g).connect(master); src.start(t); src.stop(t + 0.5);
    },
    hit() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.18);
      env(g, t, 0.005, 0.22, 0.7); o.connect(g).connect(master); o.start(t); o.stop(t + 0.25);
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.2); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
      const g2 = ctx.createGain(); env(g2, t, 0.003, 0.12, 0.35); src.connect(f).connect(g2).connect(master); src.start(t); src.stop(t + 0.2);
    },
    ko() {
      const t = ctx.currentTime;
      [110, 82, 55].forEach((fr, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sawtooth'; o.frequency.value = fr; env(g, t + i * 0.02, 0.01, 0.9, 0.25); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(1800, t); f.frequency.exponentialRampToValueAtTime(120, t + 0.9); o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + 1); });
      CUES.hit();
    },
    thunder() {
      const t = ctx.currentTime, src = ctx.createBufferSource(); src.buffer = noiseBuffer(2.6);
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(220, t); f.frequency.exponentialRampToValueAtTime(60, t + 2.4);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.6, t + 0.08); g.gain.exponentialRampToValueAtTime(0.25, t + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);
      src.connect(f).connect(g).connect(master); src.start(t); src.stop(t + 2.6);
    },
    beep() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(1320, t); o.frequency.setValueAtTime(1760, t + 0.06);
      env(g, t, 0.005, 0.12, 0.18); o.connect(g).connect(master); o.start(t); o.stop(t + 0.15);
    },
    repulsor() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(1400, t + 0.35); o.frequency.exponentialRampToValueAtTime(300, t + 0.6);
      env(g, t, 0.05, 0.55, 0.3); o.connect(g).connect(master); o.start(t); o.stop(t + 0.65);
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.5); const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 2500;
      const g2 = ctx.createGain(); env(g2, t + 0.3, 0.02, 0.25, 0.12); src.connect(f).connect(g2).connect(master); src.start(t + 0.3); src.stop(t + 0.7);
    },
    click() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square'; o.frequency.value = 2200; env(g, t, 0.002, 0.03, 0.08); o.connect(g).connect(master); o.start(t); o.stop(t + 0.05);
    }
  };

  const AMBIENCE = {
    rain() {
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(4); src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.5;
      const g = ctx.createGain(); g.gain.value = 0.0001; src.connect(f).connect(g).connect(master); src.start();
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2);
      return { stop() { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1); setTimeout(() => src.stop(), 1100); } };
    },
    wind() {
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(4); src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 420; f.Q.value = 0.7;
      const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.13; lg.gain.value = 220; lfo.connect(lg).connect(f.frequency); lfo.start();
      const g = ctx.createGain(); g.gain.value = 0.0001; src.connect(f).connect(g).connect(master); src.start();
      g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 2);
      return { stop() { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1); setTimeout(() => { src.stop(); lfo.stop(); }, 1100); } };
    },
    hum() {
      const g = ctx.createGain(); g.gain.value = 0.0001; g.connect(master);
      const oscs = [55, 110, 165].map((fr, i) => { const o = ctx.createOscillator(), og = ctx.createGain(); o.type = i ? 'sine' : 'triangle'; o.frequency.value = fr; og.gain.value = [0.5, 0.25, 0.08][i]; o.connect(og).connect(g); o.start(); return o; });
      const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.4; lg.gain.value = 0.02; lfo.connect(lg).connect(g.gain); lfo.start();
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);
      return { stop() { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1); setTimeout(() => { oscs.forEach(o => o.stop()); lfo.stop(); }, 1100); } };
    }
  };

  function setEnabled(on) {
    enabled = !!on;
    try { localStorage.setItem('bb-sound', enabled ? '1' : '0'); } catch (e) { /* ignore */ }
    if (!enabled) { stopAmbience(); if (master) master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3); return; }
    if (!ensure()) { enabled = false; return; }
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.4);
    if (ambienceName) startAmbience(ambienceName);
  }
  function play(name) { if (!enabled || !ctx || !CUES[name]) return; if (ctx.state === 'suspended') ctx.resume(); try { CUES[name](); } catch (e) { /* ignore */ } }
  function stopAmbience() { if (ambience) { ambience.stop(); ambience = null; } }
  function startAmbience(name) {
    ambienceName = name || null; stopAmbience();
    if (!enabled || !ctx || !name || !AMBIENCE[name]) return;
    ambience = AMBIENCE[name]();
  }
  function saved() { try { return localStorage.getItem('bb-sound') === '1'; } catch (e) { return false; } }
  document.addEventListener('visibilitychange', () => { if (!ctx) return; if (document.hidden) ctx.suspend(); else if (enabled) ctx.resume(); });

  return { setEnabled, play, ambience: startAmbience, isEnabled: () => enabled, saved };
})();
