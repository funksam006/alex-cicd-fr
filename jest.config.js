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
      ')/)',
  ],
};
