import { describe, expect, it } from "vitest";
import {
  CANONICAL,
  FIELD,
  MODES,
  PHASES,
  PHASE_BLURBS,
  QUADRANTS,
  WAVE_NODES,
  WAVE_PURPLE,
  WAVE_YELLOW,
  toMode,
  type Phase,
} from "./modes";

const TABLE = [
  "| Phase | On this wavelength |",
  "| --- | --- |",
  ...PHASES.map((phase) => `| ${phase} | ${phase} value |`),
].join("\n");

const doc = (front: string[]): string =>
  ["---", ...front, "---", "", "The gloss.", "", TABLE].join("\n");

const HEX = /^#[0-9a-fA-F]{3,8}$/;

describe("phases", () => {
  it("defines exactly the six canonical phases", () => {
    expect(PHASES).toHaveLength(6);
    expect(PHASES).toEqual([
      "Rising",
      "Peaking",
      "Withdrawal",
      "Diminishing",
      "Bottoming Out",
      "Restoration",
    ]);
  });

  it("has a canonical label and a blurb for every phase", () => {
    for (const phase of PHASES) {
      expect(CANONICAL[phase]).toBeTruthy();
      expect(PHASE_BLURBS[phase]).toBeTruthy();
    }
  });
});

describe("modes", () => {
  it("includes the curated set of modes", () => {
    expect(MODES.length).toBeGreaterThanOrEqual(18);
  });

  it("gives every mode a title, gloss, a known quadrant, and all six phases", () => {
    for (const mode of MODES) {
      expect(mode.title).toBeTruthy();
      expect(mode.gloss).toBeTruthy();
      expect(QUADRANTS[mode.quadrant]).toBeDefined();
      for (const phase of PHASES) {
        expect(phase in mode.phases).toBe(true);
      }
    }
  });
});

describe("toMode", () => {
  it("parses a complete document into a Mode", () => {
    const mode = toMode(
      doc(["mode: Demo", "title: The Demo Wavelength", "quadrant: I"]),
    );
    expect(mode.mode).toBe("Demo");
    expect(mode.title).toBe("The Demo Wavelength");
    expect(mode.gloss).toBe("The gloss.");
    expect(mode.phases.Rising).toBe("Rising value");
    expect(mode.source).toBeUndefined();
    expect(mode.mobile).toBeUndefined();
  });

  it("carries optional source and mobile flags when present", () => {
    const mode = toMode(
      doc([
        "mode: Demo",
        "title: T",
        "quadrant: WE",
        "source: A Person",
        "mobile: true",
      ]),
    );
    expect(mode.source).toBe("A Person");
    expect(mode.mobile).toBe(true);
  });

  it("throws on a missing required field", () => {
    expect(() => toMode(doc(["mode: Demo", "quadrant: I"]))).toThrow(
      /required field "title"/,
    );
  });

  it("throws on an unknown quadrant", () => {
    expect(() =>
      toMode(doc(["mode: Demo", "title: T", "quadrant: ZZ"])),
    ).toThrow(/unknown quadrant "ZZ"/);
  });
});

describe("quadrants", () => {
  it("defines the four AQAL quadrants with colors", () => {
    expect(Object.keys(QUADRANTS).sort()).toEqual(["I", "IT", "ITS", "WE"]);
    for (const q of Object.values(QUADRANTS)) {
      expect(q.label).toBeTruthy();
      expect(q.color).toMatch(HEX);
    }
  });
});

describe("wave nodes", () => {
  it("has one node per phase, in time order, with valid styling", () => {
    expect(WAVE_NODES).toHaveLength(6);
    const phases = WAVE_NODES.map((n) => n.phase);
    expect(new Set(phases).size).toBe(6);
    for (const phase of phases) {
      expect(PHASES).toContain(phase as Phase);
    }
    for (const node of WAVE_NODES) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x).toBeLessThanOrEqual(100);
      expect(node.dot).toMatch(HEX);
      expect(["above", "below"]).toContain(node.place);
    }
  });
});

describe("field + wave colors", () => {
  it("exposes the energy/valence legend and stroke colors", () => {
    expect(FIELD.energyHigh).toBeTruthy();
    expect(FIELD.energyLow).toBeTruthy();
    expect(FIELD.ascending).toBeTruthy();
    expect(FIELD.descending).toBeTruthy();
    expect(WAVE_YELLOW).toMatch(HEX);
    expect(WAVE_PURPLE).toMatch(HEX);
  });
});
