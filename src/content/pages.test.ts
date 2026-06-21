import { describe, expect, it } from "vitest";
import {
  HOME_HERO,
  ORIGIN,
  REFERENCE_HERO,
  parseHero,
  parseOrigin,
} from "./pages";

const FULL = [
  "## Eyebrow",
  "Reference",
  "## Heading",
  "The Modes,",
  "Orientations & Dosages",
  "## Intro",
  "Two **dosages**: the [medicinal]{.med} and the [toxic]{.tox}.",
  "## Scroll cue",
  "Scroll on",
].join("\n");

describe("parseHero", () => {
  it("reads every hero section, keeping the heading's line break", () => {
    const hero = parseHero(FULL);
    expect(hero.eyebrow).toBe("Reference");
    expect(hero.heading).toBe("The Modes,\nOrientations & Dosages");
    expect(hero.intro).toContain("[medicinal]{.med}");
    expect(hero.scrollCue).toBe("Scroll on");
  });

  it("throws when a required section is missing", () => {
    expect(() => parseHero("## Eyebrow\nx")).toThrow(/"heading" section/);
  });
});

describe("page hero copy", () => {
  it("loads the real home and reference heroes from Markdown", () => {
    for (const hero of [HOME_HERO, REFERENCE_HERO]) {
      expect(hero.eyebrow.length).toBeGreaterThan(0);
      expect(hero.heading.length).toBeGreaterThan(0);
      expect(hero.intro.length).toBeGreaterThan(0);
      expect(hero.scrollCue.length).toBeGreaterThan(0);
    }
  });
});

const ORIGIN_DOC = [
  "## Eyebrow",
  'Why "Archetypal"',
  "## Heading",
  "The pattern beneath",
  "every rhythm.",
  "## Lead",
  "It's the *archetype* — the original pattern.",
  "## Caption",
  "High energy up top, low energy below.",
].join("\n");

describe("parseOrigin", () => {
  it("reads every origin section, keeping the heading's line break", () => {
    const origin = parseOrigin(ORIGIN_DOC);
    expect(origin.eyebrow).toBe('Why "Archetypal"');
    expect(origin.heading).toBe("The pattern beneath\nevery rhythm.");
    expect(origin.lead).toContain("*archetype*");
    expect(origin.caption).toBe("High energy up top, low energy below.");
  });

  it("throws when a required section is missing", () => {
    expect(() => parseOrigin("## Eyebrow\nx")).toThrow(/"heading" section/);
  });
});

describe("origin copy", () => {
  it("loads the real origin explainer from Markdown", () => {
    expect(ORIGIN.eyebrow.length).toBeGreaterThan(0);
    expect(ORIGIN.heading.length).toBeGreaterThan(0);
    expect(ORIGIN.lead.length).toBeGreaterThan(0);
    expect(ORIGIN.caption.length).toBeGreaterThan(0);
  });
});
