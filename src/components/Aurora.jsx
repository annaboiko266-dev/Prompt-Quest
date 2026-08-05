function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export default function Aurora() {
  if (prefersReducedMotion()) return null;

  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora-band aurora-1" />
      <span className="aurora-band aurora-2" />
      <span className="aurora-band aurora-3" />
    </div>
  );
}
