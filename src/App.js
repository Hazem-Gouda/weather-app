import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Import context provider and components
import { WeatherProvider } from './WeatherContext';
import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';
import UnitToggle from './components/UnitToggle';
import LanguageToggle from './components/LanguageToggle';

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
            <h1 className="text-center mb-4">Weather App</h1>
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
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
