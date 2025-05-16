module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@react-navigation|redux-persist|react-native-gesture-handler)/)'
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
