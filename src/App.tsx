import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MODES, PHASE_BLURBS, QUADRANTS, type Phase } from './data/modes'
import { Wavelength } from './components/Wavelength'
import { PhaseLabels } from './components/PhaseLabels'

const COURSE_URL = 'https://aptitude.guru/philosophy/archetypal-wavelength'
const APP_URL = 'https://github.com/Geoffe-Ga/WavelengthWatch'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export default function App() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [activeOpacity, setActiveOpacity] = useState(0)
  const [canonicalOpacity, setCanonicalOpacity] = useState(1)

  const update = useCallback(() => {
    const vh = window.innerHeight
    const center = vh / 2

    // Hero (canonical) fades out over the first ~60% of a viewport of scroll.
    const scrolled = window.scrollY
    setCanonicalOpacity(clamp01(1 - scrolled / (0.6 * vh)))

    // Each mode's reveal-zone is "fully on" when its center sits at the
    // viewport center; it fades to zero ~0.45vh either side (i.e. while the
    // neighboring white bar is sweeping across the wave).
    let best = 0
    let bestOpacity = 0
    const window45 = 0.45 * vh
    for (let i = 0; i < MODES.length; i++) {
      const el = revealRefs.current[i]
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const revealCenter = rect.top + rect.height / 2
      const dist = Math.abs(revealCenter - center)
      const op = clamp01(1 - dist / window45)
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

  const activeMode = MODES[active]
  const accent = QUADRANTS[activeMode.quadrant].color
  const dotOpacity = Math.max(activeOpacity, canonicalOpacity * 0.85)

  const canonicalBody = useMemo(
    () => (phase: Phase) => PHASE_BLURBS[phase],
    [],
  )
  const activeBody = useMemo(
    () => (phase: Phase) => activeMode.phases[phase],
    [activeMode],
  )

  return (
    <div className="page">
      {/* Fixed wavelength behind everything. */}
      <div className="wave-stage" aria-hidden="true">
        <div className="wave-frame">
          <Wavelength accent={accent} dotOpacity={dotOpacity} />
          <PhaseLabels bodyOf={canonicalBody} accent={accent} opacity={canonicalOpacity} muted />
          <PhaseLabels bodyOf={activeBody} accent={accent} opacity={activeOpacity} />
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
            <span>Scroll — the wave stays; the meaning changes</span>
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
              and the Krebs cycle. One wave, {MODES.length} faces.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
