# The Archetypal Wavelength — promo page

A scroll-driven React page promoting the [Archetypal Wavelength](https://aptitude.guru/philosophy/archetypal-wavelength)
philosophy and the [WavelengthWatch](https://github.com/Geoffe-Ga/WavelengthWatch)
app and course.

## The idea

One wave — six phases of expansion and contraction — runs underneath an
astonishing range of human and natural rhythms. This page makes that visceral:

- A single **wavelength stays fixed in the center** of the screen: a sine wave
  traveling through time, with the six phases riding it.
- As you **scroll**, clean white header bars sweep past, each naming a different
  _mode_ of the wave (the Addiction Wavelength, the Enshittification Wavelength,
  the Wavelength of the Seasons, …).
- Once a header passes and the wave is exposed again, that mode's **phase copy
  fades onto the wave** — _Rising_ on the upslope, _Bottoming Out_ at the trough,
  and so on — replacing the generic phase names with the concrete language of
  that mode.

The six phases run in time order along the wave, then carry on to the next peak:

**Rising → Peaking → Withdrawal → Diminishing → Bottoming Out → Restoration → …**

### The wave is meaningful

It's a wavelength (a trajectory through time), not a cycle (the same shape with
time removed and the arrows looping back). The color and geometry encode the
source graphic's two axes:

- **Vertical position = energy.** A white crest at the top (high / expansive),
  a black trough at the bottom (low / contracted).
- **Direction = valence.** The wave runs warm **yellow while ascending**
  (attractive) and cool **purple while descending** (aversive), flipping at the
  peak and the trough.

So "Bliss" sits at the white peak, "Depression" at the black trough, and every
mode inherits that same emotional cartography.

### Why the copy never overlaps

Each phase owns a horizontal **time-slot** (one sixth of the width). Cards are
confined to their slot, so they can ride the wave at any height without ever
colliding with a neighbor — regardless of how long the copy runs. On phones the
wave unrolls into a vertical stack of one full-width band per phase.

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
- The wave is an SVG sine ([`src/components/WaveForm.tsx`](src/components/WaveForm.tsx)) —
  valence-colored stroke, energy gradient, forward arrows, faded tails. Phase
  copy lives in HTML cards pinned to per-phase time-slots, so it can never
  overlap a neighbor regardless of length.
- Scroll progress drives a single cross-fading text layer; no animation library.
- On phones the wave unrolls into one full-width band per phase (in wave order),
  keeping even the longest copy fully readable.

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

- The centerpiece **recreates the source graphic as vector**: the energy field
  (white crest → black trough), the valence-colored wave, the forward arrows,
  and the axis labels. The original reference images are kept in `src/assets/`
  and the palette is sampled from them.
