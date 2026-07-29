import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import "./Navbar.css";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.6a1 1 0 01-.25 1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Navbar() {
  const { site } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the page from scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="shell nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <img
            src={site.trainer.logo}
            alt=""
            aria-hidden="true"
            className="nav__logo"
          />
          <span className="nav__name">
            {site.trainer.name}
            <span className="nav__role">{site.trainer.role}</span>
          </span>
        </a>

        <nav
          className={`nav__links${open ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {site.nav.items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            href={site.contacts.telHref}
            className="nav__phone nav__phone--mobile"
            onClick={() => setOpen(false)}
          >
            <PhoneIcon />
            {site.contacts.whatsappDisplay}
          </a>
          <a
            href="#contact"
            className="btn btn--solid nav__cta nav__cta--mobile"
            onClick={() => setOpen(false)}
          >
            {site.nav.cta}
          </a>
        </nav>

        <div className="nav__actions">
          <a href={site.contacts.telHref} className="nav__phone">
            <PhoneIcon />
            <span>{site.contacts.whatsappDisplay}</span>
          </a>

          <a href="#contact" className="btn btn--solid nav__cta">
            {site.nav.cta}
          </a>
        </div>

        {/* Grouped together and kept outside .nav__actions and the
            collapsible menu, so the toggle stays visible in the top bar at
            every width — including on mobile, where it would otherwise be
            hidden until the burger menu is opened. */}
        <div className="nav__end">
          <LanguageToggle className="nav__lang" />

          <button
            type="button"
            className={`nav__burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
