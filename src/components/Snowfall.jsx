import { useMemo } from "react";

const FLAKE_COUNT = 44;

function makeFlakes() {
  return Array.from({ length: FLAKE_COUNT }, () => ({
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 9 + Math.random() * 12,
    delay: -(Math.random() * 20),
    drift: (Math.random() - 0.5) * 80,
    opacity: 0.25 + Math.random() * 0.55,
  }));
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export default function Snowfall() {
  const flakes = useMemo(() => makeFlakes(), []);

  if (prefersReducedMotion()) return null;

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            "--drift": `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
