# Graph Report - .  (2026-07-17)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 248 nodes · 379 edges · 25 communities (17 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4ff48a05`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `scripts` - 13 edges
3. `compilerOptions` - 11 edges
4. `parseTable()` - 8 edges
5. `Phase` - 8 edges
6. `pr-status.sh script` - 7 edges
7. `parseFrontmatter()` - 7 edges
8. `toLayer()` - 7 edges
9. `WaveForm()` - 6 edges
10. `useWaveReveal()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `WaveFormProps` --references--> `Phase`  [EXTRACTED]
  src/components/WaveForm.tsx → src/data/modes.ts
- `HomePage()` --calls--> `useWaveReveal()`  [EXTRACTED]
  src/pages/HomePage.tsx → src/components/useWaveReveal.tsx
- `ReferenceLayer` --references--> `Phase`  [EXTRACTED]
  src/data/reference.ts → src/data/modes.ts
- `App()` --calls--> `parseRoute()`  [EXTRACTED]
  src/App.tsx → src/lib/route.ts
- `RichText()` --calls--> `tokenizeInline()`  [EXTRACTED]
  src/components/RichText.tsx → src/content/inline.ts

## Import Cycles
- None detected.

## Communities (25 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (32): WaveFormProps, Frontmatter, indexByFirstCell(), isSeparator(), leadText(), parseFrontmatter(), parseTable(), splitRow() (+24 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (29): eslint, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react, eslint-plugin-react-hooks (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (27): dependencies, react, react-dom, serve, description, engines, node, name (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (22): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowImportingTsExtensions, isolatedModules, jsx (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (14): RevealPanel, useWaveReveal(), WaveReveal, hexToRgb(), luminance(), mix(), readableInk(), rgbToHex() (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.19
Nodes (9): App(), MobileAppCta(), Mode, MODES, MOBILE_MODES, selectModes(), parseRoute(), Route (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.21
Nodes (15): parseSections(), CLOSING, ClosingCopy, HeroCopy, HOME_HERO, ORIGIN, OriginCopy, parseClosing() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (14): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (8): build, buildCommand, builder, deploy, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 9 - "Community 9"
Cohesion: 0.39
Nodes (7): cmd_checks(), cmd_list(), cmd_status(), cmd_view(), cmd_watch(), pr-status.sh script, usage()

### Community 10 - "Community 10"
Cohesion: 0.43
Nodes (5): Lines(), renderToken(), RichText(), InlineToken, tokenizeInline()

### Community 11 - "Community 11"
Cohesion: 0.61
Nodes (5): ARROWS, WaveForm(), angleAt(), buildPath(), yAt()

## Knowledge Gaps
- **101 isolated node(s):** `name`, `private`, `version`, `type`, `description` (+96 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._