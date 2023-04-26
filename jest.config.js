module.exports = {
  clearMocks: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest report',
        outputDirectory: '.',
        outputName: './jest-report.xml'
      }
    ]
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!*.js',
    '!**/coverage/**'
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },
  coverageReporters: ['text',
    'text-summary',
    'cobertura',
    'lcov'],
  testEnvironment: 'node'
};
