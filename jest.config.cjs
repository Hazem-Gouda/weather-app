module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
