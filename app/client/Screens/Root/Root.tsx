import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import BottomTabs from './NavBar';
import Login from './Login';
import { useQuoteContext } from '../../Contexts/quoteContext';
import { View, Text } from 'react-native';
import Loading from './Loading';

const AppNavigation = createStackNavigator();

const RootNavigator = () => {
  const { quote } = useQuoteContext();
  if (!quote) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>PLEASE WAIT WHILE QUOTE LOADS</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <AppNavigation.Navigator
        mode="modal"
        initialRouteName="login"
        screenOptions={{
          header: () => null,
        }}
      >
        {/* eslint-disable-next-line react/no-children-prop */}
        <AppNavigation.Screen name="index" children={BottomTabs} />
        <AppNavigation.Screen name="login" component={Login} />
        <AppNavigation.Screen name="loading" component={Loading} />
      </AppNavigation.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
