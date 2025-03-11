import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/private/home/Home';

const Stack = createStackNavigator();

export const commonActions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={commonActions}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
