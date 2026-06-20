// Editable hero copy for the two pages. The words live as Markdown in
// `content/pages/`; the call-to-action button labels stay in the components, by
// design. Each file is a set of `##` sections (see `content/README.md`).

import homeRaw from "../../content/pages/home.md?raw";
import referenceRaw from "../../content/pages/reference.md?raw";
import { parseSections } from "./markdown";

export interface HeroCopy {
  /** Small eyebrow line above the headline. */
  eyebrow: string;
  /** The headline; internal line breaks are preserved. */
  heading: string;
  /** The lede paragraph; supports **bold**, *italic*, and `[x]{.class}`. */
  intro: string;
  /** The "scroll" hint at the bottom of the hero. */
  scrollCue: string;
}

/** Read a required section, or fail loudly naming the missing heading. */
function section(sections: Record<string, string>, key: string): string {
  const value = sections[key];
  if (!value) throw new Error(`page is missing the "${key}" section`);
  return value;
}

/**
 * Parse a page document's hero sections into {@link HeroCopy}.
 *
 * @param raw - The page Markdown file contents.
 * @returns The hero's eyebrow, heading, intro, and scroll cue.
 * @throws {Error} If any required section is missing.
 */
export function parseHero(raw: string): HeroCopy {
  const sections = parseSections(raw);
  return {
    eyebrow: section(sections, "eyebrow"),
    heading: section(sections, "heading"),
    intro: section(sections, "intro"),
    scrollCue: section(sections, "scroll cue"),
  };
}

export const HOME_HERO = parseHero(homeRaw);
export const REFERENCE_HERO = parseHero(referenceRaw);
