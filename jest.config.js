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
      '|@react-native-community/datetimepicker' +
      ')/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp
