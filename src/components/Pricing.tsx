import { site, whatsAppLink } from "../content/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import "./Pricing.css";

export default function Pricing() {
  const p = site.pricing;

  return (
    <section className="section pricing" id="pricing">
      <span className="blob pricing__blob" aria-hidden="true" />

      <div className="shell">
        <Reveal className="pricing__head">
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
              className={`plan${plan.popular ? " plan--popular" : ""}`}
              delay={i * 90}
            >
              <article className="plan__card">
                {plan.popular && (
                  <span className="plan__flag">{p.popularLabel}</span>
                )}

                <p className="plan__tagline">{plan.tagline}</p>
                <h3 className="plan__name">{plan.name}</h3>

                <p className="plan__price">
                  <span className="plan__amount">
                    <CountUp value={plan.price} />
                  </span>
                  <span className="plan__period">{plan.period}</span>
                </p>

                <p className="plan__summary">{plan.summary}</p>

                <ul className="plan__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M3 8.4l3.2 3.2L13 4.8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsAppLink(
                    `Hi Mui! I'd like to start the "${plan.name}" programme (${plan.price}${plan.period}).`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn plan__cta ${
                    plan.popular ? "btn--ink" : "btn--outline"
                  }`}
                >
                  {p.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="pricing__footnote">{p.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
