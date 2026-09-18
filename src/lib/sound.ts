/**
 * Discreet sound effects (off by default), synthesized via the Web Audio
 * API, no external audio files. A module-level singleton mirrors the
 * original vanilla implementation: the AudioContext is inherently a
 * single browser-wide resource, so there is nothing React-specific to
 * gain from turning this into a hook.
 */

let ctx: AudioContext | null = null;
let soundOn = false;

function getCtx(): AudioContext {
  if (!ctx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    ctx = new AudioContextClass();
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

function noiseBuffer(c: AudioContext, duration: number): AudioBuffer {
  const size = Math.floor(c.sampleRate * duration);
  const buffer = c.createBuffer(1, size, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function tick(): void {
  if (!soundOn) return;
  const c = getCtx();
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.05);
  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 3000;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.22, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start();
}

export function pageTurn(): void {
  if (!soundOn) return;
  const c = getCtx();
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.4);
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.8;
  filter.frequency.setValueAtTime(1800, c.currentTime);
  filter.frequency.exponentialRampToValueAtTime(300, c.currentTime + 0.4);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.001, c.currentTime);
  gain.gain.linearRampToValueAtTime(0.16, c.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start();
}

export function stamp(): void {
  if (!soundOn) return;
  const c = getCtx();
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, c.currentTime + 0.15);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.28, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.2);
}

export function setSoundOn(value: boolean): void {
  soundOn = value;
}

export function isSoundOn(): boolean {
  return soundOn;
}