// Inline formatting for hero copy. The editable page Markdown uses a tiny,
// familiar subset — **bold**, *italic*, and `[text]{.class}` colored spans — and
// this turns a line into a flat list of tokens. Kept pure (string in, tokens
// out) so it is unit-tested in Node; the React mapping lives in RichText.tsx.

export interface InlineToken {
  kind: "text" | "strong" | "em" | "span";
  text: string;
  /** Present only on `span` tokens (the `.class` from `[text]{.class}`). */
  className?: string;
}

// Order matters: try `**bold**` before `*italic*` so the longer fence wins.
const PATTERN = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\{\.([a-z][\w-]*)\}/g;

/**
 * Tokenize a line of copy into plain text and formatted spans.
 *
 * @param input - A single line of hero copy.
 * @returns The tokens in source order; unmatched text becomes `text` tokens.
 */
export function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(input)) !== null) {
    if (match.index > last) {
      tokens.push({ kind: "text", text: input.slice(last, match.index) });
    }
    if (match[1] !== undefined) {
      tokens.push({ kind: "strong", text: match[1] });
    } else if (match[2] !== undefined) {
      tokens.push({ kind: "em", text: match[2] });
    } else {
      tokens.push({ kind: "span", text: match[3], className: match[4] });
    }
    last = PATTERN.lastIndex;
  }
  if (last < input.length) {
    tokens.push({ kind: "text", text: input.slice(last) });
  }
  return tokens;
}
