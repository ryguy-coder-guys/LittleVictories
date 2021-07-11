import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, ImageBackground, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import { useUserContext } from '../../Contexts/userContext';
import { useQuoteContext } from '../../Contexts/quoteContext';
import { useJournalContext } from '../../Contexts/journalContext';
import { UserDefaultValues } from '../../Contexts/userContext';
import { useFeedContext } from '../../Contexts/feedContext';
import { useSocketContext } from '../../Contexts/socketContext';
import moment from 'moment';
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { FeedDefaultValues } from '../../Contexts/feedContext';

const Settings = ({ navigation }): ReactElement => {
  const bgImage = require('../../../assets/images/blue-gradient.png');
  const {
    user,
    setUser,
    setUserStat,
    setLevel,
    setNumHabits,
    setNumCompletedTasks,
    setNumFollowees,
    setLevelBadges,
    setNumCompletedTasksBadges,
    setNumFolloweesBadges,
    setNumHabitsBadges
  } = useUserContext();
  const { getQuote } = useQuoteContext();
  const { setJournal, setJournals } = useJournalContext();
  const { socket } = useSocketContext();
  const { setFeed } = useFeedContext();

  const displayMessage = (props = {}) => {
    const message: any = {
      type: 'default',
      autoHide: false,
      backgroundColor: '#1D426D',
      icon: 'warning',
      position: 'bottom',
      message:
        'Are you sure?\n\nOnce deleted, you can no longer access this account and all associated information will be lost forever.',
      ...props
    };

    showMessage(message);
  };

  const logout = (): void => {
    getQuote();
    socket.emit('loggedOut', user.id);
    setFeed(FeedDefaultValues.feed);
    setUser(UserDefaultValues.user);
    setJournal({ content: '', date: moment().format('MM-D-Y') });
    setJournals([]);
    setUserStat(UserDefaultValues.userStat);
    setLevel(0);
    setNumFollowees(0);
    setNumHabits(0);
    setNumCompletedTasks(0);
    setLevelBadges({});
    setNumCompletedTasksBadges({});
    setNumFolloweesBadges({});
    setNumHabitsBadges({});
    navigation.navigate('login');
  };

  const changeUserAccessibilityOption = async () => {
    if (user.readable_font) {
      try {
        await axios.patch(
          `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/font/${user.id}/toggleOff`
        );
      } catch (err) {
        console.warn('toggle readableFont off client side error');
      }
    } else {
      try {
        await axios.patch(
          `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/font/${user.id}/toggleOn`
        );
      } catch (err) {
        console.warn('toggle readableFont on client side error');
      }
    }
  };

  const deleteUser = (): void => {
    displayMessage({
      titleStyle: {
        fontSize: 20,
        color: '#FAFAFA',
        paddingTop: 30,
        textAlign: 'center'
      },
      style: {
        width: '100%',
        borderRadius: 0,
        paddingRight: 40
      },
      renderCustomContent: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            title='Cancel'
            style={[styles.button, { width: 100, marginTop: 25 }]}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={() => {
              hideMessage();
            }}
          />
          <Button
            title='Delete Account'
            style={[
              styles.button,
              { marginLeft: 15, width: 170, marginTop: 25 }
            ]}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={async () => {
              await axios.delete(
                `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/auth/${user.id}`
              );
              showMessage({
                message: 'User successfully deleted from Little Victories.',
                titleStyle: {
                  fontSize: 20,
                  color: '#FAFAFA',
                  alignSelf: 'center'
                },
                icon: { icon: 'success', position: 'left' },
                type: 'default',
                backgroundColor: '#1D426D'
              });
              logout();
            }}
          />
        </View>
      )
    });
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
            deleteUser();
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

export default Settings;
