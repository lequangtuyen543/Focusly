/*
 * audio.ts
 * Small helpers to synthesize beep sounds via the Web Audio API.
 */

export async function playBeep(frequency = 440, duration = 200): Promise<void> {
  if (typeof window === 'undefined') return;

  const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext);
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    // gentle attack & decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);

    // stop oscillator after duration
    osc.stop(now + duration / 1000 + 0.02);

    // close context after sound finished
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        try {
          ctx.close().catch(() => {});
        } catch (e) {
          // ignore
        }
        resolve();
      }, duration + 50);
    });
  } catch (e) {
    try {
      ctx.close().catch(() => {});
    } catch (err) {
      // ignore
    }
  }
}

export function playFocusCompleteBeep(): Promise<void> {
  // higher pitch, short
  return playBeep(880, 140);
}

export function playBreakCompleteBeep(): Promise<void> {
  // lower pitch, slightly longer
  return playBeep(440, 220);
}

export default {
  playBeep,
  playFocusCompleteBeep,
  playBreakCompleteBeep,
};
