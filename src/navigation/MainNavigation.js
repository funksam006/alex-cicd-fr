import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStack from './RootStack';
import AuthStack from './Auth';
import { useSelector } from 'react-redux';

const MainNavigation = () => {
  // const isAuth = useSelector((res) => res?.auth?.isAuth)
  // console.log(isAuth);
  return (
    <NavigationContainer>
      {/* {isAuth ?  */}
      <RootStack />
      {/* : 
      {/* <AuthStack />  */}
      {/* }  */}
    </NavigationContainer>
  );
};

export default MainNavigation;
