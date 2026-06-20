// Small, dependency-free color math used to theme the Reference page: pick a
// legible ink color for each Mode's colored bar, and darken a color for the
// bar's gradient. Kept pure so it is unit-tested directly.

/** Parse a `#rrggbb` hex string into its red, green, and blue channels (0..255). */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

const toHexChannel = (value: number): string => {
  const clamped = Math.max(0, Math.min(255, Math.round(value)));
  return clamped.toString(16).padStart(2, "0");
};

/** Build a `#rrggbb` string from red, green, and blue channels (0..255). */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`;
}

/** Relative luminance (0..1) per the WCAG formula, used to choose readable ink. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Pick a dark or light ink color that stays legible on the given background.
 * Light backgrounds (e.g. Beige) get dark ink; vivid/dark ones get light ink.
 */
export function readableInk(
  hex: string,
  dark = "#241f2b",
  light = "#fbf7ec",
): string {
  return luminance(hex) > 0.45 ? dark : light;
}

/** Linearly mix two hex colors; `t=0` returns `a`, `t=1` returns `b`. */
export function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const at = (x: number, y: number): number => x + (y - x) * t;
  return rgbToHex(at(ar, br), at(ag, bg), at(ab, bb));
}

/** Darken a color toward black by `amount` (0..1). */
export const shade = (hex: string, amount: number): string =>
  mix(hex, "#000000", amount);
