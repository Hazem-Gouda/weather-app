// Utility to get today's min/max temperature in local city time
export function getTodayMinMax(forecastList, timezoneOffsetInSeconds) {
  // Using seconds for consistency and to avoid local Date mistakes
  const nowUtcSeconds = Math.floor(Date.now() / 1000);
  const nowLocalSeconds = nowUtcSeconds + timezoneOffsetInSeconds;
  const nowLocal = new Date(nowLocalSeconds * 1000);
  const yyyy = nowLocal.getFullYear();
  const mm = String(nowLocal.getMonth() + 1).padStart(2, '0');
  const dd = String(nowLocal.getDate()).padStart(2, '0');
  const todayLocalStr = `${yyyy}-${mm}-${dd}`;

  // Find forecast items that fall on the city's local 'today'
  const todayItems = forecastList.filter((item) => {
    const itemLocal = new Date((item.dt + timezoneOffsetInSeconds) * 1000);
    const itemDateStr = `${itemLocal.getFullYear()}-${String(
      itemLocal.getMonth() + 1
    ).padStart(2, '0')}-${String(itemLocal.getDate()).padStart(2, '0')}`;
    return itemDateStr === todayLocalStr;
  });

  // If no items matched today's date (edge cases across timezones),
  // fallback to computing min/max across the next 24 hours (first 8 items, 3h step)
  const sourceItems = todayItems.length > 0 ? todayItems : forecastList.slice(0, 8);

  if (sourceItems.length === 0) return { min: null, max: null };

  const minTemps = sourceItems.map((item) => item.main.temp_min);
  const maxTemps = sourceItems.map((item) => item.main.temp_max);

  return {
    min: Math.round(Math.min(...minTemps)),
    max: Math.round(Math.max(...maxTemps)),
  };
}
