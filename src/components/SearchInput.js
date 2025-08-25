// Import React hooks and context
import React, { useContext, useState } from "react";
import { WeatherContext } from "../WeatherContext";

/**
 * SearchInput
 * A simple input form for searching weather by city name.
 * - Shows a placeholder in English or Arabic.
 * - Clears input after each search.
 * - Prevents searching for invalid codes (like country codes).
 */
function SearchInput() {
  // Get context values: setter, error, and language
  const { setCity, error, lang } = useContext(WeatherContext);
  // Local state for the input field (always starts empty)
  const [input, setInput] = useState("");

  // Handle form submission (search)
  // - Prevents searching for invalid codes (like 'us', 'gb', etc.)
  // - Clears input after search
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && trimmed.length > 1 && !/^[A-Z]{2}$/.test(trimmed)) {
      setCity(trimmed); // Update city in context
      setInput(""); // Clear input after search
    } else {
      setInput(""); // Clear input even if invalid
    }
  };

  // Dynamic placeholder and button text based on language
  const placeholder = lang === "ar" ? "ادخل اسم المدينة" : "Enter city name";
  const buttonText = lang === "ar" ? "بحث" : "Search";

  // Render the search form
  return (
    <form className="input-group mb-3" onSubmit={handleSearch} aria-label={buttonText + ' form'}>
      {/* Input field for city name */}
      <input
        type="text"
        className="form-control"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        dir={lang === "ar" ? "rtl" : "ltr"}
      />
      {/* Search button */}
      <button className="btn btn-primary" type="submit" aria-label={buttonText}>
        {buttonText}
      </button>
      {/* Show error message if any */}
      {error && (
        <div className="text-danger w-100 mt-2 text-center">{error}</div>
      )}
    </form>
  );
}

export default SearchInput;
