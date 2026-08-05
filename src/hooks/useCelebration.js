import { useEffect, useRef, useState } from "react";

const DURATION_MS = 2800;

// Fires a short celebration whenever a freshly-submitted result is a perfect score.
export function useCelebration(result) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);
  const lastResultRef = useRef(null);

  useEffect(() => {
    if (result && result !== lastResultRef.current && result.maxPoints > 0 && result.points === result.maxPoints) {
      lastResultRef.current = result;
      setActive(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActive(false), DURATION_MS);
    }
  }, [result]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return active;
}
