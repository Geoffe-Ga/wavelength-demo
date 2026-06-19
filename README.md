# The Archetypal Wavelength — promo page

A scroll-driven React page promoting the [Archetypal Wavelength](https://aptitude.guru/philosophy/archetypal-wavelength)
philosophy and the [WavelengthWatch](https://github.com/Geoffe-Ga/WavelengthWatch)
app and course.

## The idea

One wave — six phases of expansion and contraction — runs underneath an
astonishing range of human and natural rhythms. This page makes that visceral:

- A single **wavelength graphic stays fixed in the center** of the screen.
- As you **scroll**, clean white header bars sweep past, each naming a different
  _mode_ of the wave (the Addiction Wavelength, the Enshittification Wavelength,
  the Wavelength of the Seasons, …).
- Once a header passes and the wave is exposed again, that mode's **phase copy
  fades in directly onto the curve** — _Rising_ where rising goes, _Bottoming
  Out_ at the trough, and so on — replacing the generic phase names with the
  concrete language of that mode.

The six phases, in order around the wave:

**Rising → Peaking → Withdrawal → Diminishing → Bottoming Out → Restoration**

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
- The wave is a hand-drawn SVG (one sine period). Phase copy is positioned with
  a shared coordinate system in [`src/components/geometry.ts`](src/components/geometry.ts),
  so the SVG dots and the HTML label cards always line up on the curve.
- Scroll progress drives a cross-fade of the active mode's labels; no animation
  library required.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Design notes

- The wavelength is **redrawn as crisp vector art** (rather than overlaying text
  on a raster) so the phase copy lands pixel-precisely on the curve and stays
  legible at any size. The palette (cream, mauve, gold, slate) is derived from
  the source wavelength image, kept in `src/assets/` for reference.
- The experience is **desktop-first**. On phones the wave is given a taller frame
  so the six labels separate vertically; the most verbose modes are necessarily
  dense on small screens.
