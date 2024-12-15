"use client";

import "../../styles/navigation/footer.css";
import {
  useTranslation,
  SupportedLocales,
} from "../global/TranslationsProvider";

export default function Footer() {
  const { locale, setLocale } = useTranslation();

  const changeLanguage = (newLocale: SupportedLocales) => {
    if (locale !== newLocale) {
      setLocale(newLocale);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <button
          type="button"
          onClick={() => changeLanguage("de")}
          className={locale === "de" ? "active" : ""}
        >
          German
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={locale === "en" ? "active" : ""}
        >
          English
        </button>
      </div>
    </footer>
  );
}
