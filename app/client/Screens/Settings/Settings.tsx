/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Switch } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../Contexts/userContext';
import { useQuoteContext } from '../../Contexts/quoteContext';
import { useJournalContext } from '../../Contexts/journalContext';

const SettingsScreen = ({ navigation, route }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const bgImage = require('../../../assets/blue-gradient.png');
  const { setUser, setUserStats } = useUserContext();
  const { getQuote } = useQuoteContext();
  const { setJournal } = useJournalContext();

  const logout = (): void => {
    getQuote();
    setUser(null);
    setJournal(null);
  };



  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.value}>Push Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={'#FAFAFA'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text></Text>
        <AwesomeButton
          backgroundColor={'#1D426D'}
          textColor={'#FAFAFA'}
          height={50}
          width={125}
          raiseLevel={0}
          borderRadius={8}
          style={styles.button}
          onPress={() => {
            navigation.navigate('login');
          }}
        >
          Delete Account
        </AwesomeButton>
        <AwesomeButton
          backgroundColor={'#1D426D'}
          textColor={'#FAFAFA'}
          height={50}
          width={125}
          raiseLevel={0}
          borderRadius={8}
          style={styles.button}
          onPress={() => {
            logout();
            setUserStats(null);
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
  backgroundImage: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '50%',
    margin: 12,
    borderWidth: 1,
  },
  value: {
    color: '#1D426D',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SettingsScreen;
