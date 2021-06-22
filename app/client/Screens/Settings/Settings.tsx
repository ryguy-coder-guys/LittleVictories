/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Switch } from 'react-native-switch';
import AwesomeButton from 'react-native-really-awesome-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation, route}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (

    <View style={styles.container}>
      <Text style={styles.value}>Settings</Text>
      <Text style={styles.value}>Push Notifications</Text>
      <Switch
        style={styles.switch}
        circleActiveColor={'#9ee7ff'}
        circleInActiveColor={'#f4f3f4'}
        backgroundActive={'rgb(7, 40, 82)'}
        backgroundInactive={'rgb(7, 40, 82)'}
        switchLeftPx={5}
        switchRightPx={5}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <AwesomeButton
        style={styles.button}
        width={200}
        height={50}
        onPress={() => {
          navigation.navigate('login');
        }}
      >
      Delete Account
      </AwesomeButton>
      <AwesomeButton
        style={styles.button}
        width={200}
        height={50}
        progress
        onPress={() => {
          navigation.navigate('login');
        }}
      >
      Log Out
      </AwesomeButton>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  value: {
    marginVertical: 12
  },
  button: {
    marginBottom: '10%',
  },
  switch: {
    marginBottom: '30%',
  },
  input: {
    height: 40,
    width: '50%',
    margin: 12,
    borderWidth: 1,
  }
});

export default SettingsScreen;
