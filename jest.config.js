module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest/setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-redux' +
      '|@react-navigation' +
      '|redux-persist' +
      '|react-native-gesture-handler' +
      '|react-native-toast-message' +
      '|react-native-splash-screen' +
      '|react-native-status-bar-height' +
      '|react-native-modal-datetime-picker' +  
      ')/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/jest/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
};
