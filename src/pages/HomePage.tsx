import { useEffect, useState } from "react";
import { FIELD, MODES, PHASE_BLURBS, type Phase } from "../data/modes";
import { WaveForm } from "../components/WaveForm";
import { useWaveReveal } from "../components/useWaveReveal";
import { selectModes } from "../lib/modeSelection";
import { MobileAppCta } from "../components/MobileAppCta";
// The brand mark is a tight crop of the original two-arrow graphic; the intro
// figure is the original labeled diagram.
import waveMark from "../assets/wavelength-mark.png";
import waveDiagram from "../assets/wavelength-diagram.png";

const COURSE_URL = "https://aptitude.guru/philosophy/archetypal-wavelength";
const APP_URL = "https://github.com/Geoffe-Ga/WavelengthWatch";

// The canonical "panel": the wave naming and explaining its own phases. Shown
// on the hero and whenever no mode is active.
const canonicalBody = (phase: Phase) => PHASE_BLURBS[phase];

const MOBILE_QUERY = "(max-width: 760px)";

export function HomePage() {
  // On a phone the wave keeps its shape, so only the short-copy modes are shown.
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );
  const modes = selectModes(isMobile);
  const { revealRefs, cardsRef, panel } = useWaveReveal(modes.length);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const activeIndex = Math.min(panel.index, modes.length - 1);
  const text = panel.canonical
    ? canonicalBody
    : (p: Phase) => modes[activeIndex].phases[p];
  const bodyOf = (p: Phase) => <span className="wave-body">{text(p)}</span>;

  return (
    <div className="page">
      {/* Fixed wavelength behind everything. */}
      <div className="grid-stage" aria-hidden="true">
        <div className="grid-wrap">
          <span className="axis axis-top">{FIELD.energyHigh}</span>
          <span className="axis axis-bottom">{FIELD.energyLow}</span>
          <span className="axis axis-asc">{FIELD.ascending} ↗</span>
          <span className="axis axis-desc">↘ {FIELD.descending}</span>
          <WaveForm bodyOf={bodyOf} cardsRef={cardsRef} />
        </div>
      </div>

      <header className="topbar">
        <a className="brand" href={COURSE_URL} target="_blank" rel="noreferrer">
          <img
            className="brand-mark"
            src={waveMark}
            alt=""
            aria-hidden="true"
          />
          Archetypal Wavelength
        </a>
        <nav className="topnav">
          <a href="#reference">Reference</a>
          <a href={COURSE_URL} target="_blank" rel="noreferrer">
            The Philosophy
          </a>
          <a
            className="btn btn-small"
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
          >
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
              Expansion and contraction. Rising and bottoming out. The same
              six-phase wave runs underneath your moods, your habits, the
              seasons, and the rise and fall of whole civilizations. Learn to
              see where you are on it — and how to care for yourself there.
            </p>
            <div className="hero-cta">
              <a
                className="btn"
                href={COURSE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Explore the Course
              </a>
              <a
                className="btn btn-ghost"
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Track Your Wave
              </a>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll — the field stays; the meaning changes</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        <section className="origin">
          <div className="origin-inner">
            <p className="kicker">Why "Archetypal"</p>
            <h2>The pattern beneath every rhythm.</h2>
            <p className="origin-lead">
              It's the <em>archetype</em> — the original pattern — for every
              oscillating, cyclical, pendulous phenomenon there is. They all
              move through the same six phases, the same swing of energy, each
              one pulled into the next by the sheer inevitability of causality:
              of accumulation and depletion, of attraction and aversion. Learn
              to read the wave once, and you can read it everywhere.
            </p>
            <figure className="origin-figure">
              <img
                src={waveDiagram}
                alt="The Archetypal Wavelength: Rising and Peaking at high energy, Withdrawal and Diminishing falling through the center, Bottoming Out at the trough, and Restoration rising back toward the next peak — over a field of energy (high above, low below) and valence (attraction in the warm cells, aversion in the cool)."
              />
            </figure>
            <figcaption className="origin-caption">
              High energy up top, low energy below; attraction in the warm
              cells, aversion in the cool ones. The wave rises, crests at the
              peak, falls through the middle, bottoms out — and turns back up
              toward the next peak. Every mode below is this same motion,
              wearing a different face.
            </figcaption>
          </div>
        </section>

        {modes.map((m, i) => {
          return (
            <section className="step" key={m.mode} aria-label={m.title}>
              <div className="bar">
                <div className="bar-inner">
                  <span className="bar-index">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(modes.length).padStart(2, "0")}
                  </span>
                  <h2>{m.title}</h2>
                  <p className="bar-gloss">{m.gloss}</p>
                  {m.source ? (
                    <p className="bar-source">after {m.source}</p>
                  ) : null}
                </div>
              </div>
              <div
                className="reveal"
                ref={(el) => {
                  revealRefs.current[i] = el;
                }}
              />
            </section>
          );
        })}

        <footer className="cta-final">
          <div className="cta-inner">
            <p className="kicker">Ride it on purpose</p>
            <h2>Stop fighting your wave. Start reading it.</h2>
            <p className="lede">
              When you know which phase you're in, self-care stops being
              guesswork. The WavelengthWatch app and the Archetypal Wavelength
              course turn this map into a daily practice — naming the moment
              you're in and meeting it with the right move.
            </p>
            <div className="hero-cta">
              <a
                className="btn"
                href={COURSE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Explore the Course
              </a>
              <a
                className="btn btn-ghost"
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Get WavelengthWatch
              </a>
            </div>
            <p className="footnote">
              Modes drawn from <em>The Archetypal Wavelength</em> — addiction,
              dopamine, the seasons, the breath, the yugas, enshittification,
              the rise and fall of civilizations, and the Krebs cycle. One
              field, {MODES.length} faces.
            </p>
          </div>
        </footer>
      </main>

      <MobileAppCta />
    </div>
  );
}
