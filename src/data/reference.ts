import { type Phase } from "./modes";

// The Reference catalog: each developmental layer (a Mode + orientation, with
// its color) and the Medicinal vs Toxic expression of every phase. Sourced from
// the WavelengthWatch database (layer + curriculum tables); self-care strategies
// are intentionally omitted.

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

export const REFERENCE_LAYERS: ReferenceLayer[] = [
  {
    id: 1,
    color: "Beige",
    colorHex: "#c9b27e",
    textHex: "#8a6f3a",
    mode: "INHABIT",
    orientation: "Do",
    orientationGloss: "the divine masculine — agency, action, building",
    description:
      "Build a life intentionally when energy runs high — through agency and “yes-and-ness.”",
    phases: {
      Rising: { medicinal: "Commitment", toxic: "Overcommitment" },
      Peaking: { medicinal: "Diligence", toxic: "Thriving" },
      Withdrawal: { medicinal: "Steadiness", toxic: "Burnout" },
      Diminishing: { medicinal: "Security", toxic: "Grasping" },
      "Bottoming Out": { medicinal: "Planning", toxic: "Overwhelm" },
      Restoration: { medicinal: "Next Habit", toxic: "New Plan" },
    },
  },
  {
    id: 2,
    color: "Purple",
    colorHex: "#7a5499",
    textHex: "#6b4789",
    mode: "INHABIT",
    orientation: "Feel",
    orientationGloss: "the divine feminine — receptivity, feeling, allowing",
    description:
      "Receive abundance when energy runs low — through receptivity and “yes-and-ness.”",
    phases: {
      Rising: { medicinal: "Inspiration", toxic: "Grandiosity" },
      Peaking: { medicinal: "Joy", toxic: "Ecstasy" },
      Withdrawal: { medicinal: "Introspectivity", toxic: "Anxiety" },
      Diminishing: { medicinal: "Tranquility", toxic: "Self-Doubt" },
      "Bottoming Out": { medicinal: "Convalescence", toxic: "Self-Loathing" },
      Restoration: { medicinal: "Recuperation", toxic: "Selfishness" },
    },
  },
  {
    id: 3,
    color: "Red",
    colorHex: "#b23b3b",
    textHex: "#9e2f2f",
    mode: "EXPRESS",
    orientation: "Do",
    orientationGloss: "the divine masculine — agency, action, building",
    description:
      "Break free from shame and insecurity into authentic confidence — the work of self-love.",
    phases: {
      Rising: { medicinal: "Leading", toxic: "Dominating" },
      Peaking: { medicinal: "Power-With", toxic: "Power-Over" },
      Withdrawal: { medicinal: "Stepping Back", toxic: "Crumbling" },
      Diminishing: { medicinal: "Self-Acceptance", toxic: "Shame" },
      "Bottoming Out": { medicinal: "Following", toxic: "Subjugation" },
      Restoration: { medicinal: "Assembling", toxic: "Revenge" },
    },
  },
  {
    id: 4,
    color: "Blue",
    colorHex: "#3f6bb5",
    textHex: "#345a9c",
    mode: "EXPRESS",
    orientation: "Feel",
    orientationGloss: "the divine feminine — receptivity, feeling, allowing",
    description:
      "Move from isolation to embodied belonging — the work of community love.",
    phases: {
      Rising: { medicinal: "Ambition", toxic: "Voraciousness" },
      Peaking: { medicinal: "Attunement", toxic: "Leprosy" },
      Withdrawal: { medicinal: "Discernment", toxic: "Self-Medication" },
      Diminishing: { medicinal: "Conviction", toxic: "Rage" },
      "Bottoming Out": { medicinal: "Surrender", toxic: "Misery" },
      Restoration: { medicinal: "Catharsis", toxic: "Self-Repression" },
    },
  },
  {
    id: 5,
    color: "Orange",
    colorHex: "#d98a35",
    textHex: "#b06d20",
    mode: "COLLABORATE",
    orientation: "Do",
    orientationGloss: "the divine masculine — agency, action, building",
    description:
      "Harness rationality and the drive to achieve — clear, intellectual understanding.",
    phases: {
      Rising: { medicinal: "Hypothesize", toxic: "Assert" },
      Peaking: { medicinal: "Experiment", toxic: "Crusade" },
      Withdrawal: { medicinal: "Collect Data", toxic: "Overlook Details" },
      Diminishing: { medicinal: "Analyze", toxic: "Force it" },
      "Bottoming Out": { medicinal: "Synthesize", toxic: "Fail" },
      Restoration: { medicinal: "Question", toxic: "Presume" },
    },
  },
  {
    id: 6,
    color: "Green",
    colorHex: "#4f9a5e",
    textHex: "#3f7e4c",
    mode: "COLLABORATE",
    orientation: "Feel",
    orientationGloss: "the divine feminine — receptivity, feeling, allowing",
    description:
      "Center the repressed edges and integrate the disowned — embodied understanding.",
    phases: {
      Rising: { medicinal: "Connection", toxic: "Oversharing" },
      Peaking: { medicinal: "Belonging", toxic: "Megalomania" },
      Withdrawal: { medicinal: "Retirement", toxic: "Social Anxiety" },
      Diminishing: { medicinal: "Unwinding", toxic: "Alienation" },
      "Bottoming Out": { medicinal: "Repose", toxic: "Isolation" },
      Restoration: { medicinal: "Vulnerability", toxic: "Bitterness" },
    },
  },
  {
    id: 7,
    color: "Yellow",
    colorHex: "#cdb43c",
    textHex: "#8f7a1e",
    mode: "INTEGRATE",
    orientation: "Do",
    orientationGloss: "the divine masculine — agency, action, building",
    description:
      "Amalgamate every prior stage into one unique system — systems wisdom.",
    phases: {
      Rising: { medicinal: "Rebellion", toxic: "Mischief" },
      Peaking: { medicinal: "Anarchy", toxic: "Chaos" },
      Withdrawal: { medicinal: "Organize", toxic: "Discord" },
      Diminishing: { medicinal: "Establish", toxic: "Confusion" },
      "Bottoming Out": { medicinal: "Order", toxic: "Bureaucracy" },
      Restoration: { medicinal: "Disintegrate", toxic: "The Aftermath" },
    },
  },
  {
    id: 8,
    color: "Teal",
    colorHex: "#339792",
    textHex: "#2a807c",
    mode: "INTEGRATE",
    orientation: "Feel",
    orientationGloss: "the divine feminine — receptivity, feeling, allowing",
    description:
      "Tap flow states and higher intuition to unlock free will — transcendent wisdom.",
    phases: {
      Rising: { medicinal: "Epiphany", toxic: "Delusion" },
      Peaking: { medicinal: "Gnosis", toxic: "Psychosis" },
      Withdrawal: { medicinal: "Receptivity", toxic: "Paranoia" },
      Diminishing: { medicinal: "Absorption", toxic: "Horror" },
      "Bottoming Out": { medicinal: "Metabolism", toxic: "Despair" },
      Restoration: { medicinal: "Pattern-Seeking", toxic: "Belief Salience" },
    },
  },
  {
    id: 9,
    color: "Ultraviolet",
    colorHex: "#7d5bc4",
    textHex: "#6a49b0",
    mode: "ABSORB",
    orientation: "Do/Feel",
    orientationGloss: "both at once — doing and feeling as one",
    description: "Yoke yourself to the greater currents of Source — unity.",
    phases: {
      Rising: { medicinal: "Unification of Mind", toxic: "Worldly Desire" },
      Peaking: { medicinal: "Jhana", toxic: "Bliss Addiction" },
      Withdrawal: {
        medicinal: "Metta and Meditative Joy",
        toxic: "Agitation Due to Worry or Remorse",
      },
      Diminishing: { medicinal: "Sustained Attention", toxic: "Doubt" },
      "Bottoming Out": { medicinal: "Pleasure", toxic: "Aversion" },
      Restoration: {
        medicinal: "Directed Attention",
        toxic: "Laziness or Lethargy",
      },
    },
  },
];
