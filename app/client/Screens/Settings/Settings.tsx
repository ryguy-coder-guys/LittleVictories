/* eslint-disable indent */
import React, { ReactElement } from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Switch
} from 'react-native';
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
import {
  alertStyles,
  btnStyles,
  containerStyles,
  journalStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import bgImage from '../../../assets/images/blue-gradient.png';
import ProgressBar from '../Root/ProgressBar';

const Settings = ({ navigation }): ReactElement => {
  const {
    user,
    setUser,
    setUserStat,
    setLevel,
    setNumHabits,
    setNumCompletedTasks,
    setNumFollowees,
    setIsLoggedIn
  } = useUserContext();
  const { getQuote } = useQuoteContext();
  const { setJournal, setJournals } = useJournalContext();
  const { socket } = useSocketContext();
  const { setFeed } = useFeedContext();

  interface Message {
    type: string;
    autoHide: boolean;
    backgroundColor: string;
    icon: string;
    position: string;
    message: string;
  }

  const displayMessage = (props = {}) => {
    const message: Message = {
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
    setIsLoggedIn(false);
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
      titleStyle: user.readable_font
        ? [alertStyles.title_big, { paddingTop: 30 }]
        : [alertStyles.title, { paddingTop: 30 }],
      style: alertStyles.bottomContainer,
      renderCustomContent: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            title='Cancel'
            style={journalStyles.alert_btn1}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={() => {
              hideMessage();
            }}
          />
          <Button
            title='Delete Account'
            style={[journalStyles.alert_btn2, { width: 140 }]}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={async () => {
              await axios.delete(
                `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/auth/${user.id}`
              );
              showMessage({
                message: 'User successfully deleted from Little Victories.',
                titleStyle: user.readable_font
                  ? alertStyles.title_big
                  : alertStyles.title,
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
    <ImageBackground style={containerStyles.bgImg} source={bgImage}>
      <ProgressBar />
      <SafeAreaView
        style={[containerStyles.fullScreenView, { justifyContent: 'center' }]}
      >
        <Text
          style={
            user.readable_font
              ? [textStyles.screenHeading_big, { marginBottom: 20 }]
              : [textStyles.screenHeading, { marginBottom: 20 }]
          }
        >
          Settings
        </Text>
        <View style={[containerStyles.section, containerStyles.center]}>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
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
            buttonStyle={[btnStyles.btn, { width: 130 }]}
            titleStyle={
              user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
            }
            onPress={() => {
              deleteUser();
            }}
          />
          <Button
            title='Log Out'
            buttonStyle={[btnStyles.btn, { width: 130 }]}
            titleStyle={
              user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
            }
            onPress={() => {
              logout();
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Settings;
