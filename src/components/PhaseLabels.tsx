import { ANCHORS, type LabelAlign, type LabelPlacement } from './geometry'
import type { Phase, PhaseMap } from '../data/modes'

const GAP = 16 // px between the dot and its card

function transformFor(place: LabelPlacement, align: LabelAlign): string {
  const x = align === 'center' ? '-50%' : align === 'left' ? '-10%' : '-90%'
  const y = place === 'above' ? `calc(-100% - ${GAP}px)` : `${GAP}px`
  return `translate(${x}, ${y})`
}

interface PhaseLabelsProps {
  /** Body copy for each phase (the manifestation, or a blurb on the hero). */
  bodyOf: (phase: Phase) => string
  accent: string
  opacity: number
  /** Visually de-emphasized, neutral styling for the canonical hero state. */
  muted?: boolean
}

// The six phase cards, each pinned to its point on the wave. The whole layer
// cross-fades as the active mode changes.
export function PhaseLabels({ bodyOf, accent, opacity, muted = false }: PhaseLabelsProps) {
  return (
    <div
      className="phase-layer"
      style={{ opacity, pointerEvents: opacity > 0.5 ? 'auto' : 'none' }}
      aria-hidden={opacity < 0.5}
    >
      {ANCHORS.map((a) => {
        const body = bodyOf(a.phase as Phase)
        return (
          <div
            key={a.phase}
            className={`phase-card place-${a.place} align-${a.align}${muted ? ' is-muted' : ''}`}
            style={{
              left: `${a.xPct}%`,
              top: `${a.yPct}%`,
              transform: transformFor(a.place, a.align),
            }}
          >
            <span className="phase-eyebrow" style={{ color: muted ? undefined : accent }}>
              {a.phase}
            </span>
            {body ? <span className="phase-body">{body}</span> : null}
          </div>
        )
      })}
    </div>
  )
}

export type { PhaseMap }
