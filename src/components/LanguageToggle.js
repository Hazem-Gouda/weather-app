import { useContext } from 'react';
import { WeatherContext } from '../WeatherContext';

/**
 * LanguageToggle allows switching between English and Arabic.
 */
function LanguageToggle() {
  const { lang, setLang } = useContext(WeatherContext);
  return (
    <div className="center-toggle mb-2">
      <div className="btn-group" role="group">
        <button
          type="button"
          className={`btn btn-outline-secondary${lang === 'en' ? ' active' : ''}`}
          onClick={() => setLang('en')}
        >EN</button>
        <button
          type="button"
          className={`btn btn-outline-secondary${lang === 'ar' ? ' active' : ''}`}
          onClick={() => setLang('ar')}
        >AR</button>
      </div>
    </div>
  );
}

export default LanguageToggle; 