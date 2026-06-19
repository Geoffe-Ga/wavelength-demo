// Pure geometry for the live wavelength. One full sine period spans the box;
// the crest (Peaking) sits at 25% and the trough (Bottoming Out) at 75%.

export const VB_W = 1200;
export const VB_H = 760;
export const MID = 380;
export const AMP = 232;

/** Vertical position of the wave at fraction `f` of the period. */
export const yAt = (f: number): number => MID - AMP * Math.sin(2 * Math.PI * f);

/** An SVG polyline path for the wave between two fractions of the period. */
export function buildPath(f0: number, f1: number, steps = 120): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const f = f0 + (f1 - f0) * (i / steps);
    d += `${i === 0 ? "M" : "L"}${(f * VB_W).toFixed(1)} ${yAt(f).toFixed(1)} `;
  }
  return d.trim();
}

/** Direction of travel (degrees) at a point, so arrowheads point forward. */
export function angleAt(f: number): number {
  const dydx = -AMP * Math.cos(2 * Math.PI * f) * ((2 * Math.PI) / VB_W);
  return (Math.atan2(dydx, 1) * 180) / Math.PI;
}
