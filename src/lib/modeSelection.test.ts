import { describe, expect, it } from "vitest";
import { MODES } from "../data/modes";
import { MOBILE_MODES, selectModes } from "./modeSelection";

describe("MOBILE_MODES", () => {
  it("is the subset of modes flagged for mobile", () => {
    expect(MOBILE_MODES.length).toBeGreaterThan(0);
    expect(MOBILE_MODES.length).toBeLessThan(MODES.length);
    expect(MOBILE_MODES.every((m) => m.mobile)).toBe(true);
    expect(MOBILE_MODES).toEqual(MODES.filter((m) => m.mobile));
  });

  it("includes the curated modes and excludes the wordy ones", () => {
    const names = MOBILE_MODES.map((m) => m.mode);
    expect(names).toContain("Narrative");
    expect(names).toContain("Malthusian Growth");
    expect(names).not.toContain("Krebs Cycle");
  });

  it("keeps the same order as the full catalog", () => {
    const mobileOrder = MOBILE_MODES.map((m) => m.mode);
    const expectedOrder = MODES.filter((m) => m.mobile).map((m) => m.mode);
    expect(mobileOrder).toEqual(expectedOrder);
  });
});

describe("selectModes", () => {
  it("returns the full set on desktop and the mobile subset on mobile", () => {
    expect(selectModes(false)).toBe(MODES);
    expect(selectModes(true)).toBe(MOBILE_MODES);
  });
});
