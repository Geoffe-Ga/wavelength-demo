import { describe, expect, it } from "vitest";
import {
  indexByFirstCell,
  leadText,
  parseFrontmatter,
  parseTable,
} from "./markdown";

const DOC = [
  "---",
  "title: A Wave",
  "mobile: true",
  ":ignored",
  "no-colon-line",
  "---",
  "",
  "The lead paragraph.",
  "spanning two lines.",
  "",
  "| Phase | Value |",
  "| --- | --- |",
  "| Rising | Up |",
  "| Peaking | Top |",
].join("\n");

describe("parseFrontmatter", () => {
  it("reads key/value pairs and returns the body after the fence", () => {
    const { data, body } = parseFrontmatter(DOC);
    expect(data.title).toBe("A Wave");
    expect(data.mobile).toBe("true");
    expect(body.startsWith("The lead paragraph.")).toBe(true);
  });

  it("ignores lines with no key before the colon and lines with no colon", () => {
    const { data } = parseFrontmatter(DOC);
    expect(data[""]).toBeUndefined();
    expect(Object.keys(data)).toEqual(["title", "mobile"]);
  });

  it("strips one layer of matching surrounding quotes", () => {
    const { data } = parseFrontmatter(
      ["---", 'a: "quoted"', "b: 'single'", "c: plain", "---", ""].join("\n"),
    );
    expect(data.a).toBe("quoted");
    expect(data.b).toBe("single");
    expect(data.c).toBe("plain");
  });

  it("handles \\r\\n line endings", () => {
    const { data } = parseFrontmatter("---\r\nk: v\r\n---\r\nbody");
    expect(data.k).toBe("v");
  });

  it("throws when the leading fence is missing", () => {
    expect(() => parseFrontmatter("title: x\n")).toThrow(/leading '---'/);
  });

  it("throws when the closing fence is missing", () => {
    expect(() => parseFrontmatter("---\ntitle: x\nno end")).toThrow(
      /closing '---'/,
    );
  });
});

describe("leadText", () => {
  it("joins the paragraph lines before the first table row", () => {
    const { body } = parseFrontmatter(DOC);
    expect(leadText(body)).toBe("The lead paragraph. spanning two lines.");
  });

  it("returns an empty string when a table starts immediately", () => {
    expect(leadText("| a | b |\n| --- | --- |")).toBe("");
  });
});

describe("parseTable", () => {
  it("returns the header and data rows but drops the separator", () => {
    const { body } = parseFrontmatter(DOC);
    const rows = parseTable(body);
    expect(rows[0]).toEqual(["Phase", "Value"]);
    expect(rows).toContainEqual(["Rising", "Up"]);
    expect(rows).not.toContainEqual(["---", "---"]);
  });

  it("ignores non-table lines", () => {
    expect(parseTable("not a table\n| a | b |")).toEqual([["a", "b"]]);
  });
});

describe("indexByFirstCell", () => {
  it("maps required keys to their trailing cells, ignoring others", () => {
    const rows = [
      ["Phase", "Value"],
      ["Rising", "Up"],
      ["Peaking", "Top"],
    ];
    const found = indexByFirstCell(rows, ["Rising", "Peaking"]);
    expect(found.Rising).toEqual(["Up"]);
    expect(found.Peaking).toEqual(["Top"]);
    expect(found.Phase).toBeUndefined();
  });

  it("throws when a required row is missing", () => {
    expect(() => indexByFirstCell([["Rising", "Up"]], ["Peaking"])).toThrow(
      /missing row "Peaking"/,
    );
  });
});
