import { ANCHORS, VIEW_H, VIEW_W, wavePath } from './geometry'

const PATH = wavePath()

interface WavelengthProps {
  accent: string
  /** 0..1 brightness of the phase dots, follows the active mode. */
  dotOpacity: number
}

// The static wavelength itself: a single sine period drawn in slate, with a
// soft accent glow and a dot marking each of the six phase positions.
export function Wavelength({ accent, dotOpacity }: WavelengthProps) {
  return (
    <svg
      className="wave-svg"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6c6470" />
          <stop offset="0.5" stopColor="#4a4550" />
          <stop offset="1" stopColor="#6c6470" />
        </linearGradient>
        <filter id="waveGlow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* baseline that the wave breathes around */}
      <line
        x1="0"
        y1={VIEW_H / 2}
        x2={VIEW_W}
        y2={VIEW_H / 2}
        stroke="#000"
        strokeOpacity="0.06"
        strokeWidth="2"
        strokeDasharray="2 10"
      />

      {/* accent-tinted echo of the wave */}
      <path
        d={PATH}
        fill="none"
        stroke={accent}
        strokeOpacity={0.18 + 0.22 * dotOpacity}
        strokeWidth="16"
        strokeLinecap="round"
        filter="url(#waveGlow)"
        style={{ transition: 'stroke 600ms ease, stroke-opacity 400ms ease' }}
      />

      {/* the wave itself */}
      <path
        d={PATH}
        fill="none"
        stroke="url(#waveStroke)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* phase markers */}
      {ANCHORS.map((a) => {
        const { x, y } = { x: (a.xPct / 100) * VIEW_W, y: (a.yPct / 100) * VIEW_H }
        return (
          <g key={a.phase} style={{ transition: 'opacity 500ms ease' }} opacity={0.35 + 0.65 * dotOpacity}>
            <circle cx={x} cy={y} r="13" fill={accent} opacity="0.22" style={{ transition: 'fill 600ms ease' }} />
            <circle cx={x} cy={y} r="6" fill="#fbf6e6" stroke={accent} strokeWidth="3" style={{ transition: 'stroke 600ms ease' }} />
          </g>
        )
      })}
    </svg>
  )
}
