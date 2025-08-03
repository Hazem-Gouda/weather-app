import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getTodayMinMax } from "./utils/getTodayMinMax";

// Create a context to share weather-related state and actions
export const WeatherContext = createContext();

const API_KEY = "0c42cd61ba626d8959168efccfe585ff";

/**
 * WeatherProvider wraps the app and provides weather state and actions via context.
 */
export function WeatherProvider({ children }) {
  // State for city, units (C/F), language, weather data, and error
  const [city, setCity] = useState("Cairo");
  const [units, setUnits] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [lang, setLang] = useState("en");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [todayMinMax, setTodayMinMax] = useState({ min: null, max: null });

  // Fetch weather data whenever city, units, or language changes
  useEffect(() => {
    if (!city) return;
    setError(null);
    setWeather(null);
    setTodayMinMax({ min: null, max: null });
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units,
          lang,
        },
      })
      .then((res) => setWeather(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Error fetching weather")
      );

    // Fetch forecast for realistic min/max
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: city,
          appid: API_KEY,
          units,
          lang,
        },
      })
      .then((res) => {
        const forecastList = res.data.list;
        const timezoneOffset = res.data.city.timezone;
        const minMax = getTodayMinMax(forecastList, timezoneOffset);
        setTodayMinMax(minMax);
      })
      .catch(() => {});
  }, [city, units, lang]);

  // Memoize context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      city,
      setCity,
      units,
      setUnits,
      lang,
      setLang,
      weather,
      error,
      todayMinMax,
    }),
    [city, units, lang, weather, error, todayMinMax]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
