import { getTodayMinMax } from './getTodayMinMax';

test('handles list with a single timestamp not matching today by falling back', () => {
  // Use a timestamp far in the past so it won't match today; fallback will use slice
  const list = [{ dt: 1000, main: { temp_min: 5, temp_max: 10 } }];
  const offset = 0; // UTC
  const res = getTodayMinMax(list, offset);
  // fallback takes the first item when no today items exist
  expect(res).toEqual({ min: 5, max: 10 });
});

test('calculates min and max for today items', () => {
  // Create items within a 24-hour window to ensure they match today
  // Use timestamps spread across the day
  const now = Math.floor(Date.now() / 1000);
  const midday = new Date(now * 1000);
  midday.setHours(12, 0, 0, 0); // set to noon UTC
  const noondaySeconds = Math.floor(midday.getTime() / 1000);
  
  const list = [
    { dt: noondaySeconds, main: { temp_min: 7.2, temp_max: 12.8 } },
    { dt: noondaySeconds + 3600, main: { temp_min: 6.6, temp_max: 14.1 } },
    { dt: noondaySeconds + 7200, main: { temp_min: 5, temp_max: 13 } },
    { dt: noondaySeconds + 10800, main: { temp_min: 6, temp_max: 12 } },
    { dt: noondaySeconds + 14400, main: { temp_min: 7, temp_max: 11 } },
    { dt: noondaySeconds + 18000, main: { temp_min: 8, temp_max: 10 } },
    { dt: noondaySeconds + 21600, main: { temp_min: 9, temp_max: 9 } },
    { dt: noondaySeconds + 25200, main: { temp_min: 10, temp_max: 8 } },
  ];
  const offset = 0; // UTC
  const res = getTodayMinMax(list, offset);
  // All items should be today; min = 5, max = 14.1 -> 14
  expect(res).toEqual({ min: 5, max: 14 });
});

test('falls back to next 24h slice when no today items', () => {
  // Create items far in the future so none match today's local date
  const now = Math.floor(Date.now() / 1000);
  const future = now + 60 * 60 * 24 * 3; // 3 days ahead
  const list = [];
  for (let i = 0; i < 10; i++) {
    list.push({ dt: future + i * 3600, main: { temp_min: 5 + i, temp_max: 10 + i } });
  }
  const res = getTodayMinMax(list, 0);
  // fallback takes first 8 items: min = 5, max = 17
  expect(res).toEqual({ min: 5, max: 17 });
});
