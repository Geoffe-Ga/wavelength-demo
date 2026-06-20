const APP_URL = "https://github.com/Geoffe-Ga/WavelengthWatch";

// On phones the top nav has no room for the primary call-to-action, so it lives
// here as a thumb-friendly button pinned to the bottom of the screen. Hidden on
// desktop (see `.app-cta-float` in index.css), where the top-bar button shows.
export function MobileAppCta() {
  return (
    <div className="app-cta-float">
      <a className="btn" href={APP_URL} target="_blank" rel="noreferrer">
        Get the App
      </a>
    </div>
  );
}
