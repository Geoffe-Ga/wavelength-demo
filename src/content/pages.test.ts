import { describe, expect, it } from "vitest";
import { HOME_HERO, REFERENCE_HERO, parseHero } from "./pages";

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
