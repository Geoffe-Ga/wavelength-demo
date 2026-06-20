import { PHASES, type Phase } from "./modes";
import {
  indexByFirstCell,
  leadText,
  parseFrontmatter,
  parseTable,
} from "../content/markdown";

// The Reference catalog: each developmental layer (a Mode + orientation, with
// its color) and the Medicinal vs Toxic expression of every phase. The editable
// copy lives as Markdown in `content/reference/`; the per-layer colors stay here
// in code so a copy edit can't break the page's theming.

export interface DosagePair {
  medicinal: string;
  toxic: string;
}

export interface ReferenceLayer {
  id: number;
  /** Spiral color name, e.g. "Beige". */
  color: string;
  /** Vivid layer color (wave stroke, swatch, medicinal accent). */
  colorHex: string;
  /** A readable shade of the layer color for body text. */
  textHex: string;
  /** The Mode, e.g. "INHABIT". */
  mode: string;
  /** The orientation, e.g. "Do". */
  orientation: string;
  orientationGloss: string;
  description: string;
  phases: Record<Phase, DosagePair>;
}

/** Toxic expressions are always rendered in red. */
export const TOXIC_HEX = "#cf3a33";

/** Vivid + readable shades per layer id; design data, kept out of the copy. */
const LAYER_COLORS: Record<number, { colorHex: string; textHex: string }> = {
  1: { colorHex: "#c9b27e", textHex: "#8a6f3a" },
  2: { colorHex: "#7a5499", textHex: "#6b4789" },
  3: { colorHex: "#b23b3b", textHex: "#9e2f2f" },
  4: { colorHex: "#3f6bb5", textHex: "#345a9c" },
  5: { colorHex: "#d98a35", textHex: "#b06d20" },
  6: { colorHex: "#4f9a5e", textHex: "#3f7e4c" },
  7: { colorHex: "#cdb43c", textHex: "#8f7a1e" },
  8: { colorHex: "#339792", textHex: "#2a807c" },
  9: { colorHex: "#7d5bc4", textHex: "#6a49b0" },
};

// One editable Markdown file per layer in `content/reference/`, numbered so the
// page order is their sorted order. Edit those files to change the copy; this
// loader pairs each with its `LAYER_COLORS` entry. See `content/README.md`.
const referenceFiles = import.meta.glob("../../content/reference/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Read a required frontmatter field, or fail loudly naming the missing key. */
function field(data: Record<string, string>, key: string): string {
  const value = data[key];
  if (!value) {
    throw new Error(`reference layer is missing required field "${key}"`);
  }
  return value;
}

/**
 * Parse one Reference Markdown document into a {@link ReferenceLayer}, merging
 * its copy with the layer's design colors.
 *
 * @param raw - The Markdown file contents (frontmatter, lead paragraph, table).
 * @returns The layer it describes.
 * @throws {Error} If a required field, the layer id, or a phase row is missing.
 */
export function toLayer(raw: string): ReferenceLayer {
  const { data, body } = parseFrontmatter(raw);
  const id = Number(field(data, "id"));
  const colors = LAYER_COLORS[id];
  if (!colors) throw new Error(`reference layer has unknown id "${data.id}"`);
  const rows = indexByFirstCell(parseTable(body), PHASES);
  const phases = Object.fromEntries(
    PHASES.map((phase) => [
      phase,
      { medicinal: rows[phase][0], toxic: rows[phase][1] },
    ]),
  ) as Record<Phase, DosagePair>;

  return {
    id,
    color: field(data, "color"),
    colorHex: colors.colorHex,
    textHex: colors.textHex,
    mode: field(data, "mode"),
    orientation: field(data, "orientation"),
    orientationGloss: field(data, "orientationGloss"),
    description: leadText(body),
    phases,
  };
}

export const REFERENCE_LAYERS: ReferenceLayer[] = Object.keys(referenceFiles)
  .sort()
  .map((path) => toLayer(referenceFiles[path]));
