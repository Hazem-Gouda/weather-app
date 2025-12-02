'use client'
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

/**
 * LanguageToggle allows switching between English and Arabic.
 */
function LanguageToggle() {
  const { lang, setLang } = useContext(WeatherContext);
  const ariaLabel = lang === 'ar' ? 'محدد اللغة' : 'Language selector';
  const enLabel = lang === 'ar' ? 'التبديل إلى الإنجليزية' : 'Switch to English';
  const arLabel = lang === 'ar' ? 'التبديل إلى العربية' : 'Switch to Arabic';

  return (
    <div className="center-toggle mb-2">
      <div className="btn-group" role="group" aria-label={ariaLabel}>
        <button
          type="button"
          className={`btn btn-outline-secondary${lang === 'en' ? ' active' : ''}`}
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
          aria-label={enLabel}
        >EN</button>
        <button
          type="button"
          className={`btn btn-outline-secondary${lang === 'ar' ? ' active' : ''}`}
          onClick={() => setLang('ar')}
          aria-pressed={lang === 'ar'}
          aria-label={arLabel}
        >AR</button>
      </div>
    </div>
  );
}

export default LanguageToggle; 