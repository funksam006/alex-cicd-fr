import 'react-native-gesture-handler' 
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import MainNavigation from './src/navigation/MainNavigation';
import {persistor, store} from './store';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
        <Toast />
      </PersistGate>
    </Provider>
  );
};
export default App;
