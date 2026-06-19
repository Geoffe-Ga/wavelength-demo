# The Archetypal Wavelength — promo page

A scroll-driven React page promoting the [Archetypal Wavelength](https://aptitude.guru/philosophy/archetypal-wavelength)
philosophy and the [WavelengthWatch](https://github.com/Geoffe-Ga/WavelengthWatch)
app and course.

## The idea

One wave — six phases of expansion and contraction — runs underneath an
astonishing range of human and natural rhythms. This page makes that visceral:

- A single **wavelength field stays fixed in the center** of the screen: a 3×2
  grid of six colored cells, one per phase.
- As you **scroll**, clean white header bars sweep past, each naming a different
  _mode_ of the wave (the Addiction Wavelength, the Enshittification Wavelength,
  the Wavelength of the Seasons, …).
- Once a header passes and the field is exposed again, that mode's **phase copy
  fades into the cells** — _Rising_ where rising goes, _Bottoming Out_ at the
  trough, and so on — replacing the generic phase names with the concrete
  language of that mode.

The six phases circulate clockwise through the grid:

**Rising → Peaking → Withdrawal → Diminishing → Bottoming Out → Restoration**

### The grid is meaningful

Cell color is not decoration — it encodes two axes from the source graphic:

- **Lightness = energy.** Light cells (top row) are high-energy / expansive;
  dark cells (bottom row) are low-energy / contracted.
- **Hue = valence.** Yellow is attractive; purple is aversive.

So "Bliss" lands in a bright yellow cell, "Depression" in the darkest purple
one, and every mode inherits that same emotional cartography.

## Data

Every mode and every phase string comes from the "Expanded List" sheet of
_The Archetypal Wavelength_ spreadsheet, filtered to the rows marked **Y** in the
`Include in wavelength-demo?` column (19 modes). The original `mode` label is
used as the section's eyebrow; the per-phase "manifestations" are placed on the
wave. See [`src/data/modes.ts`](src/data/modes.ts) — the `mode` and `phases`
values are quoted verbatim from the sheet; `title` and `gloss` are editorial
framing for the promo.

Modes are colored by their AQAL quadrant from the sheet (`I`, `IT`, `WE`, `ITS`).

## Tech

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- The field is a CSS grid of six cells ([`src/components/WaveGrid.tsx`](src/components/WaveGrid.tsx));
  copy lives _inside_ the cells, so it can never overlap a neighbor — the cells
  reflow, they don't stack. Flow arrows sit in the gutters.
- Scroll progress drives a single cross-fading text layer; no animation library.
- On phones the grid restacks into one full-width band per phase (in wave
  order), keeping even the longest copy fully readable.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
npm run start      # serve dist/ on $PORT (used in production / Railway)
```

## Deploy

See [DEPLOY.md](DEPLOY.md) — the repo is configured for Railway (build + static
serve on `$PORT`).

## Design notes

- The centerpiece **recreates the source graphic as vector**: the colored
  energy/valence grid, the circulating flow arrows, and the axis labels. The
  original reference image is kept in `src/assets/` and the palette is sampled
  from it.
