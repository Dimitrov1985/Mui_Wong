import { site, whatsAppLink } from "../content/site";
import "./Footer.css";

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
            <img src="/whatsapp.png" alt="" />
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
            <img src="/line.png" alt="" />
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
