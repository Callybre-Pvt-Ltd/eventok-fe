/** Organic wave paths — viewBox 0 0 1440 120 */
export const wavePaths = {
  /** Large hero transition — Festivity-style */
  festivity:
    'M0,88 C320,24 640,112 960,56 C1120,24 1280,72 1440,40 L1440,120 L0,120 Z',
  /** Gentle curve between content sections */
  soft: 'M0,72 C360,108 720,36 1080,72 C1260,92 1380,64 1440,72 L1440,120 L0,120 Z',
  /** Subtle ripple */
  ripple:
    'M0,80 C240,48 480,96 720,64 C960,32 1200,88 1440,56 L1440,120 L0,120 Z',
} as const;

export type WaveVariant = keyof typeof wavePaths;
