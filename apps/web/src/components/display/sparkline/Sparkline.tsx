import type { ReactElement } from "react";
import { useId } from "react";

export interface SparklineProps {
  data: number[];
  stroke: string;
  fill: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, stroke, fill, width = 86, height = 28 }: SparklineProps): ReactElement | null {
  const gid = useId();
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map<[number, number]>((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const areaD = `${d} L ${width},${height} L 0,${height} Z`;
  const last = points[points.length - 1] ?? [0, 0];
  return (
    <svg width={width} height={height} className="block overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`sg-${gid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity="0.35" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${gid})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r={2.5} fill={stroke} />
    </svg>
  );
}
