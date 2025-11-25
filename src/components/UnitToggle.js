"use client"
import { useContext } from "react";
import { WeatherContext } from "../WeatherContext";

/* UnitToggle allows switching between Celsius and Fahrenheit. */
function UnitToggle() {
  const { units, setUnits, lang } = useContext(WeatherContext);
  const isMetric = units === "metric";
  const cLabel = lang === "ar" ? "°م" : "°C";
  const fLabel = lang === "ar" ? "°ف" : "°F";
  const cAria = lang === 'ar' ? `عرض الدرجات ${cLabel}` : `${cLabel} units`;
  const fAria = lang === 'ar' ? `عرض الدرجات ${fLabel}` : `${fLabel} units`;

  return (
    // Add unit-toggle class for custom styling
    <div className="btn-group unit-toggle w-100 mb-2" role="group">
      <button
        type="button"
        className={`btn btn-outline-primary${isMetric ? " active" : ""}`}
        onClick={() => setUnits("metric")}
        style={{ marginRight: "12px" }}
  aria-pressed={isMetric}
  aria-label={cAria}
      >
        {cLabel}
      </button>
      <button
        type="button"
        className={`btn btn-outline-primary${!isMetric ? " active" : ""}`}
        onClick={() => setUnits("imperial")}
        style={{ marginLeft: "12px" }}
  aria-pressed={!isMetric}
  aria-label={fAria}
      >
        {fLabel}
      </button>
    </div>
  );
}

export default UnitToggle;
