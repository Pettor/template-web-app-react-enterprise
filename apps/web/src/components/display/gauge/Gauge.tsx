import type { ReactElement } from "react";
import { useId } from "react";

export interface GaugeProps {
  value: number;
  total: number;
  subLabel: string;
  size?: number;
  strokeWidth?: number;
}

export function Gauge({ value, total, subLabel, size = 132, strokeWidth = 12 }: GaugeProps): ReactElement {
  const pct = total > 0 ? Math.max(0, Math.min(1, value / total)) : 0;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct);
  const gid = useId();
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={`gauge-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#gauge-${gid})`}
          strokeWidth={strokeWidth}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="[transition:stroke-dashoffset_800ms_cubic-bezier(.2,.9,.2,1)]"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-mono text-3xl font-semibold tracking-tight tabular-nums">{Math.round(pct * 100)}%</div>
          <div className="text-default-500 mt-0.5 text-[11px]">{subLabel}</div>
        </div>
      </div>
    </div>
  );
}
