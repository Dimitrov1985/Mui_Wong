import { useLang } from "../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang } = useLang();

  return (
    <label className={`lang-toggle${className ? ` ${className}` : ""}`}>
      <input
        type="checkbox"
        className="lang-toggle__input"
        checked={lang === "th"}
        onChange={(e) => setLang(e.target.checked ? "th" : "en")}
        aria-label={`Switch to ${lang === "th" ? "English" : "Thai"}`}
      />
      <span className="lang-toggle__track" aria-hidden="true">
        <span className="lang-toggle__label lang-toggle__label--en">EN</span>
        <span className="lang-toggle__label lang-toggle__label--th">TH</span>
        <span className="lang-toggle__knob" />
      </span>
    </label>
  );
}
