import { useState } from "react";
import { logSubmission, site, whatsAppLink } from "../content/site";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import "./Pricing.css";

export default function Pricing() {
  const p = site.pricing;
  const c = site.contact;

  // Which plan (if any) is currently showing its "request sent" confirmation.
  const [bookedPlanId, setBookedPlanId] = useState<string | null>(null);

  async function handleBook(plan: (typeof p.plans)[number]) {
    try {
      await logSubmission(
        "(from pricing card)",
        "(not given)",
        `${plan.name} — ${plan.price}${plan.period}`,
      );
      setBookedPlanId(plan.id);
    } catch {
      // Logging failed — fall back to the old behaviour so the lead isn't lost.
      window.open(
        whatsAppLink(
          `Hi Mui! I'd like to start the "${plan.name}" programme (${plan.price}${plan.period}).`,
        ),
        "_blank",
        "noopener,noreferrer",
      );
    }
  }

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

                {bookedPlanId === plan.id ? (
                  <div className="plan__success">
                    <svg
                      className="plan__success-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M7.5 12.5l3 3 6-6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="plan__success-title">{c.successTitle}</h3>
                    <p className="plan__success-text">{c.successText}</p>
                    <button
                      type="button"
                      className={`btn ${plan.popular ? "btn--outline" : "btn--ink"}`}
                      onClick={() => setBookedPlanId(null)}
                    >
                      {c.sendAnother}
                    </button>
                  </div>
                ) : (
                  <>
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

                    <button
                      type="button"
                      className={`btn plan__cta ${
                        plan.popular ? "btn--ink" : "btn--outline"
                      }`}
                      onClick={() => handleBook(plan)}
                    >
                      {p.cta}
                    </button>
                  </>
                )}
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
