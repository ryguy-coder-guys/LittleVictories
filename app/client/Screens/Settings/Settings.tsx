/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Switch } from 'react-native';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useQuoteContext } from '../../Contexts/quoteContext';
import { useJournalContext } from '../../Contexts/journalContext';
import moment from 'moment';
import { Button } from 'react-native-elements';

const SettingsScreen = ({ navigation }) => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const { user, setUser, setUserStats } = useUserContext();
  const { getQuote } = useQuoteContext();
  const { setJournal, setJournals } = useJournalContext();

  const logout = (): void => {
    getQuote();
    setUser(null);
    setJournal({ content: '', date: moment().format('MM-D-Y') });
    setJournals([]);
  };

  const changeUserAccessibilityOption = async () => {
    if (user.readable_font) {
      try {
        await axios.patch(
          `http://localhost:3000/api/font/${user.id}/toggleOff`
        );
      } catch (err) {
        console.warn('toggle readableFont off client side error');
      }
    } else {
      try {
        await axios.patch(`http://localhost:3000/api/font/${user.id}/toggleOn`);
      } catch (err) {
        console.warn('toggle readableFont on client side error');
      }
    }
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <Text style={user.readable_font ? styles.headerLarger : styles.header}>
          Settings
        </Text>
        <Text style={user.readable_font ? styles.valueLarger : styles.value}>
          Readable Font: {user.readable_font ? 'On' : 'Off'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={'#FAFAFA'}
          onValueChange={async () => {
            await setUser({ ...user, readable_font: !user.readable_font });
            changeUserAccessibilityOption();
          }}
          value={user.readable_font}
        />
        <Button
          title='Delete Account'
          buttonStyle={styles.button}
          titleStyle={
            user.readable_font ? styles.buttonTextLarger : styles.buttonText
          }
          onPress={() => {
            navigation.navigate('login');
          }}
        />
        <Button
          title='Log Out'
          buttonStyle={styles.button}
          titleStyle={
            user.readable_font ? styles.buttonTextLarger : styles.buttonText
          }
          onPress={() => {
            logout();
            setUserStats(null);
            navigation.navigate('login');
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#1D426D',
    width: 125
  },
  buttonText: {
    fontSize: 18
  },
  buttonTextLarger: {
    fontSize: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  headerLarger: {
    color: '#1D426D',
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    width: '50%',
    margin: 12,
    borderWidth: 1
  },
  value: {
    color: '#1D426D',
    fontSize: 18,
    marginBottom: 10
  },
  valueLarger: {
    color: '#1D426D',
    fontSize: 20,
    marginBottom: 10
  }
});

export default SettingsScreen;
