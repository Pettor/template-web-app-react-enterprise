import { useEffect, useMemo, useRef, type ReactElement } from "react";
import { useMediaQuery } from "@package/react";
import clsx from "clsx";

export interface ConfettiBurstProps {
  /** Fires a burst every time this turns true. */
  active: boolean;
  /** Number of confetti pieces. */
  pieces?: number;
  /** Positions the burst; the parent must be `relative`. Defaults to covering the parent. */
  className?: string;
}

const COLORS = ["var(--color-accent)", "var(--color-success)", "var(--color-warning)", "var(--color-danger)"];
const GOLDEN_ANGLE = 137.508;

interface ConfettiPiece {
  color: string;
  dx: number;
  dy: number;
  rotation: number;
  delay: number;
  duration: number;
  round: boolean;
}

// Deterministic spread (golden angle) so renders stay pure and every burst looks lively but even.
function createPieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((i * GOLDEN_ANGLE) % 360) * (Math.PI / 180);
    const distance = 90 + ((i * 47) % 140);
    return {
      color: COLORS[i % COLORS.length]!,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance * 0.75 - 40,
      rotation: ((i * 97) % 720) - 360,
      delay: (i % 6) * 35,
      duration: 1100 + ((i * 53) % 700),
      round: i % 3 === 0,
    };
  });
}

/** A one-shot burst of confetti from the centre of its parent. Renders nothing for reduced motion. */
export function ConfettiBurst({ active, pieces = 36, className }: ConfettiBurstProps): ReactElement | null {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const confetti = useMemo(() => createPieces(pieces), [pieces]);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || prefersReducedMotion) {
      return;
    }
    const animations = confetti.map((piece, i) =>
      refs.current[i]?.animate(
        [
          { transform: "translate(-50%, -50%) scale(0.4) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${piece.dx * 0.8}px), calc(-50% + ${piece.dy}px)) scale(1) rotate(${piece.rotation / 2}deg)`,
            opacity: 1,
            offset: 0.55,
          },
          {
            transform: `translate(calc(-50% + ${piece.dx}px), calc(-50% + ${piece.dy + 120}px)) scale(0.9) rotate(${piece.rotation}deg)`,
            opacity: 0,
          },
        ],
        { duration: piece.duration, delay: piece.delay, easing: "cubic-bezier(0.2, 0.8, 0.3, 1)", fill: "both" }
      )
    );
    return () => animations.forEach((animation) => animation?.cancel());
  }, [active, confetti, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0", className)}>
      {confetti.map((piece, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={clsx("absolute top-1/2 left-1/2 opacity-0", piece.round ? "size-2 rounded-full" : "h-3 w-1.5")}
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}
