import { useLang } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./About.css";

export default function About() {
  const { site } = useLang();
  const a = site.about;

  return (
    <section className="section about" id="about">
      <div className="shell about__inner">
        <Reveal className="about__media-col">
          <figure className="about__media photo-frame">
            <span className="about__media-blob" aria-hidden="true" />
            <img
              src={a.photo}
              alt={a.photoAlt}
              className="photo photo--tinted"
              loading="lazy"
              width={586}
              height={976}
            />
            <span className="photo-wash" aria-hidden="true" />

            <figcaption className="about__badge">
              <span className="about__badge-value">{a.badge.value}</span>
              <span className="about__badge-label">{a.badge.label}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="about__copy">
          <Reveal>
            <p className="eyebrow">{a.eyebrow}</p>
            <h2 className="display display--md about__title">{a.title}</h2>
          </Reveal>

          <Reveal delay={80}>
            <blockquote className="about__quote">
              <span className="script">“{a.quote}”</span>
            </blockquote>
          </Reveal>

          <Reveal delay={140}>
            <p className="lede about__body">{a.body}</p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="about__list">
              {a.credentials.map((item) => (
                <li key={item}>
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                    className="about__tick"
                  >
                    <path
                      d="M3 8.4l3.2 3.2L13 4.8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <a href="#pricing" className="btn btn--ink about__cta">
              {a.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
