import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { BenefitSlide } from "../content/site";
import { useLang } from "../context/LanguageContext";
import Chevron from "./Chevron";
import Reveal from "./Reveal";
import "./Benefits.css";

/**
 * One slide's artwork: a cut-out photo sitting on a pink blob, as in the
 * reference. Until real cut-outs exist, a numbered placeholder stands in.
 */
function SlideArt({
  slide,
  tone,
}: {
  slide: BenefitSlide;
  tone: "center" | "side";
}) {
  return (
    <div className={`bslide bslide--${tone}`}>
      <span className="bslide__blob" aria-hidden="true" />
      {slide.photo ? (
        <img
          className="bslide__photo"
          src={slide.photo}
          alt={tone === "center" ? (slide.photoAlt ?? "") : ""}
          loading="lazy"
        />
      ) : (
        <span className="bslide__placeholder">
          <span className="bslide__no">{slide.no}</span>
        </span>
      )}
    </div>
  );
}

export default function Benefits() {
  const { site } = useLang();
  const b = site.benefits;
  const slides = b.items;
  const count = slides.length;

  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  const stageRef = useRef<HTMLDivElement | null>(null);

  // Arrow keys move the carousel while it has focus.
  useEffect(() => {
    const el = stageRef.current;
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

  // Horizontal drag / swipe.
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
    <section className="section benefits" id="benefits">
      <div className="shell">
        <Reveal className="benefits__head">
          <p className="eyebrow benefits__eyebrow">{b.eyebrow}</p>
          <h2 className="display display--md benefits__title">{b.title}</h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="bcar"
            ref={stageRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label={b.title.replace("\n", " ")}
          >
            <div
              className="bcar__stage"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (startX.current = null)}
            >
              <div className="bcar__side" aria-hidden="true">
                <SlideArt slide={prev} tone="side" />
              </div>

              <button
                type="button"
                className="bcar__arrow"
                onClick={() => go(-1)}
                aria-label={b.prevLabel}
              >
                <Chevron dir="left" />
              </button>

              {/* key remounts the art so its entrance animation replays */}
              <div className="bcar__center" key={index}>
                <SlideArt slide={active} tone="center" />
              </div>

              <button
                type="button"
                className="bcar__arrow"
                onClick={() => go(1)}
                aria-label={b.nextLabel}
              >
                <Chevron dir="right" />
              </button>

              <div className="bcar__side" aria-hidden="true">
                <SlideArt slide={next} tone="side" />
              </div>
            </div>

            <div className="bcar__caption" aria-live="polite">
              <h3 className="bcar__title" key={`t-${index}`}>
                {active.title}
              </h3>
              <p className="bcar__text" key={`p-${index}`}>
                {active.text}
              </p>
            </div>

            <div className="bcar__dots">
              {slides.map((slide, i) => (
                <button
                  key={slide.no}
                  type="button"
                  className={`bcar__dot${i === index ? " is-active" : ""}`}
                  aria-label={`${slide.title} (${i + 1} of ${count})`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
