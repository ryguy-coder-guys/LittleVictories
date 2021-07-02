import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IconA from 'react-native-vector-icons/Ionicons';
import IconB from 'react-native-vector-icons/FontAwesome5';
import Journal from '../Journal/Journal';
import Journal1 from '../Journal/PastJournals';
import Main from '../Journal/Main';
import Home from '../Home/Home';
import Settings from '../Settings/Settings';
import Tasks from '../Tasks/Tasks';
import Feed from '../Feed/Feed';
import Friends from '../Feed/Friends'

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
          tabBarIcon: () => <IconA name="home" size={22} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Feed"
        component={Friends}
        options={{
          tabBarIcon: () => <IconB name="user-friends" size={22} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: () => <IconB name="tasks" size={22} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Journal"
        component={Main}
        options={{
          tabBarIcon: () => <IconA name="journal" size={22} color="#FAFAFA" />,
        }}
      />
      <AppBottomNavigator.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => <IconA name="settings" size={22} color="#FAFAFA" />,
        }}
      />
    </AppBottomNavigator.Navigator>
  );
};

export default BottomTabs;
