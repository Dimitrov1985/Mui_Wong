import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  /** Extra classes — lets the wrapper double as the grid/flex item. */
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
