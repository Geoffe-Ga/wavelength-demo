import { describe, expect, it } from "vitest";
import { clamp01, computeWaveState } from "./scroll";

describe("clamp01", () => {
  it("clamps below zero, above one, and passes through the middle", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
    expect(clamp01(0.5)).toBe(0.5);
  });
});

describe("computeWaveState", () => {
  it("shows the canonical hero at the top of the page", () => {
    const state = computeWaveState(0, 1000, [5000]);
    expect(state).toEqual({ canonical: true, index: 0, opacity: 1 });
  });

  it("is canonical with no reveal zones present", () => {
    const state = computeWaveState(0, 1000, []);
    expect(state.canonical).toBe(true);
    expect(state.opacity).toBe(1);
  });

  it("fully shows a mode whose reveal zone is centered, once scrolled in", () => {
    // viewport center = 500; scrolled far enough that the hero has faded out.
    const state = computeWaveState(2000, 1000, [500]);
    expect(state).toEqual({ canonical: false, index: 0, opacity: 1 });
  });

  it("picks the nearest reveal zone to the viewport center", () => {
    const state = computeWaveState(2000, 1000, [1000, 500]);
    expect(state.canonical).toBe(false);
    expect(state.index).toBe(1);
    expect(state.opacity).toBe(1);
  });

  it("partially fades a mode whose reveal zone is off-center", () => {
    // center 500, fade window 450; offset 200 -> opacity ~0.556
    const state = computeWaveState(5000, 1000, [700]);
    expect(state.canonical).toBe(false);
    expect(state.opacity).toBeCloseTo(1 - 200 / 450);
  });
});
