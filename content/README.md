# Editing the site copy

The words shown for each **wavelength** and each **Reference layer** live in this
folder as Markdown — one file per card. Edit a file, open a pull request, and the
moment it merges the site rebuilds and shows your new copy. No code required.

```
content/
├── wavelengths/   # the scrolling cards on the home page (one file per wavelength)
├── reference/     # the nine layers on the Reference page (one file per layer)
└── pages/         # the hero (intro) copy at the top of each page
```

You can edit these straight on GitHub: open the file, click the pencil ✏️, make
your change, and choose "Propose changes."

## A wavelength file

Files are numbered (`01-…`, `02-…`); **that number is the order they appear** on
the page. Rename to renumber, and they re-sort automatically.

```markdown
---
mode: Security
title: The Security Wavelength
quadrant: WE
mobile: true
---

A parent's pendulum between being a Secure Base to explore from and a Safe Haven to return to.

| Phase | On this wavelength |
| --- | --- |
| Rising | Support Exploration |
| Peaking | Demonstrate Delight |
| Withdrawal | Help when Needed |
| Diminishing | Welcome a Return |
| Bottoming Out | Provide Comfort |
| Restoration | Organize Feelings |
```

The bit between the `---` lines is **frontmatter** (settings). Everything below it
is the copy:

| Field | What it is |
| --- | --- |
| `mode` | Short internal name for the wavelength. |
| `title` | The big headline on the card. |
| `quadrant` | One of `I`, `IT`, `WE`, `ITS` (sets the accent color — keep it valid). |
| `mobile` | `true` to also show this one on phones; remove the line to hide it there. |
| `source` | Optional — an attribution line ("after …"). Add or remove freely. |
| paragraph | The one-line **gloss** under the headline. |
| table | What each of the six phases says on this wavelength. |

## A Reference layer file

```markdown
---
id: 1
color: Beige
mode: INHABIT
orientation: Do
orientationGloss: the divine masculine — agency, action, building
---

Build a life intentionally when energy runs high — through agency and "yes-and-ness."

| Phase | Medicinal | Toxic |
| --- | --- | --- |
| Rising | Commitment | Overcommitment |
| Peaking | Diligence | Thriving |
| Withdrawal | Steadiness | Burnout |
| Diminishing | Security | Grasping |
| Bottoming Out | Planning | Overwhelm |
| Restoration | Next Habit | New Plan |
```

| Field | What it is |
| --- | --- |
| `id` | 1–9. Pairs the file with its color; don't change it. |
| `color` | The spiral color name shown on the card (e.g. "Beige"). |
| `mode` | The Mode name (e.g. "INHABIT"). |
| `orientation` | "Do", "Feel", or "Do/Feel". |
| `orientationGloss` | The italic line under the heading. |
| paragraph | The layer's **description**. |
| table | The medicinal vs. toxic dose for each of the six phases. |

The hex colors for each layer stay in the code (so a copy edit can't break the
page's look). Ask a developer if you want a color changed.

## The page heroes

The intro block at the top of each page lives in `content/pages/` — `home.md` and
`reference.md`. Each is a set of `##` sections:

```markdown
## Eyebrow
One rhythm, everywhere

## Heading
The Archetypal
Wavelength

## Intro
Expansion and contraction. Rising and bottoming out. …

## Scroll cue
Scroll — the field stays; the meaning changes
```

| Section | What it is |
| --- | --- |
| `Eyebrow` | The small line above the headline. |
| `Heading` | The big headline. **Each line break here becomes a line break on the page** — so the two lines above stack. |
| `Intro` | The paragraph under the headline. |
| `Scroll cue` | The faint "scroll" hint at the bottom. |

The call-to-action **buttons** ("Explore the Course", "Get the App", etc.) are
intentionally **not** here — they stay in the code. Everything else in the hero
is yours to edit.

### Emphasis in the intro

The `Intro` paragraph understands a little formatting:

- `**bold**` → **bold**
- `*italic*` → *italic*
- `[medicinal]{.med}` → the word in the dark "medicinal" color
- `[toxic]{.tox}` → the word in red

For example, the Reference intro uses `[medicinal]{.med}` and `[toxic]{.tox}` so
those two words match the colors used on the wave.

## The "Why Archetypal" explainer

Further down the home page, the block that names the wave and describes its
labeled diagram lives in `content/pages/origin.md`. Like the heroes, it is a set
of `##` sections:

```markdown
## Eyebrow
Why "Archetypal"

## Heading
The pattern beneath every rhythm.

## Lead
It's the *archetype* — the original pattern — for every oscillating, cyclical, …

## Caption
High energy up top, low energy below; attraction in the warm cells, …
```

| Section | What it is |
| --- | --- |
| `Eyebrow` | The small line above the headline. |
| `Heading` | The big headline. **Each line break here becomes a line break on the page.** |
| `Lead` | The paragraph under the headline. |
| `Caption` | The line under the diagram. |

The `Lead` and `Caption` understand the same emphasis as the `Intro` above
(`**bold**`, `*italic*`, `[x]{.med}`, `[x]{.tox}`). The labeled **diagram image**
itself stays in the code — ask a developer to change the picture or its alt text.

## Rules of thumb

- **Keep the table's six phase rows** — `Rising`, `Peaking`, `Withdrawal`,
  `Diminishing`, `Bottoming Out`, `Restoration` — exactly those names, all six.
- **Don't use a `|` inside a table cell** (it separates columns). Everything else —
  punctuation, em dashes, accents — is fine.
- If a build fails after an edit, the error message names the file and the field
  that's off (e.g. a missing phase row or quadrant). Fix that line and re-push.
