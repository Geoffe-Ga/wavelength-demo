// Editable hero copy for the two pages. The words live as Markdown in
// `content/pages/`; the call-to-action button labels stay in the components, by
// design. Each file is a set of `##` sections (see `content/README.md`).

import homeRaw from "../../content/pages/home.md?raw";
import referenceRaw from "../../content/pages/reference.md?raw";
import originRaw from "../../content/pages/origin.md?raw";
import closingRaw from "../../content/pages/closing.md?raw";
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

export interface OriginCopy {
  /** Small eyebrow line above the headline. */
  eyebrow: string;
  /** The headline; internal line breaks are preserved. */
  heading: string;
  /** The lead paragraph; supports **bold**, *italic*, and `[x]{.class}`. */
  lead: string;
  /** The caption under the diagram; same inline formatting as the lead. */
  caption: string;
}

export interface ClosingCopy {
  /** Small eyebrow line above the headline. */
  eyebrow: string;
  /** The headline; internal line breaks are preserved. */
  heading: string;
  /** The lede paragraph; supports **bold**, *italic*, and `[x]{.class}`. */
  lede: string;
  /** The footnote; `{count}` is replaced with the live mode count. */
  footnote: string;
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

/**
 * Parse the home page's "Why Archetypal" explainer sections into
 * {@link OriginCopy}. The labeled diagram image stays in the component.
 *
 * @param raw - The origin Markdown file contents.
 * @returns The section's eyebrow, heading, lead, and caption.
 * @throws {Error} If any required section is missing.
 */
export function parseOrigin(raw: string): OriginCopy {
  const sections = parseSections(raw);
  return {
    eyebrow: section(sections, "eyebrow"),
    heading: section(sections, "heading"),
    lead: section(sections, "lead"),
    caption: section(sections, "caption"),
  };
}

/**
 * Parse the home page's closing call-to-action sections into
 * {@link ClosingCopy}. The button labels stay in the component.
 *
 * @param raw - The closing Markdown file contents.
 * @returns The section's eyebrow, heading, lede, and footnote.
 * @throws {Error} If any required section is missing.
 */
export function parseClosing(raw: string): ClosingCopy {
  const sections = parseSections(raw);
  return {
    eyebrow: section(sections, "eyebrow"),
    heading: section(sections, "heading"),
    lede: section(sections, "lede"),
    footnote: section(sections, "footnote"),
  };
}

export const HOME_HERO = parseHero(homeRaw);
export const REFERENCE_HERO = parseHero(referenceRaw);
export const ORIGIN = parseOrigin(originRaw);
export const CLOSING = parseClosing(closingRaw);
