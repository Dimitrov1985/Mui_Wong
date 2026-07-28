import { useState } from "react";
import type { FormEvent } from "react";
import { FORM_ENDPOINT, site, whatsAppLink } from "../content/site";
import Reveal from "./Reveal";
import "./Contact.css";

type Status = "idle" | "submitting" | "success" | "error";

/** Logs a submission to the Google Sheet / Gmail backend. Throws on failure. */
function logSubmission(name: string, phone: string, goal: string): Promise<void> {
  if (!FORM_ENDPOINT) {
    return Promise.reject(new Error("Form endpoint is not configured yet"));
  }

  // mode: "no-cors" means we can't read the response — Apps Script doesn't
  // send CORS headers a browser will accept. We treat "the request didn't
  // throw" as success, which is the best signal available in this mode.
  return fetch(FORM_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ name, phone, goal }),
  }).then(() => undefined);
}

export default function Contact() {
  const c = site.contact;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      await logSubmission(name.trim(), phone.trim(), goal);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setName("");
    setPhone("");
    setGoal("");
    setStatus("idle");
  }

  return (
    <section className="section contact" id="contact">
      <span className="blob contact__blob" aria-hidden="true" />

      <div className="shell contact__inner">
        <Reveal className="contact__copy">
          <p className="eyebrow contact__eyebrow">{c.eyebrow}</p>
          <h2 className="display display--md">
            {c.title} <span className="script">{c.titleScript}</span>
          </h2>
          <p className="lede contact__lede">{c.lede}</p>

          <ul className="contact__channels">
            <li>
              <span className="contact__channel-label">WhatsApp</span>
              <a href={whatsAppLink()} target="_blank" rel="noreferrer">
                {site.contacts.whatsappDisplay}
              </a>
            </li>
            <li>
              <span className="contact__channel-label">Instagram</span>
              <a
                href={site.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                {site.contacts.instagram}
              </a>
            </li>
            <li>
              <span className="contact__channel-label">Line</span>
              <span>{site.contacts.line}</span>
            </li>
          </ul>

          <figure className="contact__qr">
            <img
              src={site.contacts.qr}
              alt="QR code that opens a Line chat with Mui Wong"
              loading="lazy"
              width={160}
              height={160}
            />
            <figcaption>{c.qrCaption}</figcaption>
          </figure>
        </Reveal>

        <Reveal className="contact__form-col" delay={100}>
          {status === "success" ? (
            <div className="contact__form contact__success">
              <svg
                className="contact__success-icon"
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
              <h3 className="contact__success-title">{c.successTitle}</h3>
              <p className="contact__success-text">{c.successText}</p>
              <button
                type="button"
                className="btn btn--outline"
                onClick={reset}
              >
                {c.sendAnother}
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact-name">{c.nameLabel}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={c.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="contact-phone">{c.phoneLabel}</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder={c.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <fieldset className="field field--goals">
                <legend>{c.goalLabel}</legend>
                <div className="goals">
                  {c.goals.map((option) => (
                    <label
                      key={option}
                      className={`goal${goal === option ? " is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={option}
                        checked={goal === option}
                        onChange={() => setGoal(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              {status === "error" && (
                <p className="contact__error">
                  {c.errorText}{" "}
                  <a
                    href={whatsAppLink(c.message(name.trim(), phone.trim(), goal))}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.errorCta}
                  </a>
                </p>
              )}

              <button
                type="submit"
                className="btn btn--ink contact__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? c.submitting : c.submit}
              </button>

              <p className="contact__note">{c.note}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
