import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import BottomTabs from './NavBar';
import Login from './Login';
// import LoginModal from './Login';
import { useUserContext } from '../../Contexts/userContext';
import Loading from './Loading';
import { View } from 'react-native';

const AppNavigation = createStackNavigator();


const RootNavigator = () => {
  const [loading, setLoading]  = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
      setLoading(user ? false : true);
  }, [user]);



  return (
    <View>
    {!loading ? <NavigationContainer>
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
    : <Loading/>}
    </View>
  );
};
export default RootNavigator;