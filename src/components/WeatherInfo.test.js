import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherInfo from './WeatherInfo';
import { WeatherContext } from '../context/WeatherContext';

const mockWeather = {
  main: { temp: 20, temp_min: 18, temp_max: 22, humidity: 50 },
  weather: [{ description: 'clear sky', icon: '01d' }],
  wind: { speed: 3 },
  name: 'Cairo',
  sys: { country: 'EG' },
};

test('shows spinner when weather is null and no error', () => {
  const providerProps = { weather: null, error: null, lang: 'en', units: 'metric', todayMinMax: { min: null, max: null } };
  render(
    <WeatherContext.Provider value={providerProps}>
      <WeatherInfo />
    </WeatherContext.Provider>
  );
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('renders weather info when available', () => {
  const providerProps = { weather: mockWeather, error: null, lang: 'en', units: 'metric', todayMinMax: { min: null, max: null } };
  render(
    <WeatherContext.Provider value={providerProps}>
      <WeatherInfo />
    </WeatherContext.Provider>
  );
  expect(screen.getByText(/Cairo/)).toBeInTheDocument();
  expect(screen.getByText(/Max/)).toBeInTheDocument();
  expect(screen.getByText(/Min/)).toBeInTheDocument();
});
