import { useState } from "react";
import type { FormEvent } from "react";
import { site, whatsAppLink } from "../content/site";
import Reveal from "./Reveal";
import "./Contact.css";

export default function Contact() {
  const c = site.contact;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = whatsAppLink(c.message(name.trim(), phone.trim(), goal));
    window.open(url, "_blank", "noopener,noreferrer");
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

            <button type="submit" className="btn btn--ink contact__submit">
              {c.submit}
            </button>

            <p className="contact__note">{c.note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
