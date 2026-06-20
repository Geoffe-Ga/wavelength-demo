import { describe, expect, it } from "vitest";
import { PHASES } from "./modes";
import { REFERENCE_LAYERS, TOXIC_HEX, toLayer } from "./reference";

const HEX = /^#[0-9a-f]{6}$/i;

const REF_TABLE = [
  "| Phase | Medicinal | Toxic |",
  "| --- | --- | --- |",
  ...PHASES.map((phase) => `| ${phase} | ${phase} med | ${phase} tox |`),
].join("\n");

const refDoc = (front: string[]): string =>
  ["---", ...front, "---", "", "The description.", "", REF_TABLE].join("\n");

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

describe("toLayer", () => {
  const front = [
    "id: 1",
    "color: Beige",
    "mode: INHABIT",
    "orientation: Do",
    "orientationGloss: agency",
  ];

  it("parses a document and merges in the layer's design colors", () => {
    const layer = toLayer(refDoc(front));
    expect(layer.id).toBe(1);
    expect(layer.colorHex).toMatch(HEX);
    expect(layer.textHex).toMatch(HEX);
    expect(layer.description).toBe("The description.");
    expect(layer.phases.Rising).toEqual({
      medicinal: "Rising med",
      toxic: "Rising tox",
    });
  });

  it("throws on a missing required field", () => {
    const missing = front.filter((line) => !line.startsWith("color:"));
    expect(() => toLayer(refDoc(missing))).toThrow(/required field "color"/);
  });

  it("throws on an id with no matching color", () => {
    const badId = front.map((line) =>
      line.startsWith("id:") ? "id: 99" : line,
    );
    expect(() => toLayer(refDoc(badId))).toThrow(/unknown id "99"/);
  });
});
