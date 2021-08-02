import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './NavBar';
import Login from './Login';
import { useQuoteContext } from '../../Contexts/quoteContext';
import { View, Image, ImageBackground } from 'react-native';
import Loading from './Loading';
import bgImage from '../../../assets/images/blue-gradient.png';
import logo from '../../../assets/logo.png';
import { containerStyles, imgStyles } from '../../Stylesheets/Stylesheet';

const AppNavigation = createStackNavigator();

const RootNavigator = (): ReactElement => {
  const { quote } = useQuoteContext();
  if (!quote) {
    return (
      <ImageBackground
        style={[containerStyles.bgImg, containerStyles.center]}
        source={bgImage}
      >
        <View style={[{ flex: 1 }, containerStyles.center]}>
          <Image source={logo} style={imgStyles.logo} />
        </View>
      </ImageBackground>
    );
  }
  return (
    <NavigationContainer>
      <AppNavigation.Navigator
        mode='modal'
        initialRouteName='login'
        screenOptions={{
          header: () => null
        }}
      >
        {/* eslint-disable-next-line react/no-children-prop */}
        <AppNavigation.Screen name='index' children={BottomTabs} />
        <AppNavigation.Screen name='login' component={Login} />
        <AppNavigation.Screen name='loading' component={Loading} />
      </AppNavigation.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
