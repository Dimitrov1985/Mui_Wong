import { useLang } from "../context/LanguageContext";
import CountUp from "./CountUp";
import "./Hero.css";

export default function Hero() {
  const { site } = useLang();
  const h = site.hero;

  return (
    <section className="hero" id="top">
      {/* Decorative pink masses, sitting behind everything. */}
      <span className="blob hero__blob hero__blob--1" aria-hidden="true" />
      <span className="blob hero__blob hero__blob--2" aria-hidden="true" />

      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">{h.eyebrow}</p>

          <h1 className="display display--lg hero__title">
            <span className="hero__line">{h.line1}</span>
            <span className="hero__line">{h.line2}</span>
            <span className="script hero__script">{h.script}</span>
          </h1>

          <p className="lede hero__lede">{h.lede}</p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--solid">
              {h.primaryCta}
            </a>
            <a href="#pricing" className="btn btn--outline">
              {h.secondaryCta}
            </a>
          </div>

          <dl className="hero__stats">
            {h.stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt className="hero__stat-value">
                  <CountUp value={stat.value} />
                </dt>
                <dd className="hero__stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero__media photo-frame">
          <span className="hero__media-blob" aria-hidden="true" />
          <img
            src={h.photo}
            alt={h.photoAlt}
            className="photo photo--tinted"
            width={1181}
            height={2102}
          />
          <span className="photo-wash" aria-hidden="true" />

          <figcaption className="hero__badge">
            <span className="hero__badge-value">{h.badge.value}</span>
            <span className="hero__badge-label">{h.badge.label}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
