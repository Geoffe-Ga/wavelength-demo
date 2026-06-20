import { describe, expect, it } from "vitest";
import { parseRoute } from "./route";

describe("parseRoute", () => {
  it("maps the reference hash (any form) to the reference route", () => {
    expect(parseRoute("#reference")).toBe("reference");
    expect(parseRoute("#/reference")).toBe("reference");
    expect(parseRoute("#REFERENCE")).toBe("reference");
  });

  it("maps everything else to home", () => {
    expect(parseRoute("")).toBe("home");
    expect(parseRoute("#")).toBe("home");
    expect(parseRoute("#anything")).toBe("home");
  });
});
