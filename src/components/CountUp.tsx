import { useCallback, useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";

// prefix (e.g. "฿") — digits with optional thousands commas — suffix (e.g. "+")
const NUMERIC = /^([^\d]*)([\d,]+)(.*)$/;

/**
 * Counts up from 0 to the numeric part of `value` once it scrolls into
 * view, then holds on the exact final string — "150+" stays "150+" and
 * "฿3,600" stays "฿3,600", not a bare number. Values without a digit run
 * render unchanged.
 */
export default function CountUp({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const match = value.match(NUMERIC);
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";
  const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : null;
  const grouped = match ? match[2].includes(",") : false;

  const format = useCallback(
    (n: number) => (grouped ? n.toLocaleString("en-US") : String(n)),
    [grouped],
  );

  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [display, setDisplay] = useState(target === null ? value : format(0));

  useEffect(() => {
    if (!visible || target === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(format(target));
      return;
    }

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic
      setDisplay(format(Math.round(eased * target)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration, format]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
