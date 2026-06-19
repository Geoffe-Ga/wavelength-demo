import { CELLS, type Phase } from '../data/modes'

// Direction arrows live in the gutters between cells, tracing the clockwise
// circulation of the wave: across the top, down the right, back across the
// bottom, up the left. Coordinates are percentages of the grid box.
const ARROWS = [
  { x: 33.3, y: 25, rot: 0 }, // Rising -> Peaking
  { x: 66.6, y: 25, rot: 0 }, // Peaking -> Withdrawal
  { x: 83.3, y: 50, rot: 90 }, // Withdrawal -> Diminishing
  { x: 66.6, y: 75, rot: 180 }, // Diminishing -> Bottoming Out
  { x: 33.3, y: 75, rot: 180 }, // Bottoming Out -> Restoration
  { x: 16.6, y: 50, rot: 270 }, // Restoration -> Rising
]

interface WaveGridProps {
  /** Copy for each phase cell. */
  bodyOf: (phase: Phase) => string
  /** 0..1 — fades the text while the colored field stays put. */
  textOpacity: number
}

// The wavelength itself, rendered as the meaningful field: a 3x2 grid of cells
// colored by energy (lightness) and valence (hue), with the phase copy living
// inside each cell so it can never overlap a neighbor.
export function WaveGrid({ bodyOf, textOpacity }: WaveGridProps) {
  return (
    <div className="wave-grid">
      {CELLS.map((c) => {
        const body = bodyOf(c.phase)
        return (
          <div
            key={c.phase}
            className="cell"
            style={{
              background: c.bg,
              color: c.ink,
              ['--order' as string]: c.order,
            }}
          >
            <div className="cell-text" style={{ opacity: textOpacity }}>
              <span className="cell-eyebrow" style={{ color: c.eyebrow }}>
                {c.phase}
              </span>
              {body ? <span className="cell-body">{body}</span> : null}
            </div>
          </div>
        )
      })}

      <div className="wave-arrows" aria-hidden="true">
        {ARROWS.map((a, i) => (
          <svg
            key={i}
            className="flow-arrow"
            viewBox="0 0 24 24"
            style={{ left: `${a.x}%`, top: `${a.y}%`, transform: `translate(-50%, -50%) rotate(${a.rot}deg)` }}
          >
            <path
              d="M3 12 H17 M13 7 L19 12 L13 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}
