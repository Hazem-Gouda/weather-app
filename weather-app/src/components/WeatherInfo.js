import { useContext } from "react";
import moment from "moment";
import "moment/locale/ar";
import { WeatherContext } from "../WeatherContext";

/**
 * WeatherInfo displays the current weather information for the selected city.
 */
function WeatherInfo() {
  const { weather, error, lang, units, todayMinMax } = useContext(WeatherContext);

  // Don't show anything if there's an error (handled in SearchInput)
  if (error) return null;
  // Show loading spinner if weather data is not yet loaded
  if (!weather)
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  // Extract weather data
  const temp = Math.round(weather.main.temp);
  const tempMin =
    todayMinMax.min !== null
      ? todayMinMax.min
      : Math.round(weather.main.temp_min);
  const tempMax =
    todayMinMax.max !== null
      ? todayMinMax.max
      : Math.round(weather.main.temp_max);
  const condition = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const wind = weather.wind.speed;
  const humidity = weather.main.humidity;
  const cityName = weather.name;
  const countryCode = weather.sys.country;

  // Country code to Arabic name mapping (add more as needed)
  const countryNamesAr = {
    EG: "مصر",
    SA: "السعودية",
    AE: "الإمارات",
    US: "الولايات المتحدة",
    GB: "المملكة المتحدة",
    FR: "فرنسا",
    DE: "ألمانيا",
    IT: "إيطاليا",
    ES: "إسبانيا",
    // ... add more country codes as needed
  };
  const country =
    lang === "ar" ? countryNamesAr[countryCode] || countryCode : countryCode;

  // Date/time formatting using moment.js (device time zone)
  const localMoment = moment();
  // Use 12-hour format with am/pm in both languages
  const dateTimeStr =
    lang === "ar"
      ? localMoment.locale("ar").format("dddd، D MMMM YYYY - h:mm A")
      : localMoment.locale("en").format("dddd, D MMM YYYY - h:mm A");

  // Translations for labels
  const labels = {
    temp: lang === "ar" ? "درجة الحرارة" : "Temperature",
    wind: lang === "ar" ? "الرياح" : "Wind",
    humidity: lang === "ar" ? "الرطوبة" : "Humidity",
    speed:
      lang === "ar"
        ? units === "metric"
          ? "م/ث"
          : "ميل/س"
        : units === "metric"
        ? "m/s"
        : "mph",
    condition: lang === "ar" ? "الحالة" : "Condition",
  };

  return (
    // Always center content, regardless of language
    <div className="text-center" dir={lang === "ar" ? "rtl" : "ltr"} aria-live="polite">
      {/* Date and time (device time zone, styled, same order for both languages) */}
      <div
        className="mb-2"
        style={{
          fontWeight: "500",
          fontSize: "1.1rem",
          color: "#555",
          background: "#f0f0f0",
          borderRadius: "8px",
          display: "inline-block",
          padding: "4px 16px",
        }}
      >
        {dateTimeStr}
      </div>
      {/* City and country heading with extra margin-top for spacing */}
      <h3 className="fw-bold mb-3 mt-4 text-primary text-center">
        {cityName}
        {country ? `, ${country}` : ""}
      </h3>
      {/* Weather icon */}
      <div className="mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={condition}
        />
      </div>
      {/* Temperature */}
      <h2 className="display-4 mb-1">
        {temp}
        {units === "metric" ? "°C" : "°F"}
      </h2>
      {/* Min/Max Temperature - correct order and alignment for each language */}
      <div
        className={`mb-2 d-flex justify-content-center ${
          lang === "ar" ? "flex-row-reverse" : ""
        }`}
        style={{ fontSize: "1.1rem", gap: "2.5rem" }}
      >
        {lang === "ar" ? (
          <>
            <span>
              {"العظمى"}: {tempMax}
              {units === "metric" ? "°C" : "°F"}
            </span>
            <span>
              {"الصغرى"}: {tempMin}
              {units === "metric" ? "°C" : "°F"}
            </span>
          </>
        ) : (
          <>
            <span>
              {"Max"}: {tempMax}
              {units === "metric" ? "°C" : "°F"}
            </span>
            <span>
              {"Min"}: {tempMin}
              {units === "metric" ? "°C" : "°F"}
            </span>
          </>
        )}
      </div>
      {/* Weather condition */}
      <div className="mb-2 text-capitalize">
        {labels.condition}: {condition}
      </div>
      {/* Wind and humidity - always balanced columns */}
      <div className="row justify-content-center">
        <div className="col-6 col-md-5">
          <div className="bg-light rounded p-2 mb-2 text-center">
            <strong>{labels.wind}:</strong> {wind} {labels.speed}
          </div>
        </div>
        <div className="col-6 col-md-5">
          <div className="bg-light rounded p-2 mb-2 text-center">
            <strong>{labels.humidity}:</strong> {humidity}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
