// eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IconA from 'react-native-vector-icons/Ionicons';
import IconB from 'react-native-vector-icons/FontAwesome5';
import Journal from '../Journal/Journal';
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import Tasks from '../Tasks/Task';
import { View, Text } from 'react-native';
import TaskSummary from '../Tasks/TaskSummary';

const AppBottomNavigator = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <AppBottomNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarColor: '#94B6BD',
      }}
    >
      <AppBottomNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <IconA name="home" size={25} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Tasks"
        component={TaskSummary}
        options={{
          tabBarIcon: () => <IconB name="tasks" size={25} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Journal"
        component={Journal}
        options={{
          tabBarIcon: () => <IconA name="journal" size={25} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => <IconA name="settings" size={25} color="#FAFAFA" />,
        }}
      />
    </AppBottomNavigator.Navigator>
  );
};

export default BottomTabs;
