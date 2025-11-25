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
  // Create two items with dt corresponding to today in UTC
  const now = Math.floor(Date.now() / 1000);
  const item1 = { dt: now, main: { temp_min: 7.2, temp_max: 12.8 } };
  const item2 = { dt: now + 3600, main: { temp_min: 6.6, temp_max: 14.1 } };
  const list = [item1, item2];
  const offset = 0; // UTC
  const res = getTodayMinMax(list, offset);
  expect(res).toEqual({ min: Math.round(6.6), max: Math.round(14.1) });
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
