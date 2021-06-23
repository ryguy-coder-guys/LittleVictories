import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {IotdContext, MusicContext, FontContext } from './Context';
import axios from 'axios';
import BottomTabs from './NavBar';
import Login from './Login';
// import LoginModal from './Login';

const AppNavigation = createStackNavigator();


const RootNavigator = () => {

  return (
    <NavigationContainer>
      <AppNavigation.Navigator
        mode="modal"
        initialRouteName="login"
        screenOptions={{
          header: () => null
        }}
      >
        {/* eslint-disable-next-line react/no-children-prop */}
        <AppNavigation.Screen name="index" children={BottomTabs} />
        <AppNavigation.Screen name="login" component={Login} />
      </AppNavigation.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;