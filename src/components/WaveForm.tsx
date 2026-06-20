import { type ReactNode, type RefObject } from "react";
import {
  WAVE_NODES,
  WAVE_PURPLE,
  WAVE_YELLOW,
  type Phase,
} from "../data/modes";
import { VB_H, VB_W, angleAt, buildPath, yAt } from "../lib/waveMath";

const ARROWS = [
  { f: 0.15, color: WAVE_YELLOW },
  { f: 0.5, color: WAVE_PURPLE },
  { f: 0.85, color: WAVE_YELLOW },
];

interface WaveFormProps {
  /** The copy that rides each phase node (a string, or medicinal/toxic lines). */
  bodyOf: (phase: Phase) => ReactNode;
  /** The copy layer; its opacity is driven imperatively from scroll position. */
  cardsRef: RefObject<HTMLDivElement>;
  /**
   * Optional color the energy field is tinted toward (multiply blend). The wave
   * stroke, arrows, and dots keep their own colors; only the field is tinted.
   */
  tint?: string;
  /** Layout flavor: "home" single-line copy, "ref" two-line medicinal/toxic. */
  variant?: "home" | "ref";
}

// The Archetypal Wavelength: a sine wave traveling through time, the phase copy
// riding it. Each phase owns a horizontal time-slot, so cards never overlap no
// matter how long the copy runs. The energy field (white crest -> black trough)
// is a layer behind the wave so it can be tinted per Mode without recoloring the
// wave itself.
export function WaveForm({
  bodyOf,
  cardsRef,
  tint,
  variant = "home",
}: WaveFormProps) {
  return (
    <div className={`waveform waveform--${variant}`}>
      {/* Energy field: white (high) at the top, black (low) at the bottom. */}
      <div className="wave-field" aria-hidden="true" />
      {/* Per-Mode tint, multiplied onto the field only (painted under the wave). */}
      <div
        className="wave-tint"
        aria-hidden="true"
        style={{ backgroundColor: tint ?? "transparent" }}
      />

      <svg
        className="wave-svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Faded tails: the wave came from the previous trough and carries on to
            the next peak — it does not loop back. */}
        <path
          d={buildPath(-0.16, 0.05)}
          fill="none"
          stroke={WAVE_YELLOW}
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.25"
        />
        <path
          d={buildPath(0.95, 1.16)}
          fill="none"
          stroke={WAVE_YELLOW}
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* Main wave, colored by valence. */}
        <path
          d={buildPath(0, 0.25)}
          fill="none"
          stroke={WAVE_YELLOW}
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d={buildPath(0.25, 0.75)}
          fill="none"
          stroke={WAVE_PURPLE}
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d={buildPath(0.75, 1)}
          fill="none"
          stroke={WAVE_YELLOW}
          strokeWidth="30"
          strokeLinecap="round"
        />

        {/* Forward arrowheads. */}
        {ARROWS.map((a, i) => (
          <path
            key={i}
            d="M-18 -22 L30 0 L-18 22 Z"
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
            r="18"
            fill={n.dot}
            stroke="rgba(38,32,44,0.5)"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <div className="wave-cards" ref={cardsRef}>
        {WAVE_NODES.map((n) => (
          <div
            key={n.phase}
            className={`wave-card place-${n.place}`}
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              ["--band" as string]: n.band,
              ["--ink" as string]: n.ink,
              ["--accent" as string]: n.accent,
            }}
          >
            <span className="wave-eyebrow">{n.phase}</span>
            {bodyOf(n.phase)}
          </div>
        ))}
      </div>
    </div>
  );
}
