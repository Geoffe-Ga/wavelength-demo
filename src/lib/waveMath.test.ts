import { describe, expect, it } from "vitest";
import { AMP, MID, angleAt, buildPath, yAt } from "./waveMath";

describe("yAt", () => {
  it("sits on the midline at the start of the period", () => {
    expect(yAt(0)).toBeCloseTo(MID);
  });

  it("reaches the crest at a quarter period and the trough at three quarters", () => {
    expect(yAt(0.25)).toBeCloseTo(MID - AMP);
    expect(yAt(0.75)).toBeCloseTo(MID + AMP);
  });
});

describe("buildPath", () => {
  it("starts with a moveto and continues with linetos", () => {
    const d = buildPath(0, 0.5, 4);
    const commands = d.split(" ").filter((t) => /^[ML]/.test(t));
    expect(commands).toHaveLength(5); // steps + 1 points
    expect(d.startsWith("M")).toBe(true);
    expect(commands.slice(1).every((c) => c.startsWith("L"))).toBe(true);
  });

  it("uses the default step count when none is given", () => {
    const d = buildPath(0, 1);
    const points = d.split("L").length; // 120 linetos after the initial M
    expect(points).toBe(121);
  });
});

describe("angleAt", () => {
  it("points upward on the rising flank and downward on the falling flank", () => {
    expect(angleAt(0)).toBeLessThan(0);
    expect(angleAt(0.5)).toBeGreaterThan(0);
  });
});
