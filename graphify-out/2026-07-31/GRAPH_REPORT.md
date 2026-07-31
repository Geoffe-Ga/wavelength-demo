# Graph Report - wavelength-demo  (2026-07-31)

## Corpus Check
- 86 files · ~50,112 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 387 nodes · 479 edges · 64 communities (56 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ec97078`
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
- run_check
- run_fix
- tsconfig.json
- run-check.sh
- format.sh
- lint.sh
- test.sh
- typecheck.sh
- audit-gate.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `scripts` - 13 edges
3. `Claude Code Project Context: wavelength-demo` - 12 edges
4. `compilerOptions` - 11 edges
5. `parseTable()` - 8 edges
6. `Phase` - 8 edges
7. `The Archetypal Wavelength — promo page` - 8 edges
8. `overrides` - 7 edges
9. `pr-status.sh script` - 7 edges
10. `parseFrontmatter()` - 7 edges

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

## Communities (64 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (17): Frontmatter, indexByFirstCell(), isSeparator(), leadText(), parseFrontmatter(), parseTable(), splitRow(), DOC (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (29): eslint, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react, eslint-plugin-react-hooks (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (34): dependencies, react, react-dom, serve, description, engines, node, name (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (22): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowImportingTsExtensions, isolatedModules, jsx (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.19
Nodes (15): MobileAppCta(), RevealPanel, useWaveReveal(), WaveReveal, hexToRgb(), luminance(), mix(), readableInk() (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (25): ARROWS, WaveForm(), WaveFormProps, CANONICAL, FIELD, Mode, MODES, Phase (+17 more)

### Community 6 - "Community 6"
Cohesion: 0.21
Nodes (15): parseSections(), CLOSING, ClosingCopy, HeroCopy, HOME_HERO, ORIGIN, OriginCopy, parseClosing() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (14): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (31): `address-feedback`, `architectural-decisions`, 🏗️ Architecture, Architecture Decision Records (ADRs), Available Skills, `backlog-grooming`, `bug-squashing-methodology`, `ci-debugging` (+23 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (15): Already have a service? Point it at `main`, Deploy from the CLI (optional), Deploying to Railway, Letting Claude deploy for you, One-time deploy (dashboard), Data, Deploy, Design notes (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (12): Architecture Enforcement, Circular Dependencies, Customization, Domain Independence, Installation, Integration, Layer Separation, Purpose (+4 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (8): A Reference layer file, A wavelength file, Editing the site copy, Emphasis in the intro, Rules of thumb, The closing call-to-action, The page heroes, The "Why Archetypal" explainer

### Community 12 - "Community 12"
Cohesion: 0.22
Nodes (8): build, buildCommand, builder, deploy, restartPolicyMaxRetries, restartPolicyType, startCommand, $schema

### Community 13 - "Community 13"
Cohesion: 0.39
Nodes (7): cmd_checks(), cmd_list(), cmd_status(), cmd_view(), cmd_watch(), pr-status.sh script, usage()

### Community 14 - "Community 14"
Cohesion: 0.43
Nodes (5): Lines(), renderToken(), RichText(), InlineToken, tokenizeInline()

### Community 15 - "Community 15"
Cohesion: 0.48
Nodes (3): App(), parseRoute(), Route

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (5): Closing call-to-action, Eyebrow, Footnote, Heading, Lede

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (5): Eyebrow, Heading, Home page hero, Intro, Scroll cue

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (5): Caption, Eyebrow, Heading, Lead, "Why Archetypal" section

### Community 19 - "Community 19"
Cohesion: 0.33
Nodes (5): Eyebrow, Heading, Intro, Reference page hero, Scroll cue

### Community 63 - "audit-gate.mjs"
Cohesion: 0.29
Nodes (5): active, ALLOWLIST, expired, offenders, today

## Knowledge Gaps
- **179 isolated node(s):** `name`, `private`, `version`, `type`, `description` (+174 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _179 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._