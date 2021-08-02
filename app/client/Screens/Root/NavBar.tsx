import React, { ReactElement } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IconA from 'react-native-vector-icons/Ionicons';
import IconB from 'react-native-vector-icons/FontAwesome5';
import Journals from '../Journal/Journals';
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import Tasks from '../Tasks/Tasks';
import Feed from '../Feed/Feed';

const AppBottomNavigator = createMaterialBottomTabNavigator();

const BottomTabs = (): ReactElement => {
  return (
    <AppBottomNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarColor: '#94B6BD'
      }}
    >
      <AppBottomNavigator.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: () => <IconA name='home' size={22} color='#FAFAFA' />
        }}
      />
      <AppBottomNavigator.Screen
        name='Feed'
        component={Feed}
        options={{
          tabBarIcon: () => (
            <IconB name='user-friends' size={22} color='#FAFAFA' />
          )
        }}
      />
      <AppBottomNavigator.Screen
        name='Tasks'
        component={Tasks}
        options={{
          tabBarIcon: () => <IconB name='tasks' size={22} color='#FAFAFA' />
        }}
      />
      <AppBottomNavigator.Screen
        name='Journal'
        component={Journals}
        options={{
          tabBarIcon: () => <IconA name='journal' size={22} color='#FAFAFA' />
        }}
      />
      <AppBottomNavigator.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: () => <IconA name='settings' size={22} color='#FAFAFA' />
        }}
      />
    </AppBottomNavigator.Navigator>
  );
};

export default BottomTabs;
