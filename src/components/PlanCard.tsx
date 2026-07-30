import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Site } from "../content/site";
import { logSubmission, whatsAppLink } from "../content/site";
import { useLang } from "../context/LanguageContext";
import CountUp from "./CountUp";

type Plan = Site["pricing"]["plans"][number];
type Status = "idle" | "submitting" | "success" | "error";

export default function PlanCard({
  plan,
  index,
  isFlipped,
  isDimmed,
  onFlip,
  onFlipBack,
}: {
  plan: Plan;
  index: number;
  isFlipped: boolean;
  isDimmed: boolean;
  onFlip: () => void;
  onFlipBack: () => void;
}) {
  const { site } = useLang();
  const p = site.pricing;
  const c = site.contact;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot: invisible to real visitors, but generic form-filling bots
  // often fill every field they can find. Never read or shown to anyone.
  const [website, setWebsite] = useState("");

  // Clears the form whenever this card closes, however that happens — the
  // Back/close buttons, a click outside, or another plan being opened.
  useEffect(() => {
    if (!isFlipped) {
      setName("");
      setPhone("");
      setWebsite("");
      setStatus("idle");
    }
  }, [isFlipped]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (website.trim() !== "") {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      await logSubmission(
        name.trim(),
        phone.trim(),
        `${plan.name} — ${plan.price} ${plan.period}`,
        website,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const message = `Hi Mui! My name is ${name.trim()}.\nPhone: ${phone.trim()}.\nPackage: ${plan.name} — ${plan.price}${plan.period}`;

  return (
    <div
      className={`plan__flip${isFlipped ? " is-flipped" : ""}`}
      data-plan-id={plan.id}
      // Native inert: while another card is open, this one is untabbable
      // and invisible to assistive tech too, matching its pointer-events:
      // none dimmed state instead of leaving its button reachable by Tab.
      inert={isDimmed}
    >
      <div className="plan__flip-inner">
        {/* ---------- Front: the plan itself ---------- */}
        <article className="plan__card plan__card--front">
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
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
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
            onClick={onFlip}
            tabIndex={isFlipped ? -1 : undefined}
          >
            {p.cta}
          </button>
        </article>

        {/* ---------- Back: the booking form ---------- */}
        <div className="plan__card plan__card--back">
          <button
            type="button"
            className="plan__back-btn"
            onClick={onFlipBack}
            tabIndex={isFlipped ? undefined : -1}
            aria-label={p.formBack}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {p.formBack}
          </button>

          <button
            type="button"
            className="plan__back-close"
            onClick={onFlipBack}
            tabIndex={isFlipped ? undefined : -1}
            aria-label={p.formBack}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {status === "success" ? (
            <div className="plan__back-success">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="plan__back-success-icon"
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
              <p className="plan__back-success-text">{c.successText}</p>
              <button
                type="button"
                className="btn btn--outline"
                onClick={onFlipBack}
                tabIndex={isFlipped ? undefined : -1}
              >
                {p.formDone}
              </button>
            </div>
          ) : (
            <form className="plan__back-form" onSubmit={handleSubmit}>
              <p className="plan__back-plan">
                {plan.name} — {plan.price} {plan.period}
              </p>

              {/* Honeypot — real visitors never see or reach this field. */}
              <div className="plan__back-hp" aria-hidden="true">
                <label htmlFor={`plan-website-${index}`}>Website</label>
                <input
                  id={`plan-website-${index}`}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="plan__back-field">
                <label htmlFor={`plan-name-${index}`}>{c.nameLabel}</label>
                <input
                  id={`plan-name-${index}`}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={c.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  tabIndex={isFlipped ? undefined : -1}
                />
              </div>

              <div className="plan__back-field">
                <label htmlFor={`plan-phone-${index}`}>{c.phoneLabel}</label>
                <input
                  id={`plan-phone-${index}`}
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder={c.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  tabIndex={isFlipped ? undefined : -1}
                />
              </div>

              {status === "error" && (
                <p className="plan__back-error">
                  {c.errorText}{" "}
                  <a
                    href={whatsAppLink(message)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.errorCta}
                  </a>
                </p>
              )}

              <button
                type="submit"
                className="btn btn--ink plan__back-submit"
                disabled={status === "submitting"}
                tabIndex={isFlipped ? undefined : -1}
              >
                {status === "submitting" ? c.submitting : c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
