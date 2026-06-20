import { describe, expect, it } from "vitest";
import { tokenizeInline } from "./inline";

describe("tokenizeInline", () => {
  it("returns a single text token for plain copy", () => {
    expect(tokenizeInline("just words")).toEqual([
      { kind: "text", text: "just words" },
    ]);
  });

  it("parses **bold** into a strong token with surrounding text", () => {
    expect(tokenizeInline("a **Mode** b")).toEqual([
      { kind: "text", text: "a " },
      { kind: "strong", text: "Mode" },
      { kind: "text", text: " b" },
    ]);
  });

  it("parses *italic* into an em token", () => {
    expect(tokenizeInline("*archetype*")).toEqual([
      { kind: "em", text: "archetype" },
    ]);
  });

  it("parses [text]{.class} into a span token carrying the class", () => {
    expect(tokenizeInline("the [toxic]{.tox} dose")).toEqual([
      { kind: "text", text: "the " },
      { kind: "span", text: "toxic", className: "tox" },
      { kind: "text", text: " dose" },
    ]);
  });

  it("prefers the longer bold fence over italic", () => {
    expect(tokenizeInline("**x**")).toEqual([{ kind: "strong", text: "x" }]);
  });

  it("keeps multiple tokens in source order", () => {
    const tokens = tokenizeInline("**a** mid [b]{.med}");
    expect(tokens.map((t) => t.kind)).toEqual(["strong", "text", "span"]);
  });
});
