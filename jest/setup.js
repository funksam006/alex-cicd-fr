// jest/setup.js

import 'react-native-gesture-handler/jestSetup';

// Mock gesture-handler dependencies
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    LongPressGestureHandler: View,
  };
});
