import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import PlanCard from "./PlanCard";
import Reveal from "./Reveal";
import "./Pricing.css";

export default function Pricing() {
  const { site } = useLang();
  const p = site.pricing;

  // Only one plan can be flipped open at a time — flipping another closes
  // whichever was open, same as the rest of the section dimming.
  const [flippedId, setFlippedId] = useState<string | null>(null);

  // A click anywhere outside the open card — dimmed siblings, the heading,
  // blank space — flips it back, same as its own Back/close button.
  useEffect(() => {
    if (!flippedId) return;

    function onDocClick(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest(`.plan__flip[data-plan-id="${flippedId}"]`)) {
        setFlippedId(null);
      }
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [flippedId]);

  return (
    <section className="section pricing" id="pricing">
      <span className="blob pricing__blob" aria-hidden="true" />

      <div className="shell">
        <Reveal className={`pricing__head${flippedId ? " is-dimmed" : ""}`}>
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 className="display display--md">
            {p.title} <span className="script">{p.titleScript}</span>
          </h2>
          <p className="lede pricing__lede">{p.lede}</p>
        </Reveal>

        <div className="pricing__grid">
          {p.plans.map((plan, i) => (
            <Reveal
              key={plan.id}
              className={`plan${plan.popular ? " plan--popular" : ""}${
                flippedId && flippedId !== plan.id ? " plan--dimmed" : ""
              }`}
              delay={i * 90}
            >
              <PlanCard
                plan={plan}
                index={i}
                isFlipped={flippedId === plan.id}
                onFlip={() => setFlippedId(plan.id)}
                onFlipBack={() => setFlippedId(null)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={120}
          className={`pricing__footnote-wrap${flippedId ? " is-dimmed" : ""}`}
        >
          <p className="pricing__footnote">{p.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
