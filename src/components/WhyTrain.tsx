import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useLang } from "../context/LanguageContext";
import Chevron from "./Chevron";
import Reveal from "./Reveal";
import "./WhyTrain.css";

export default function WhyTrain() {
  const { site } = useLang();
  const w = site.whyTrain;
  const slides = w.items;
  const count = slides.length;

  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  const stripRef = useRef<HTMLDivElement | null>(null);

  // Arrow keys move the strip while it has focus.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  const startX = useRef<number | null>(null);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    startX.current = event.clientX;
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const dx = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  }

  const active = slides[index];
  const prev = slides[(index - 1 + count) % count];
  const next = slides[(index + 1) % count];

  return (
    <section className="section why" id="why">
      <div className="shell">
        <Reveal className="why__head">
          <h2 className="display display--md why__title">{w.title}</h2>
        </Reveal>
      </div>

      {/* Full-bleed strip: three panels butted edge to edge, centre one live. */}
      <Reveal delay={80}>
        <div
          className="why__strip"
          ref={stripRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={w.title}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (startX.current = null)}
        >
          <figure className="why__panel why__panel--side" aria-hidden="true">
            <img src={prev.photo} alt="" loading="lazy" />
          </figure>

          <figure className="why__panel why__panel--active">
            <img
              key={active.photo}
              src={active.photo}
              alt={active.photoAlt}
              loading="lazy"
            />

            <figcaption className="why__bar">
              <button
                type="button"
                className="why__arrow"
                onClick={() => go(-1)}
                aria-label={w.prevLabel}
              >
                <Chevron dir="left" />
              </button>

              <span className="why__caption" aria-live="polite">
                {active.caption}
              </span>

              <button
                type="button"
                className="why__arrow"
                onClick={() => go(1)}
                aria-label={w.nextLabel}
              >
                <Chevron dir="right" />
              </button>
            </figcaption>
          </figure>

          <figure className="why__panel why__panel--side" aria-hidden="true">
            <img src={next.photo} alt="" loading="lazy" />
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
