import type { Phase } from '../data/modes'

// Shared coordinate system for the wave. The SVG and the HTML label overlay
// both reference these numbers so the copy lands exactly on the curve.
export const VIEW_W = 1000
export const VIEW_H = 520

const MID = 260
const AMP = 150

// One full period of a sine wave: rises to a crest, falls to a trough, returns.
// t in [0, 1] -> point on the curve.
export function wavePoint(t: number): { x: number; y: number } {
  return {
    x: t * VIEW_W,
    y: MID - AMP * Math.sin(2 * Math.PI * t),
  }
}

// The SVG path string, sampled densely enough to read as a smooth curve.
export function wavePath(): string {
  const steps = 240
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const { x, y } = wavePoint(i / steps)
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `
  }
  return d.trim()
}

export type LabelPlacement = 'above' | 'below'
export type LabelAlign = 'left' | 'center' | 'right'

export interface Anchor {
  phase: Phase
  /** Position along the period, 0..1. */
  t: number
  xPct: number
  yPct: number
  place: LabelPlacement
  align: LabelAlign
}

// Six phases spaced evenly around the period and offset to sit on the slopes,
// crest, and trough. Labels float away from the line: top-half phases above,
// bottom-half phases below.
export const ANCHORS: Anchor[] = (
  [
    ['Rising', 0.0833, 'above', 'left'],
    ['Peaking', 0.25, 'above', 'center'],
    ['Withdrawal', 0.4167, 'above', 'center'],
    ['Diminishing', 0.5833, 'below', 'center'],
    ['Bottoming Out', 0.75, 'below', 'center'],
    ['Restoration', 0.9167, 'below', 'right'],
  ] as [Phase, number, LabelPlacement, LabelAlign][]
).map(([phase, t, place, align]) => {
  const { x, y } = wavePoint(t)
  return {
    phase,
    t,
    xPct: (x / VIEW_W) * 100,
    yPct: (y / VIEW_H) * 100,
    place,
    align,
  }
})
