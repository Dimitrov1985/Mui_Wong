import { site, whatsAppLink } from "../content/site";
import "./Footer.css";

// Simple outline glyphs, in the same stroke style as Chevron — not a
// reproduction of any brand's logo, just a generic "chat" mark per channel.

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 20l1.1-3.4A7.5 7.5 0 1112 19a7.4 7.4 0 01-3.6-.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 10.2c.3 1.7 1.7 3.1 3.4 3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 11.2C4 7.2 7.8 4 12.5 4S21 7.2 21 11.2c0 3.6-3 6.6-7.2 7.9-.3.1-.7-.1-.6-.5l.4-1.9c-4.5.1-9.1-2.6-9.1-7.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const f = site.footer;

  return (
    <footer className="footer">
      <div className="shell footer__top">
        <span className="footer__location">{site.trainer.location}</span>

        <a href={site.contacts.telHref} className="footer__phone">
          {site.contacts.whatsappDisplay}
        </a>

        <div className="footer__social">
          <a
            href={whatsAppLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={site.contacts.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={site.contacts.lineUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on Line"
          >
            <LineIcon />
          </a>
        </div>
      </div>

      <nav className="shell footer__nav" aria-label="Footer navigation">
        {site.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="shell footer__base">
        <p>{f.rights}</p>
      </div>
    </footer>
  );
}
