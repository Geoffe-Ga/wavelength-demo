import { describe, expect, it } from "vitest";
import {
  hexToRgb,
  luminance,
  mix,
  readableInk,
  rgbToHex,
  shade,
} from "./color";

describe("hexToRgb", () => {
  it("parses each channel of a six-digit hex", () => {
    expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
    expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
    expect(hexToRgb("#c9b27e")).toEqual([201, 178, 126]);
  });

  it("tolerates a missing leading hash", () => {
    expect(hexToRgb("3f6bb5")).toEqual([63, 107, 181]);
  });
});

describe("rgbToHex", () => {
  it("round-trips with hexToRgb", () => {
    expect(rgbToHex(...hexToRgb("#7a5499"))).toBe("#7a5499");
  });

  it("pads single-digit channels and clamps out-of-range values", () => {
    expect(rgbToHex(1, 2, 3)).toBe("#010203");
    expect(rgbToHex(-10, 300, 255.6)).toBe("#00ffff");
  });
});

describe("luminance", () => {
  it("ranks white brighter than mid brighter than black", () => {
    expect(luminance("#ffffff")).toBeCloseTo(1);
    expect(luminance("#000000")).toBeCloseTo(0);
    expect(luminance("#808080")).toBeGreaterThan(luminance("#000000"));
    expect(luminance("#808080")).toBeLessThan(luminance("#ffffff"));
  });
});

describe("readableInk", () => {
  it("uses dark ink on light backgrounds and light ink on dark ones", () => {
    expect(readableInk("#c9b27e")).toBe("#241f2b"); // Beige -> dark
    expect(readableInk("#7a5499")).toBe("#fbf7ec"); // Purple -> light
    expect(readableInk("#b23b3b")).toBe("#fbf7ec"); // Red -> light
  });

  it("honors custom ink colors", () => {
    expect(readableInk("#ffffff", "#111111", "#eeeeee")).toBe("#111111");
    expect(readableInk("#000000", "#111111", "#eeeeee")).toBe("#eeeeee");
  });
});

describe("mix", () => {
  it("returns the endpoints at t=0 and t=1", () => {
    expect(mix("#000000", "#ffffff", 0)).toBe("#000000");
    expect(mix("#000000", "#ffffff", 1)).toBe("#ffffff");
  });

  it("returns the midpoint at t=0.5", () => {
    expect(mix("#000000", "#ffffff", 0.5)).toBe("#808080");
  });
});

describe("shade", () => {
  it("darkens toward black as the amount grows", () => {
    expect(shade("#ffffff", 0)).toBe("#ffffff");
    expect(shade("#ffffff", 1)).toBe("#000000");
    expect(shade("#c9b27e", 0.5)).toBe("#65593f");
  });
});
