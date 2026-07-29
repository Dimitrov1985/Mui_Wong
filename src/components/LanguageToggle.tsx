import { useLang } from "../context/LanguageContext";
import "./LanguageToggle.css";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`lang-toggle${className ? ` ${className}` : ""}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={`lang-toggle__option${lang === "en" ? " is-active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-toggle__option${lang === "th" ? " is-active" : ""}`}
        aria-pressed={lang === "th"}
        onClick={() => setLang("th")}
      >
        TH
      </button>
    </div>
  );
}
