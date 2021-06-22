import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IconA from 'react-native-vector-icons/Ionicons';
import IconB from 'react-native-vector-icons/FontAwesome5';
import Journal from '../Journal/Journal';
import HomeTopTab  from '../Home/Home';


const AppBottomNavigator = createMaterialBottomTabNavigator();

const BottomTabs = () => {

  return (
    <AppBottomNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarColor: '#25b3df'
      }}
    >
      <AppBottomNavigator.Screen
        name="Home"
        children={HomeTopTab}
        options={{
          tabBarIcon: () => <IconA name="home" size={25} color="#fff" />
        }}
      />
      <AppBottomNavigator.Screen
        name="Tasks"
        children={HomeTopTab}
        options={{
          tabBarIcon: () => <IconB name="tasks" size={25} color="#fff" />
        }}
      />
      <AppBottomNavigator.Screen
        name="Journal"
        children={Journal}
        options={{
          tabBarIcon: () => <IconA name="journal" size={25} color="#fff" />
        }}
      />

    </AppBottomNavigator.Navigator>
  );
};

export default BottomTabs;
