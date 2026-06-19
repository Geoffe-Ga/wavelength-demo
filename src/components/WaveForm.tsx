import { type RefObject } from 'react'
import { WAVE_NODES, WAVE_PURPLE, WAVE_YELLOW, type Phase } from '../data/modes'

// Wave geometry, in SVG user units. One full period spans the box; the crest
// (Peaking) sits at 25% and the trough (Bottoming Out) at 75%.
const VB_W = 1200
const VB_H = 760
const MID = 380
const AMP = 232

const yAt = (f: number) => MID - AMP * Math.sin(2 * Math.PI * f)

function buildPath(f0: number, f1: number): string {
  const steps = 120
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const f = f0 + (f1 - f0) * (i / steps)
    d += `${i === 0 ? 'M' : 'L'}${(f * VB_W).toFixed(1)} ${yAt(f).toFixed(1)} `
  }
  return d.trim()
}

// Direction of travel (degrees) at a point, so arrowheads point forward in time.
function angleAt(f: number): number {
  const dydx = -AMP * Math.cos(2 * Math.PI * f) * ((2 * Math.PI) / VB_W)
  return (Math.atan2(dydx, 1) * 180) / Math.PI
}

const ARROWS = [
  { f: 0.15, color: WAVE_YELLOW },
  { f: 0.5, color: WAVE_PURPLE },
  { f: 0.85, color: WAVE_YELLOW },
]

interface WaveFormProps {
  bodyOf: (phase: Phase) => string
  /** The copy layer; its opacity is driven imperatively from scroll position. */
  cardsRef: RefObject<HTMLDivElement>
}

// The Archetypal Wavelength: a sine wave traveling through time, the phase copy
// riding it. Each phase owns a horizontal time-slot, so cards never overlap no
// matter how long the copy runs.
export function WaveForm({ bodyOf, cardsRef }: WaveFormProps) {
  return (
    <div className="waveform">
      <svg className="wave-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="energy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fcfbf4" />
            <stop offset="0.32" stopColor="#f4ecd6" />
            <stop offset="0.62" stopColor="#cebdc6" />
            <stop offset="1" stopColor="#2c2632" />
          </linearGradient>
        </defs>

        {/* Energy field: white (high) at the top, black (low) at the bottom. */}
        <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#energy)" />

        {/* Faded tails: the wave came from the previous trough and carries on to
            the next peak — it does not loop back. */}
        <path d={buildPath(-0.16, 0.05)} fill="none" stroke={WAVE_YELLOW} strokeWidth="13" strokeLinecap="round" opacity="0.25" />
        <path d={buildPath(0.95, 1.16)} fill="none" stroke={WAVE_YELLOW} strokeWidth="13" strokeLinecap="round" opacity="0.25" />

        {/* Main wave, colored by valence. */}
        <path d={buildPath(0, 0.25)} fill="none" stroke={WAVE_YELLOW} strokeWidth="15" strokeLinecap="round" />
        <path d={buildPath(0.25, 0.75)} fill="none" stroke={WAVE_PURPLE} strokeWidth="15" strokeLinecap="round" />
        <path d={buildPath(0.75, 1)} fill="none" stroke={WAVE_YELLOW} strokeWidth="15" strokeLinecap="round" />

        {/* Forward arrowheads. */}
        {ARROWS.map((a, i) => (
          <path
            key={i}
            d="M-10 -11 L15 0 L-10 11 Z"
            fill={a.color}
            transform={`translate(${a.f * VB_W} ${yAt(a.f)}) rotate(${angleAt(a.f)})`}
          />
        ))}

        {/* Phase markers — white at the crest, black at the trough. */}
        {WAVE_NODES.map((n) => (
          <circle
            key={n.phase}
            cx={(n.x / 100) * VB_W}
            cy={(n.y / 100) * VB_H}
            r="15"
            fill={n.dot}
            stroke="rgba(38,32,44,0.5)"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <div className="wave-cards" ref={cardsRef}>
        {WAVE_NODES.map((n) => {
          const body = bodyOf(n.phase)
          return (
            <div
              key={n.phase}
              className={`wave-card place-${n.place}`}
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                ['--band' as string]: n.band,
                ['--ink' as string]: n.ink,
                ['--accent' as string]: n.accent,
              }}
            >
              <span className="wave-eyebrow">{n.phase}</span>
              {body ? <span className="wave-body">{body}</span> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
