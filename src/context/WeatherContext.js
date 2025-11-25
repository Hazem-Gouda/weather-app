'use client'
import { createContext, useState, useEffect, useMemo } from 'react';
import { getTodayMinMax } from '../utils/getTodayMinMax';

// Create a context to share weather-related state and actions
export const WeatherContext = createContext();

/**
 * WeatherProvider wraps the app and provides weather state and actions via context.
 * This version calls local server API routes (`/api/weather` and `/api/forecast`)
 * so the real OpenWeather API key remains server-only (set `OPENWEATHER_API_KEY`).
 */
export function WeatherProvider({ children }) {
  const [city, setCity] = useState('Cairo');
  const [units, setUnits] = useState('metric'); // 'metric' | 'imperial'
  const [lang, setLang] = useState('en');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [todayMinMax, setTodayMinMax] = useState({ min: null, max: null });

  useEffect(() => {
    if (!city) return;
    setError(null);
    setWeather(null);
    setTodayMinMax({ min: null, max: null });

    (async () => {
      try {
        // Call server-side proxy for current weather
        const weatherRes = await fetch(
          `/api/weather?q=${encodeURIComponent(city)}&units=${encodeURIComponent(
            units
          )}&lang=${encodeURIComponent(lang)}`
        );

        if (!weatherRes.ok) {
          const err = await weatherRes.json().catch(() => ({}));
          setError(err.message || 'Error fetching weather');
          return;
        }

        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        // Call server-side proxy for forecast to compute today's min/max
        const forecastRes = await fetch(
          `/api/forecast?q=${encodeURIComponent(city)}&units=${encodeURIComponent(
            units
          )}&lang=${encodeURIComponent(lang)}`
        );

        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          const forecastList = forecastData.list || [];
          const timezoneOffset = forecastData.city?.timezone || 0;
          const minMax = getTodayMinMax(forecastList, timezoneOffset);
          setTodayMinMax(minMax);
        }
      } catch (e) {
        setError('Error fetching weather');
      }
    })();
  }, [city, units, lang]);

  const value = useMemo(
    () => ({ city, setCity, units, setUnits, lang, setLang, weather, error, todayMinMax }),
    [city, units, lang, weather, error, todayMinMax]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}
