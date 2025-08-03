// Utility to get today's min/max temperature in local city time
export function getTodayMinMax(forecastList, timezoneOffsetInSeconds) {
  const nowUtc = new Date();
  const nowLocal = new Date(nowUtc.getTime() + timezoneOffsetInSeconds * 1000);
  const yyyy = nowLocal.getFullYear();
  const mm = String(nowLocal.getMonth() + 1).padStart(2, "0");
  const dd = String(nowLocal.getDate()).padStart(2, "0");
  const todayLocalStr = `${yyyy}-${mm}-${dd}`;

  const todayItems = forecastList.filter((item) => {
    const itemLocal = new Date((item.dt + timezoneOffsetInSeconds) * 1000);
    const itemDateStr = `${itemLocal.getFullYear()}-${String(
      itemLocal.getMonth() + 1
    ).padStart(2, "0")}-${String(itemLocal.getDate()).padStart(2, "0")}`;
    return itemDateStr === todayLocalStr;
  });

  if (todayItems.length === 0) return { min: null, max: null };

  const minTemps = todayItems.map((item) => item.main.temp_min);
  const maxTemps = todayItems.map((item) => item.main.temp_max);

  return {
    min: Math.round(Math.min(...minTemps)),
    max: Math.round(Math.max(...maxTemps)),
  };
}
