// A tiny, dependency-free Markdown reader for the editable copy in `content/`.
//
// It understands just enough Markdown to carry our copy: a YAML-ish frontmatter
// block of `key: value` lines, the lead paragraph beneath it, and a single pipe
// table. Kept pure (strings in, plain data out) so it is unit-tested directly
// and behaves identically in the Vite build and in Vitest.

const FENCE = "---";

export interface Frontmatter {
  /** The `key: value` pairs parsed from the frontmatter block. */
  data: Record<string, string>;
  /** Everything after the closing fence, trimmed. */
  body: string;
}

/** Strip one layer of matching surrounding quotes, if present. */
function unquote(value: string): string {
  const wrapped =
    value.length >= 2 &&
    (value[0] === '"' || value[0] === "'") &&
    value[value.length - 1] === value[0];
  return wrapped ? value.slice(1, -1) : value;
}

/**
 * Split a document's frontmatter block from its body.
 *
 * @param raw - The full Markdown document.
 * @returns The parsed `key: value` data and the remaining body.
 * @throws {Error} If the document does not open and close with a `---` fence.
 */
export function parseFrontmatter(raw: string): Frontmatter {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  if (lines[0]?.trim() !== FENCE) {
    throw new Error("missing frontmatter: expected a leading '---' fence");
  }
  const data: Record<string, string> = {};
  let cursor = 1;
  while (cursor < lines.length && lines[cursor].trim() !== FENCE) {
    const line = lines[cursor];
    const colon = line.indexOf(":");
    if (colon > 0) {
      const key = line.slice(0, colon).trim();
      data[key] = unquote(line.slice(colon + 1).trim());
    }
    cursor += 1;
  }
  if (cursor >= lines.length) {
    throw new Error("missing frontmatter: no closing '---' fence");
  }
  return {
    data,
    body: lines
      .slice(cursor + 1)
      .join("\n")
      .trim(),
  };
}

/** The paragraph(s) before the first table row, collapsed to a single line. */
export function leadText(body: string): string {
  const collected: string[] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|")) break;
    if (trimmed) collected.push(trimmed);
  }
  return collected.join(" ");
}

/** Split a `| a | b |` table line into its trimmed cell values. */
function splitRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

/** True for a `| --- | --- |` separator row (any column count). */
function isSeparator(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{2,}:?$/.test(cell));
}

/**
 * Parse a pipe table into its rows, skipping the `---` separator row. The header
 * row is preserved; callers select the rows they want by their first cell.
 */
export function parseTable(body: string): string[][] {
  const rows: string[][] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) continue;
    const cells = splitRow(trimmed);
    if (!isSeparator(cells)) rows.push(cells);
  }
  return rows;
}

/**
 * Index a table's rows by their first cell, returning the remaining cells for
 * each required key. The header row (and any other unlisted row) is ignored.
 *
 * @param rows - Rows from {@link parseTable}.
 * @param keys - The first-cell values that must each appear exactly once.
 * @returns A map from each key to its row's trailing cells.
 * @throws {Error} If any required key has no matching row.
 */
export function indexByFirstCell(
  rows: string[][],
  keys: readonly string[],
): Record<string, string[]> {
  const found: Record<string, string[]> = {};
  for (const cells of rows) {
    if (keys.includes(cells[0])) found[cells[0]] = cells.slice(1);
  }
  for (const key of keys) {
    if (!found[key]) throw new Error(`table is missing row "${key}"`);
  }
  return found;
}
