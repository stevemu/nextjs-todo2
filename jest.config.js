module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/public(.*)$': ['<rootDir>/public$1'],
    '^@/(.*)$': ['<rootDir>/$1'],
  },
  reporters: ['default', 'jest-junit'],
  testResultsProcessor: 'jest-junit',
};
