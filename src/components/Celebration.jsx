const SPARK_ANGLES = Array.from({ length: 10 }, (_, i) => i * 36);

const FIREWORKS = [
  { left: "16%", top: "20%", delay: "0s", color: "#f97316" },
  { left: "80%", top: "16%", delay: "0.15s", color: "#3b82f6" },
  { left: "48%", top: "10%", delay: "0.35s", color: "#f97316" },
  { left: "28%", top: "38%", delay: "0.55s", color: "#3b82f6" },
  { left: "70%", top: "40%", delay: "0.75s", color: "#f97316" },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function Firework({ left, top, delay, color }) {
  return (
    <span className="firework" style={{ left, top }}>
      {SPARK_ANGLES.map((angle) => (
        <span
          key={angle}
          className="spark"
          style={{ "--angle": `${angle}deg`, "--fw-color": color, animationDelay: delay }}
        />
      ))}
    </span>
  );
}

export default function Celebration({ active }) {
  if (!active || prefersReducedMotion()) return null;

  return (
    <div className="celebration" aria-hidden="true">
      {FIREWORKS.map((f, i) => (
        <Firework key={i} {...f} />
      ))}
      <svg className="flying-deer" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M31 9 24 1M31 9l5-9" />
          <path d="M69 9l7-8m-7 8-5-9" />
          <path d="M20 36c4-9 12-15 22-15 8 0 14 4 20 4 6 0 10-4 14-3" />
          <path d="M20 36l-10-5m10 5-11 2" />
          <path d="M30 37 27 50m10-12-2 13m14-14 4 13m6-15 6 12" />
        </g>
      </svg>
    </div>
  );
}
