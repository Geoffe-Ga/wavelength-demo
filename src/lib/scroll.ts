// Pure scroll-state computation for the page. Kept free of the DOM so it can be
// unit-tested directly; the component feeds it measured reveal-zone centers.

export interface WaveState {
  /** True when the hero's canonical phase copy should show. */
  canonical: boolean;
  /** Index of the active mode (when not canonical). */
  index: number;
  /** 0..1 opacity for the copy layer. */
  opacity: number;
}

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Decide which copy to show and how strongly, from the scroll position and the
 * viewport-relative center of each mode's reveal zone.
 *
 * - The hero (canonical) fades out over the first ~60% of a viewport of scroll.
 * - Each mode is fully shown when its reveal center hits the viewport center,
 *   fading to zero ~0.45vh either side.
 * - Whichever is stronger wins, so the copy is never doubled.
 */
export function computeWaveState(
  scrollY: number,
  vh: number,
  revealCenters: number[],
): WaveState {
  const center = vh / 2;
  const canonicalOpacity = clamp01(1 - scrollY / (0.6 * vh));

  const fade = 0.45 * vh;
  let best = 0;
  let bestOpacity = 0;
  for (let i = 0; i < revealCenters.length; i++) {
    const op = clamp01(1 - Math.abs(revealCenters[i] - center) / fade);
    if (op > bestOpacity) {
      bestOpacity = op;
      best = i;
    }
  }

  const canonical = canonicalOpacity >= bestOpacity;
  return {
    canonical,
    index: best,
    opacity: canonical ? canonicalOpacity : bestOpacity,
  };
}
