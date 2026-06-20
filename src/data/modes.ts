// The Archetypal Wavelength — data model.
//
// The structural pieces (phases, quadrants, wave geometry, colors) live here.
// The editable *copy* for each wavelength lives as Markdown in
// `content/wavelengths/` and is loaded at the bottom of this file.

import {
  indexByFirstCell,
  leadText,
  parseFrontmatter,
  parseTable,
} from "../content/markdown";

export const PHASES = [
  "Rising",
  "Peaking",
  "Withdrawal",
  "Diminishing",
  "Bottoming Out",
  "Restoration",
] as const;

export type Phase = (typeof PHASES)[number];

export type PhaseMap = Record<Phase, string>;

// AQAL-style quadrants used in the source sheet.
export type QuadrantId = "I" | "IT" | "WE" | "ITS";

export interface Quadrant {
  id: QuadrantId;
  label: string;
  blurb: string;
  color: string;
}

export const QUADRANTS: Record<QuadrantId, Quadrant> = {
  I: {
    id: "I",
    label: "Individual · Interior",
    blurb: "mind & feeling",
    color: "#8a6aa0",
  },
  IT: {
    id: "IT",
    label: "Individual · Exterior",
    blurb: "body & behavior",
    color: "#3f8e88",
  },
  WE: {
    id: "WE",
    label: "Collective · Interior",
    blurb: "culture & relationship",
    color: "#c0567f",
  },
  ITS: {
    id: "ITS",
    label: "Collective · Exterior",
    blurb: "systems & history",
    color: "#bf942f",
  },
};

export interface Mode {
  /** Original "General Vibe" label from the sheet. */
  mode: string;
  /** Editorial headline for the passing white bar. */
  title: string;
  /** One-line framing shown under the headline. */
  gloss: string;
  /** Attribution, when the sheet named an originator. */
  source?: string;
  quadrant: QuadrantId;
  /** Show on the narrow mobile wave (a curated subset). */
  mobile?: boolean;
  phases: PhaseMap;
}

// The canonical wavelength: the phases naming themselves. Shown on the hero.
export const CANONICAL: PhaseMap = {
  Rising: "Rising",
  Peaking: "Peaking",
  Withdrawal: "Withdrawal",
  Diminishing: "Diminishing",
  "Bottoming Out": "Bottoming Out",
  Restoration: "Restoration",
};

// One-line description of what each phase *is*, used in the hero legend.
export const PHASE_BLURBS: PhaseMap = {
  Rising: "Energy gathers and lifts. The expansion begins.",
  Peaking: "The crest. Fullness, intensity, the top of the arc.",
  Withdrawal: "The turn. What expanded starts to recede.",
  Diminishing: "The long descent. Momentum drains away.",
  "Bottoming Out": "The trough. The lowest, most contracted point.",
  Restoration: "The quiet return. Energy collects for the next rise.",
};

// The wavelength as a *trajectory through time* — not a closed loop. Each phase
// is a node on a sine wave that travels left -> right and carries on toward the
// next peak (a cycle is this same shape with the time axis removed).
//   • vertical position = energy   — a white crest up top, a black trough below
//   • the wave runs warm/yellow while ascending (attractive) and cool/purple
//     while descending (aversive); it flips valence at the peak and the trough
// Nodes are listed in time order. x/y are percentages within the wave box;
// `place` puts each card clear of the wave line, and `band`/`ink` style the
// stacked bands on mobile.
export interface WaveNode {
  phase: Phase;
  x: number;
  y: number;
  place: "above" | "below";
  /** Eyebrow / marker accent (valence). */
  accent: string;
  /** Marker fill — white at the peak, black at the trough. */
  dot: string;
  /** Mobile band background + ink. */
  band: string;
  ink: string;
}

export const WAVE_NODES: WaveNode[] = [
  {
    phase: "Rising",
    x: 8.33,
    y: 35,
    place: "below",
    accent: "#9a7c1e",
    dot: "#f0e3a6",
    band: "#ecdb98",
    ink: "#473c1f",
  },
  {
    phase: "Peaking",
    x: 25,
    y: 20,
    place: "below",
    accent: "#6f6450",
    dot: "#ffffff",
    band: "#fbfaf3",
    ink: "#3a3326",
  },
  {
    phase: "Withdrawal",
    x: 41.67,
    y: 35,
    place: "below",
    accent: "#8c5483",
    dot: "#e3cbe1",
    band: "#ddc4dc",
    ink: "#43374b",
  },
  {
    phase: "Diminishing",
    x: 58.33,
    y: 65,
    place: "above",
    accent: "#7e496d",
    dot: "#9a587f",
    band: "#a06b92",
    ink: "#f8ebf3",
  },
  {
    phase: "Bottoming Out",
    x: 75,
    y: 80,
    place: "above",
    accent: "#5a5560",
    dot: "#1d1922",
    band: "#26222c",
    ink: "#efe6ee",
  },
  {
    phase: "Restoration",
    x: 91.67,
    y: 65,
    place: "above",
    accent: "#8c7022",
    dot: "#d4b452",
    band: "#c9a94e",
    ink: "#352a0c",
  },
];

// Wave stroke colors by valence.
export const WAVE_YELLOW = "#d6b23c";
export const WAVE_PURPLE = "#9a5a8e";

export const FIELD = {
  energyHigh: "High energy — expansive",
  energyLow: "Low energy — contracted",
  ascending: "Ascending — attractive",
  descending: "Descending — aversive",
};

// The curated wavelengths live as editable Markdown in `content/wavelengths/`,
// one file per mode. Filenames are numbered (`01-…`, `02-…`) so the page order
// is simply their sorted order. Edit those files to change the copy; this loader
// turns each document into a `Mode`. See `content/README.md`.
const wavelengthFiles = import.meta.glob("../../content/wavelengths/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Read a required frontmatter field, or fail loudly naming the missing key. */
function field(data: Record<string, string>, key: string): string {
  const value = data[key];
  if (!value) throw new Error(`wavelength is missing required field "${key}"`);
  return value;
}

/**
 * Parse one wavelength Markdown document into a {@link Mode}.
 *
 * @param raw - The Markdown file contents (frontmatter, lead paragraph, table).
 * @returns The mode it describes.
 * @throws {Error} If a required field, the quadrant, or a phase row is missing.
 */
export function toMode(raw: string): Mode {
  const { data, body } = parseFrontmatter(raw);
  const quadrant = field(data, "quadrant") as QuadrantId;
  if (!(quadrant in QUADRANTS)) {
    throw new Error(`wavelength has unknown quadrant "${quadrant}"`);
  }
  const rows = indexByFirstCell(parseTable(body), PHASES);
  const phases = Object.fromEntries(
    PHASES.map((phase) => [phase, rows[phase][0]]),
  ) as PhaseMap;

  const mode: Mode = {
    mode: field(data, "mode"),
    title: field(data, "title"),
    gloss: leadText(body),
    quadrant,
    phases,
  };
  if (data.source) mode.source = data.source;
  if (data.mobile === "true") mode.mobile = true;
  return mode;
}

export const MODES: Mode[] = Object.keys(wavelengthFiles)
  .sort()
  .map((path) => toMode(wavelengthFiles[path]));
