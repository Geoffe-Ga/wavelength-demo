import { WAVE_NODES, type Phase } from "../data/modes";
import { VB_H, VB_W, buildPath } from "../lib/waveMath";
import { TOXIC_HEX, type ReferenceLayer } from "../data/reference";

const PATH = buildPath(0, 1);

// The same sine wave as the home page, reused to show a single layer's
// Medicinal (in the layer color) and Toxic (in red) expression at each phase.
export function ReferenceWave({ layer }: { layer: ReferenceLayer }) {
  return (
    <div className="refwave">
      <svg
        className="refwave-svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1={VB_H / 2}
          x2={VB_W}
          y2={VB_H / 2}
          stroke="#000"
          strokeOpacity="0.06"
          strokeWidth="2"
          strokeDasharray="2 12"
        />
        <path
          d={PATH}
          fill="none"
          stroke={layer.colorHex}
          strokeWidth="11"
          strokeLinecap="round"
        />
        {WAVE_NODES.map((n) => (
          <circle
            key={n.phase}
            cx={(n.x / 100) * VB_W}
            cy={(n.y / 100) * VB_H}
            r="12"
            fill={layer.colorHex}
            stroke="#fff"
            strokeWidth="3"
          />
        ))}
      </svg>

      <div className="refwave-cards">
        {WAVE_NODES.map((n) => {
          const dose = layer.phases[n.phase as Phase];
          return (
            <div
              key={n.phase}
              className={`refwave-card place-${n.place}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className="refwave-phase">{n.phase}</span>
              <span className="refwave-med" style={{ color: layer.textHex }}>
                {dose.medicinal}
              </span>
              <span className="refwave-tox" style={{ color: TOXIC_HEX }}>
                {dose.toxic}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
