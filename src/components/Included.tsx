import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { whatsAppLink } from "../content/site";
import { useLang } from "../context/LanguageContext";
import Chevron from "./Chevron";
import Reveal from "./Reveal";
import "./Included.css";

export default function Included() {
  const { site } = useLang();
  const inc = site.included;
  const slides = inc.items;
  const count = slides.length;

  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  const carRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = carRef.current;
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
  // The two items coming up next, shown small and shrinking further away.
  const upcoming = [slides[(index + 1) % count], slides[(index + 2) % count]];

  return (
    <section className="section included" id="included">
      <div className="shell">
        <Reveal className="included__head">
          <p className="eyebrow">{inc.eyebrow}</p>
          <h2 className="display display--md included__title">{inc.title}</h2>
          <p className="lede included__lede">{inc.lede}</p>
        </Reveal>

        <div
          className="included-car"
          ref={carRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={inc.title}
        >
          <Reveal className="included-car__text" delay={60}>
            <h3 className="included-car__label" key={active.no}>
              {active.title}
            </h3>

            <div className="included-car__arrows">
              <button
                type="button"
                className="included-car__arrow"
                onClick={() => go(-1)}
                aria-label={inc.prevLabel}
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                className="included-car__arrow"
                onClick={() => go(1)}
                aria-label={inc.nextLabel}
              >
                <Chevron dir="right" />
              </button>
            </div>
          </Reveal>

          <Reveal className="included-car__photos" delay={120}>
            <div
              className="included-car__stage"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (startX.current = null)}
            >
              <figure className="included-car__slide included-car__slide--active">
                <span className="included-car__blob" aria-hidden="true" />
                <img
                  key={active.photo}
                  src={active.photo}
                  alt={active.photoAlt}
                  loading="lazy"
                />
              </figure>

              {upcoming.map((slide, i) => (
                <button
                  type="button"
                  key={slide.no}
                  className={`included-car__slide included-car__slide--thumb included-car__slide--thumb${i + 1}`}
                  onClick={() => setIndex((index + i + 1) % count)}
                  aria-label={slide.title}
                >
                  <span className="included-car__blob" aria-hidden="true" />
                  <img src={slide.photo} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="included__note">
            <p className="included__note-text">{inc.note}</p>
            <a
              href={whatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ink"
            >
              {inc.noteCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
