import { REFERENCE_LAYERS, TOXIC_HEX } from "../data/reference";
import { ReferenceWave } from "../components/ReferenceWave";
import waveMark from "../assets/wavelength-mark.png";

const APP_URL = "https://github.com/Geoffe-Ga/WavelengthWatch";

export function ReferencePage() {
  return (
    <div className="ref-page">
      <header className="topbar ref-topbar">
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

      <main className="ref-content">
        <section className="ref-intro">
          <p className="kicker">Reference</p>
          <h1>The Modes, Orientations &amp; Dosages</h1>
          <p className="lede">
            Every developmental layer is a <strong>Mode</strong> in a particular{" "}
            <strong>orientation</strong> — a way of moving through the same six
            phases. Each carries two <strong>dosages</strong>: the{" "}
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>
              medicinal
            </span>{" "}
            expression (shown in the layer's color) and the{" "}
            <span style={{ color: TOXIC_HEX, fontWeight: 600 }}>toxic</span>{" "}
            overdose (shown in red).
          </p>
        </section>

        {REFERENCE_LAYERS.map((layer) => (
          <section
            className="ref-layer"
            key={layer.id}
            aria-label={`${layer.mode} (${layer.orientation})`}
          >
            <div className="ref-card" style={{ borderColor: layer.colorHex }}>
              <span
                className="ref-swatch"
                style={{ background: layer.colorHex }}
                aria-hidden="true"
              />
              <p className="ref-color">{layer.color}</p>
              <h2 style={{ color: layer.textHex }}>
                {layer.mode}{" "}
                <span className="ref-orientation">({layer.orientation})</span>
              </h2>
              <p className="ref-orient-gloss">{layer.orientationGloss}</p>
              <p className="ref-desc">{layer.description}</p>
              <p className="ref-legend">
                <span style={{ color: layer.textHex }}>● Medicinal</span>
                <span style={{ color: TOXIC_HEX }}>● Toxic</span>
              </p>
            </div>
            <ReferenceWave layer={layer} />
          </section>
        ))}

        <footer className="ref-footer">
          <a className="btn btn-ghost" href="#">
            ← Back to the wavelength
          </a>
        </footer>
      </main>
    </div>
  );
}
