import { PRESELECT_GOAL_EVENT } from "../content/site";
import { useLang } from "../context/LanguageContext";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import "./Pricing.css";

// Maps a plan to its matching option in site.contact.goals, by position
// rather than by English text — the goal list is translated too, so
// matching the literal English string would break in Thai.
const GOAL_INDEX_BY_PLAN_ID: Record<string, number> = {
  "weight-loss": 0, // "Lose weight"
  "muscle-gain": 1, // "Gain muscle"
  online: 3, // "Online coaching"
};

export default function Pricing() {
  const { site } = useLang();
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

                {/* A real href, so this still works with JS disabled — the
                    preselect is a progressive enhancement on top. */}
                <a
                  href="#contact"
                  className={`btn plan__cta ${
                    plan.popular ? "btn--ink" : "btn--outline"
                  }`}
                  onClick={() => {
                    const goalIndex = GOAL_INDEX_BY_PLAN_ID[plan.id];
                    const goal =
                      goalIndex !== undefined
                        ? site.contact.goals[goalIndex]
                        : undefined;
                    if (goal) {
                      window.dispatchEvent(
                        new CustomEvent(PRESELECT_GOAL_EVENT, {
                          detail: goal,
                        }),
                      );
                    }
                  }}
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
