"use client"
// Component-local imports (global CSS & bootstrap loaded in app/layout.jsx)
// Import context provider and components
import { WeatherProvider } from '../context/WeatherContext';
import SearchInput from './SearchInput';
import WeatherInfo from './WeatherInfo';
import UnitToggle from './UnitToggle';
import LanguageToggle from './LanguageToggle';

/**
 * App is the root component. It wraps the UI in the WeatherProvider context.
 */
function App() {
  return (
    <WeatherProvider>
      {/* Main container with Bootstrap and custom theme */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 bg-white rounded shadow p-4">
            <header>
              <h1 className="text-center mb-4">Weather App</h1>
            </header>
            <main id="main-content">
              {/* Language toggle (EN/AR) with bottom margin */}
              <div className="mb-3">
                <LanguageToggle />
              </div>
              {/* City search input with bottom margin */}
              <div className="mb-3">
                <SearchInput />
              </div>
              {/* Celsius/Fahrenheit toggle with bottom margin */}
              <div className="mb-3">
                <UnitToggle />
              </div>
              {/* Weather info display */}
              <WeatherInfo />
            </main>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
