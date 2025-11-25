// Manual axios mock for Jest. This keeps network calls out of unit tests.
module.exports = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => module.exports),
};
