import { REFERENCE_LAYERS, TOXIC_HEX } from "../data/reference";
import { FIELD, type Phase } from "../data/modes";
import { REFERENCE_HERO } from "../content/pages";
import { WaveForm } from "../components/WaveForm";
import { useWaveReveal } from "../components/useWaveReveal";
import { MobileAppCta } from "../components/MobileAppCta";
import { Lines, RichText } from "../components/RichText";
import { readableInk, shade } from "../lib/color";
import waveMark from "../assets/wavelength-mark.png";

const APP_URL = "https://github.com/Geoffe-Ga/WavelengthWatch";

// The Reference page reuses the home page's machinery: one fixed wavelength
// behind everything, full-screen "bars" (one per Mode, tinted in its spiral
// color) that scroll by, and transparent reveal zones between them where the
// wave fills in that Mode's medicinal (Mode color) and toxic (red) doses.
export function ReferencePage() {
  const { revealRefs, cardsRef, panel } = useWaveReveal(
    REFERENCE_LAYERS.length,
  );
  const active =
    REFERENCE_LAYERS[Math.min(panel.index, REFERENCE_LAYERS.length - 1)];

  // The word bubbles carry both dosages of the active Mode: medicinal in the
  // Mode's readable color, toxic always in red.
  const bodyOf = (phase: Phase) => {
    const dose = active.phases[phase];
    return (
      <>
        <span className="wave-med" style={{ color: active.textHex }}>
          {dose.medicinal}
        </span>
        <span className="wave-tox" style={{ color: TOXIC_HEX }}>
          {dose.toxic}
        </span>
      </>
    );
  };

  return (
    <div className="page">
      {/* Fixed wavelength behind everything; the field is tinted per Mode. */}
      <div className="grid-stage" aria-hidden="true">
        <div className="grid-wrap">
          <span className="axis axis-top">{FIELD.energyHigh}</span>
          <span className="axis axis-bottom">{FIELD.energyLow}</span>
          <span className="axis axis-asc">{FIELD.ascending} ↗</span>
          <span className="axis axis-desc">↘ {FIELD.descending}</span>
          <WaveForm
            bodyOf={bodyOf}
            cardsRef={cardsRef}
            tint={active.colorHex}
            variant="ref"
          />
        </div>
      </div>

      <header className="topbar">
        <a className="brand" href="#">
          <img
            className="brand-mark"
            src={waveMark}
            alt=""
            aria-hidden="true"
          />
          Archetypal Wavelength
        </a>
        <nav className="topnav">
          <a href="#">Home</a>
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
            <p className="kicker">{REFERENCE_HERO.eyebrow}</p>
            <h1>
              <Lines text={REFERENCE_HERO.heading} />
            </h1>
            <p className="lede">
              <RichText text={REFERENCE_HERO.intro} />
            </p>
            <div className="hero-cta">
              <a className="btn btn-ghost" href="#">
                ← Back to the wavelength
              </a>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>{REFERENCE_HERO.scrollCue}</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </section>

        {REFERENCE_LAYERS.map((layer, i) => {
          const ink = readableInk(layer.colorHex);
          const background = `linear-gradient(180deg, ${layer.colorHex} 0%, ${shade(
            layer.colorHex,
            0.2,
          )} 100%)`;
          return (
            <section
              className="step"
              key={layer.id}
              aria-label={`${layer.mode} (${layer.orientation})`}
            >
              <div className="bar bar-ref" style={{ background, color: ink }}>
                <div className="bar-inner">
                  <span className="bar-index">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(REFERENCE_LAYERS.length).padStart(2, "0")}
                  </span>
                  <p className="ref-spiral">{layer.color}</p>
                  <h2>
                    {layer.mode}{" "}
                    <span className="ref-orientation">
                      ({layer.orientation})
                    </span>
                  </h2>
                  <p className="bar-gloss">{layer.description}</p>
                  <p className="ref-orient-gloss-bar">
                    {layer.orientationGloss}
                  </p>
                  <p className="ref-hint">
                    Scroll on — its medicinal &amp; toxic doses fill the wave ↓
                  </p>
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
            <p className="kicker">One field, nine layers</p>
            <h2>The same wave, all the way up.</h2>
            <p className="lede">
              Every Mode rides the identical six-phase wave — only the meaning
              changes. Track where you are on it, in any layer, with the
              WavelengthWatch app.
            </p>
            <div className="hero-cta">
              <a
                className="btn"
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Get the App
              </a>
              <a className="btn btn-ghost" href="#">
                ← Back to the wavelength
              </a>
            </div>
          </div>
        </footer>
      </main>

      <MobileAppCta />
    </div>
  );
}
