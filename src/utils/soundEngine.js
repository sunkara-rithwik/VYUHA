// Vyuha Divine Audio Engine - Procedural Web Audio API Synthesizer
// Provides 100% reliable offline sound without broken asset links or external dependencies

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.soundVolume = 0.7;
    this.musicVolume = 0.5;
    this.droneGain = null;
    this.droneNodes = [];
    this.isDronePlaying = false;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.droneGain) {
      this.droneGain.gain.setValueAtTime(muted ? 0 : this.musicVolume * 0.15, this.ctx ? this.ctx.currentTime : 0);
    }
  }

  setSoundVolume(val) {
    this.soundVolume = Math.max(0, Math.min(1, val));
  }

  setMusicVolume(val) {
    this.musicVolume = Math.max(0, Math.min(1, val));
    if (this.droneGain && !this.isMuted && this.ctx) {
      this.droneGain.gain.setValueAtTime(this.musicVolume * 0.15, this.ctx.currentTime);
    }
  }

  // --- 1. Shankha (Sacred Conch Shell Blast) ---
  playConch() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const dur = 2.4;

    // Resonant brassy bandpass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + 0.6);
    filter.frequency.exponentialRampToValueAtTime(520, now + dur);
    filter.Q.value = 3.5;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.4 * this.soundVolume, now + 0.45);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    // Natural harmonics of conch horn (root around 220Hz - A3)
    const freqs = [220, 440, 660, 880, 1100, 1320];
    const amps = [0.5, 0.4, 0.35, 0.25, 0.15, 0.08];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      // Natural embouchure pitch-up bend
      osc.frequency.setValueAtTime(freq * 0.96, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.5);
      osc.frequency.exponentialRampToValueAtTime(freq, now + dur);

      // Subtle vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 5.2; // 5.2 Hz natural human vibrato
      lfoGain.gain.value = 2.5 * (idx + 1);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + dur);

      oscGain.gain.value = amps[idx];
      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start(now);
      osc.stop(now + dur);
    });
  }

  // --- 2. Temple Bell (Ghanta) ---
  playTempleBell(pitchMultiplier = 1) {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const baseFreq = 587.33 * pitchMultiplier; // D5 temple chime
    const partials = [1, 2.76, 5.4, 8.9, 11.2];
    const decays = [2.8, 1.8, 1.2, 0.6, 0.3];
    const amps = [0.4, 0.25, 0.15, 0.08, 0.04];

    partials.forEach((partial, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * partial, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(amps[i] * this.soundVolume, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + decays[i]);
    });
  }

  // --- 3. Correct Answer: Sacred Pentatonic Chime Cascade ---
  playCorrect() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    // Raga Mohanam / Bhupali ascending notes (Sa, Ri, Ga, Pa, Dha, Sa)
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const noteTime = now + (idx * 0.07);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.25 * this.soundVolume, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.75);
    });
  }

  // --- 4. Incorrect Answer: Dundubhi / War Drum Thud ---
  playIncorrect() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.45);

    gain.gain.setValueAtTime(0.4 * this.soundVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  // --- 5. Krishna's Flute Note (Bansuri) ---
  playBansuriNote(freq = 659.25, duration = 1.2) {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Gentle vibrato
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.value = 5.5;
    vibratoGain.gain.value = 5;
    vibrato.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Warm soft breath envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28 * this.soundVolume, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // --- 6. Krishna's Divine Blessing Motif ---
  playKrishnaBlessing() {
    if (this.isMuted) return;
    const melody = [
      { note: 659.25, time: 0, dur: 0.4 },     // E5
      { note: 783.99, time: 0.35, dur: 0.45 }, // G5
      { note: 880.00, time: 0.75, dur: 0.5 },  // A5
      { note: 987.77, time: 1.15, dur: 0.7 },  // B5
      { note: 1318.5, time: 1.7, dur: 1.2 },   // E6
    ];

    melody.forEach(item => {
      setTimeout(() => {
        this.playBansuriNote(item.note, item.dur);
      }, item.time * 1000);
    });

    this.playTempleBell(1.5);
  }

  // --- 7. Victory Raga Fanfare ---
  playVictory() {
    if (this.isMuted) return;
    this.playConch();
    setTimeout(() => {
      this.playTempleBell(1);
    }, 600);
    setTimeout(() => {
      this.playTempleBell(1.25);
    }, 1100);
    setTimeout(() => {
      this.playTempleBell(1.5);
    }, 1600);
  }

  // --- 8. UI Click / Path Step Sound ---
  playClick() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.12 * this.soundVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // --- 9. Hover Sound (Subtle golden sparkle) ---
  playHover() {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.03 * this.soundVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // --- 10. Ambient Tanpura & Cosmic Drone ---
  startDrone() {
    if (this.isDronePlaying || this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    this.isDronePlaying = true;
    const now = this.ctx.currentTime;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.linearRampToValueAtTime(this.musicVolume * 0.12, now + 3);
    this.droneGain.connect(this.ctx.destination);

    // Fundamental Sa (C#3 ~ 138.59 Hz) and Pa (G#3 ~ 207.65 Hz)
    const droneFreqs = [138.59, 207.65, 277.18, 415.30];

    this.droneNodes = droneFreqs.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      const nodeGain = this.ctx.createGain();

      osc.type = i === 0 ? "sawtooth" : "sine";
      osc.frequency.value = freq;

      // Slight natural detuning for warm acoustic beating
      osc.detune.value = (i - 1.5) * 3;

      nodeGain.gain.value = 0.25 / (i + 1);

      // Lowpass filter to keep it warm and meditative
      const lpf = this.ctx.createBiquadFilter();
      lpf.type = "lowpass";
      lpf.frequency.value = 400 + (i * 150);

      osc.connect(lpf);
      lpf.connect(nodeGain);
      nodeGain.connect(this.droneGain);

      osc.start();
      return osc;
    });
  }

  stopDrone() {
    if (!this.isDronePlaying) return;
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.droneNodes.forEach(node => {
          try { node.stop(); node.disconnect(); } catch (e) {}
        });
        this.droneNodes = [];
        this.isDronePlaying = false;
      }, 1600);
    } else {
      this.isDronePlaying = false;
    }
  }
}

export const soundEngine = new SoundEngine();
