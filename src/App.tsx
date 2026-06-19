import { useCallback, useEffect, useRef, useState } from 'react'
import { FIELD, MODES, PHASE_BLURBS, QUADRANTS, type Phase } from './data/modes'
import { WaveGrid } from './components/WaveGrid'

const COURSE_URL = 'https://aptitude.guru/philosophy/archetypal-wavelength'
const APP_URL = 'https://github.com/Geoffe-Ga/WavelengthWatch'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

// The canonical "panel": the wave naming and explaining its own phases. Shown
// on the hero and whenever no mode is active.
const canonicalBody = (phase: Phase) => PHASE_BLURBS[phase]

export default function App() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [activeOpacity, setActiveOpacity] = useState(0)
  const [canonicalOpacity, setCanonicalOpacity] = useState(1)

  const update = useCallback(() => {
    const vh = window.innerHeight
    const center = vh / 2

    setCanonicalOpacity(clamp01(1 - window.scrollY / (0.6 * vh)))

    let best = 0
    let bestOpacity = 0
    const fade = 0.45 * vh
    for (let i = 0; i < MODES.length; i++) {
      const el = revealRefs.current[i]
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const revealCenter = rect.top + rect.height / 2
      const op = clamp01(1 - Math.abs(revealCenter - center) / fade)
      if (op > bestOpacity) {
        bestOpacity = op
        best = i
      }
    }
    setActive(best)
    setActiveOpacity(bestOpacity)
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [update])

  // Whichever is stronger — the hero's canonical state or the active mode —
  // drives the single text layer, so the copy is never doubled.
  const showCanonical = canonicalOpacity >= activeOpacity
  const activeMode = MODES[active]
  const bodyOf = showCanonical ? canonicalBody : (p: Phase) => activeMode.phases[p]
  const textOpacity = showCanonical ? canonicalOpacity : activeOpacity

  return (
    <div className="page">
      {/* Fixed wavelength grid behind everything. */}
      <div className="grid-stage" aria-hidden="true">
        <div className="grid-wrap">
          <span className="axis axis-top">{FIELD.energyHigh}</span>
          <span className="axis axis-bottom">{FIELD.energyLow}</span>
          <span className="axis axis-left">{FIELD.valenceAttractive}</span>
          <span className="axis axis-right">{FIELD.valenceAversive}</span>
          <WaveGrid bodyOf={bodyOf} textOpacity={textOpacity} />
        </div>
      </div>

      <header className="topbar">
        <a className="brand" href={COURSE_URL} target="_blank" rel="noreferrer">
          <span className="brand-mark" aria-hidden="true" />
          Archetypal Wavelength
        </a>
        <nav className="topnav">
          <a href={COURSE_URL} target="_blank" rel="noreferrer">
            The Philosophy
          </a>
          <a className="btn btn-small" href={APP_URL} target="_blank" rel="noreferrer">
            Get the App
          </a>
        </nav>
      </header>

      <main className="content">
        <section className="hero">
          <div className="hero-inner">
            <p className="kicker">One rhythm, everywhere</p>
            <h1>
              The Archetypal
              <br />
              Wavelength
            </h1>
            <p className="lede">
              Expansion and contraction. Rising and bottoming out. The same six-phase wave runs
              underneath your moods, your habits, the seasons, and the rise and fall of whole
              civilizations. Learn to see where you are on it — and how to care for yourself there.
            </p>
            <div className="hero-cta">
              <a className="btn" href={COURSE_URL} target="_blank" rel="noreferrer">
                Explore the Course
              </a>
              <a className="btn btn-ghost" href={APP_URL} target="_blank" rel="noreferrer">
                Track Your Wave
              </a>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll — the field stays; the meaning changes</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        {MODES.map((m, i) => {
          const q = QUADRANTS[m.quadrant]
          return (
            <section className="step" key={m.mode} aria-label={m.title}>
              <div className="bar">
                <div className="bar-inner">
                  <span className="bar-index">
                    {String(i + 1).padStart(2, '0')} / {String(MODES.length).padStart(2, '0')}
                  </span>
                  <span className="bar-quadrant" style={{ color: q.color }}>
                    <span className="dot" style={{ background: q.color }} />
                    {q.label}
                  </span>
                  <h2>{m.title}</h2>
                  <p className="bar-gloss">{m.gloss}</p>
                  {m.source ? <p className="bar-source">after {m.source}</p> : null}
                </div>
              </div>
              <div
                className="reveal"
                ref={(el) => {
                  revealRefs.current[i] = el
                }}
              />
            </section>
          )
        })}

        <footer className="cta-final">
          <div className="cta-inner">
            <p className="kicker">Ride it on purpose</p>
            <h2>Stop fighting your wave. Start reading it.</h2>
            <p className="lede">
              When you know which phase you're in, self-care stops being guesswork. The
              WavelengthWatch app and the Archetypal Wavelength course turn this map into a daily
              practice — naming the moment you're in and meeting it with the right move.
            </p>
            <div className="hero-cta">
              <a className="btn" href={COURSE_URL} target="_blank" rel="noreferrer">
                Explore the Course
              </a>
              <a className="btn btn-ghost" href={APP_URL} target="_blank" rel="noreferrer">
                Get WavelengthWatch
              </a>
            </div>
            <p className="footnote">
              Modes drawn from <em>The Archetypal Wavelength</em> — addiction, dopamine, the
              seasons, the breath, the yugas, enshittification, the rise and fall of civilizations,
              and the Krebs cycle. One field, {MODES.length} faces.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
