# Editing the site copy

The words shown for each **wavelength** and each **Reference layer** live in this
folder as Markdown — one file per card. Edit a file, open a pull request, and the
moment it merges the site rebuilds and shows your new copy. No code required.

```
content/
├── wavelengths/   # the scrolling cards on the home page (one file per wavelength)
└── reference/     # the nine layers on the Reference page (one file per layer)
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

## Rules of thumb

- **Keep the table's six phase rows** — `Rising`, `Peaking`, `Withdrawal`,
  `Diminishing`, `Bottoming Out`, `Restoration` — exactly those names, all six.
- **Don't use a `|` inside a table cell** (it separates columns). Everything else —
  punctuation, em dashes, accents — is fine.
- If a build fails after an edit, the error message names the file and the field
  that's off (e.g. a missing phase row or quadrant). Fix that line and re-push.
