import { describe, expect, it } from "vitest";
import { MODES } from "../data/modes";
import {
  MOBILE_MAX_PHASE_LEN,
  MOBILE_MODES,
  fitsMobile,
  selectModes,
} from "./modeSelection";

describe("fitsMobile", () => {
  it("accepts a mode whose phases are all short", () => {
    const mode = MODES.find((m) => m.mode === "Season")!;
    expect(fitsMobile(mode)).toBe(true);
  });

  it("rejects a mode with long, wordy phase copy", () => {
    const mode = MODES.find((m) => m.mode === "External Validation Loop")!;
    expect(fitsMobile(mode)).toBe(false);
  });

  it("respects a custom maximum length", () => {
    const mode = MODES.find((m) => m.mode === "Season")!;
    expect(fitsMobile(mode, 3)).toBe(false);
  });
});

describe("MOBILE_MODES", () => {
  it("is a non-empty subset whose phases all fit the limit", () => {
    expect(MOBILE_MODES.length).toBeGreaterThan(0);
    expect(MOBILE_MODES.length).toBeLessThan(MODES.length);
    for (const mode of MOBILE_MODES) {
      for (const phrase of Object.values(mode.phases)) {
        expect(phrase.length).toBeLessThanOrEqual(MOBILE_MAX_PHASE_LEN);
      }
    }
  });
});

describe("selectModes", () => {
  it("returns the full set on desktop and the mobile subset on mobile", () => {
    expect(selectModes(false)).toBe(MODES);
    expect(selectModes(true)).toBe(MOBILE_MODES);
  });
});
