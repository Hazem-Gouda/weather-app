import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';
import { WeatherContext } from '../context/WeatherContext';

function renderWithContext(ui, { providerProps, ...renderOptions }) {
  return render(
    <WeatherContext.Provider value={providerProps}>{ui}</WeatherContext.Provider>,
    renderOptions
  );
}

test('renders placeholder and button text based on language', () => {
  const providerProps = { city: '', setCity: jest.fn(), error: null, lang: 'en' };
  renderWithContext(<SearchInput />, { providerProps });
  expect(screen.getByPlaceholderText(/Enter city name/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
});

test('calls setCity when valid input submitted', () => {
  const setCity = jest.fn();
  const providerProps = { city: '', setCity, error: null, lang: 'en' };
  renderWithContext(<SearchInput />, { providerProps });
  const input = screen.getByPlaceholderText(/Enter city name/i);
  fireEvent.change(input, { target: { value: 'London' } });
  fireEvent.click(screen.getByRole('button', { name: /Search/i }));
  expect(setCity).toHaveBeenCalledWith('London');
});
