import { describe, expect, it } from "vitest";
import { PHASES } from "./modes";
import { REFERENCE_LAYERS, TOXIC_HEX } from "./reference";

const HEX = /^#[0-9a-f]{6}$/i;

describe("REFERENCE_LAYERS", () => {
  it("has nine layers with ids 1..9 in order", () => {
    expect(REFERENCE_LAYERS).toHaveLength(9);
    expect(REFERENCE_LAYERS.map((l) => l.id)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  it("uses valid hex colors for every layer", () => {
    for (const layer of REFERENCE_LAYERS) {
      expect(layer.colorHex).toMatch(HEX);
      expect(layer.textHex).toMatch(HEX);
    }
  });

  it("carries human-readable copy for every layer", () => {
    for (const layer of REFERENCE_LAYERS) {
      expect(layer.color.length).toBeGreaterThan(0);
      expect(layer.mode.length).toBeGreaterThan(0);
      expect(layer.orientation.length).toBeGreaterThan(0);
      expect(layer.orientationGloss.length).toBeGreaterThan(0);
      expect(layer.description.length).toBeGreaterThan(0);
    }
  });

  it("defines a medicinal and toxic dose for all six phases", () => {
    for (const layer of REFERENCE_LAYERS) {
      expect(Object.keys(layer.phases)).toEqual([...PHASES]);
      for (const phase of PHASES) {
        const dose = layer.phases[phase];
        expect(dose.medicinal.length).toBeGreaterThan(0);
        expect(dose.toxic.length).toBeGreaterThan(0);
      }
    }
  });

  it("exposes a valid toxic accent color", () => {
    expect(TOXIC_HEX).toMatch(HEX);
  });
});
