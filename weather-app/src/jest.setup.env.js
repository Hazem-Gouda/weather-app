// Provide basic mocks for ESM packages that Jest's transformer may not handle
// Mock axios to avoid importing ESM build during tests
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

// If other ESM-only deps cause issues, add mocks here as needed
