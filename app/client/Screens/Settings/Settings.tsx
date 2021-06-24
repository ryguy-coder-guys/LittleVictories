/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Switch } from 'react-native-switch';
import AwesomeButton from 'react-native-really-awesome-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../Contexts/userContext';

const SettingsScreen = ({ navigation, route }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const bgImage = require('../../../assets/blue-gradient.png');
  const { setUser } = useUserContext();

  const logout = (): void => setUser(null);

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
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
        <Text></Text>
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
            logout();
            navigation.navigate('login');
          }}
        >
          Log Out
        </AwesomeButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginVertical: 12,
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
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
