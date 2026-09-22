/* ==================================================================
   sound.js — synthesized sound design (Web Audio, no audio files)
   plus a JARVIS-style voice built on the Web Speech API.
   Sound cues are off until the nav toggle enables them. The voice
   greeting plays on entering the engineer world from a user gesture.
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
    thunder() {
      const t = ctx.currentTime, src = ctx.createBufferSource(); src.buffer = noiseBuffer(2.6);
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(220, t); f.frequency.exponentialRampToValueAtTime(60, t + 2.4);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.6, t + 0.08); g.gain.exponentialRampToValueAtTime(0.25, t + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);
      src.connect(f).connect(g).connect(master); src.start(t); src.stop(t + 2.6);
    },
    sign() {
      const t = ctx.currentTime, src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.9);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2.5;
      f.frequency.setValueAtTime(1800, t); f.frequency.linearRampToValueAtTime(3200, t + 0.3); f.frequency.linearRampToValueAtTime(1500, t + 0.8);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.05); g.gain.setValueAtTime(0.18, t + 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      src.connect(f).connect(g).connect(master); src.start(t); src.stop(t + 0.95);
    },
    stamp() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(50, t + 0.16);
      env(g, t, 0.004, 0.2, 0.6); o.connect(g).connect(master); o.start(t); o.stop(t + 0.22);
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(0.15); const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700;
      const g2 = ctx.createGain(); env(g2, t, 0.003, 0.1, 0.3); src.connect(f).connect(g2).connect(master); src.start(t); src.stop(t + 0.15);
    },
    beep() {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(1320, t); o.frequency.setValueAtTime(1760, t + 0.06);
      env(g, t, 0.005, 0.12, 0.18); o.connect(g).connect(master); o.start(t); o.stop(t + 0.15);
    },
    boot() {
      const t = ctx.currentTime;
      [220, 330, 440, 660].forEach((fr, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = fr; env(g, t + i * 0.12, 0.02, 0.5, 0.12); o.connect(g).connect(master); o.start(t + i * 0.12); o.stop(t + i * 0.12 + 0.6); });
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
    city() {
      const g = ctx.createGain(); g.gain.value = 0.0001; g.connect(master);
      const src = ctx.createBufferSource(); src.buffer = noiseBuffer(4); src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 260; f.Q.value = 0.6;
      const ng = ctx.createGain(); ng.gain.value = 0.5; src.connect(f).connect(ng).connect(g); src.start();
      const pads = [110, 164.8, 220, 277.2].map((fr, i) => { const o = ctx.createOscillator(), og = ctx.createGain(); o.type = 'sine'; o.frequency.value = fr; og.gain.value = [0.14, 0.08, 0.07, 0.05][i]; const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.05 + i * 0.02; lg.gain.value = og.gain.value * 0.5; lfo.connect(lg).connect(og.gain); lfo.start(); o.connect(og).connect(g); o.start(); return [o, lfo]; });
      g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 2.5);
      return { stop() { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1); setTimeout(() => { src.stop(); pads.forEach(p => { p[0].stop(); p[1].stop(); }); }, 1100); } };
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

  /* ---------- voice (Web Speech) ---------- */
  let voiceMuted = false;
  function pickVoice() {
    const vs = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    const prefer = ['Google UK English Male', 'Microsoft Ryan', 'Microsoft George', 'Daniel', 'Arthur', 'Microsoft Thomas'];
    for (const p of prefer) { const v = vs.find(x => x.name.indexOf(p) === 0); if (v) return v; }
    return vs.find(v => /en-GB/i.test(v.lang) && /male|ryan|george|daniel|arthur/i.test(v.name)) || vs.find(v => /en-GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  }
  function speak(text) {
    if (voiceMuted || !window.speechSynthesis || !text) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(); if (v) u.voice = v;
      u.rate = 0.96; u.pitch = 0.85; u.volume = 0.9;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }
  function cancelSpeech() { try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
  function setVoiceMuted(m) { voiceMuted = !!m; if (voiceMuted) cancelSpeech(); }
  if (window.speechSynthesis && typeof window.speechSynthesis.getVoices === 'function') { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); }

  return { setEnabled, play, ambience: startAmbience, isEnabled: () => enabled, saved, speak, cancelSpeech, setVoiceMuted };
})();
