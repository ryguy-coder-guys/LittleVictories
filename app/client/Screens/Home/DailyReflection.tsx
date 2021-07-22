/* eslint-disable indent */
import React, { useState, ReactElement } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { useUserContext } from '../../Contexts/userContext';
import axios from 'axios';
import { format } from 'date-fns';
import { Button, Divider } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

import angryFace from '../../../assets/images/emoticon-angry-outline.png';
import excitedFace from '../../../assets/images/emoticon-excited-outline.png';
import happyFace from '../../../assets/images/emoticon-happy-outline.png';
import neutralFace from '../../../assets/images/emoticon-neutral-outline.png';
import sadFace from '../../../assets/images/emoticon-sad-outline.png';

import angryInactive from '../../../assets/images/emoticon-angry-inactive.png';
import excitedInactive from '../../../assets/images/emoticon-excited-inactive.png';
import happyInactive from '../../../assets/images/emoticon-happy-inactive.png';
import neutralInactive from '../../../assets/images/emoticon-neutral-inactive.png';
import sadInactive from '../../../assets/images/emoticon-sad-inactive.png';

const DailyReflection = ({ setHasStats }): ReactElement => {
  const { user, userStat, setUserStat } = useUserContext();
  const [sleepHours, setSleepHours] = useState('');
  const [didEatWell, setDidEatWell] = useState('');
  const [didExercise, setDidExercise] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const submit = async (): Promise<void> => {
    try {
      interface ServerResponse {
        data: UserStat;
      }
      const response: ServerResponse = await axios.post(
        'http://localhost:3000/api/stats',
        {
          user_id: user.id,
          sleep_hours: parseInt(sleepHours),
          eaten_well: didEatWell === 'yes',
          exercised: didExercise === 'yes',
          notes: notes,
          mood: mood,
          date: format(new Date(), 'MM-dd-yyyy')
        }
      );
      const { data } = response;
      setUserStat({
        id: data.id,
        sleep_hours: data.sleep_hours,
        eaten_well: data.eaten_well,
        exercised: data.exercised,
        notes: data.notes,
        mood: data.mood,
        date: data.date
      });
      setHasSubmitted(true);
      setHasStats(true);
    } catch (err) {
      console.warn('had issues posting stats');
    }
  };

  const handleSubmit = () => {
    if (parseInt(sleepHours) < 0 || parseInt(sleepHours) > 24) {
      showMessage({
        message: 'Form Error',
        titleStyle: { fontSize: 18, color: '#FAFAFA' },
        description: 'Please enter a valid amount of hours slept (0-24).',
        textStyle: { fontSize: 20, color: '#FAFAFA' },
        icon: { icon: 'warning', position: 'left' },
        type: 'default',
        backgroundColor: '#fc9c94'
      });
    } else if (
      didEatWell !== 'yes' &&
      didEatWell !== '' &&
      didEatWell !== 'no'
    ) {
      showMessage({
        message: 'Form Error',
        titleStyle: { fontSize: 18, color: '#FAFAFA' },
        description:
          "Please enter a response valid response for 'Did you eat well?' (yes or no).",
        textStyle: { fontSize: 20, color: '#FAFAFA' },
        icon: { icon: 'warning', position: 'left' },
        type: 'default',
        backgroundColor: '#fc9c94'
      });
    } else if (
      didExercise !== 'yes' &&
      didExercise !== '' &&
      didExercise !== 'no'
    ) {
      showMessage({
        message: 'Form Error',
        titleStyle: { fontSize: 18, color: '#FAFAFA' },
        description:
          "Please enter a response valid response for 'Did you get any exercise?' (yes or no).",
        textStyle: { fontSize: 20, color: '#FAFAFA' },
        icon: { icon: 'warning', position: 'left' },
        type: 'default',
        backgroundColor: '#fc9c94'
      });
    } else {
      submit();
    }
  };

  const handleFace = (value: string) => {
    setMood(value);
    setActiveIcon(value);
  };

  return (
    <View style={styles.view}>
      <Text
        style={[
          user.readable_font ? textStyles.h2_big : textStyles.h2,
          { marginBottom: 10 }
        ]}
      >
        Daily Reflection
      </Text>
      {hasSubmitted || userStat ? (
        <View>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Fill out your Daily Reflection data tomorrow for the most accurate
            Weekly Stats.
          </Text>
          <Divider
            orientation='horizontal'
            width={0.5}
            color={'#FAFAFA'}
            style={{
              width: '100%',
              marginTop: 15
            }}
          />
          <Text
            style={[
              user.readable_font ? textStyles.h3_big : textStyles.h3,
              { marginTop: 15 }
            ]}
          >
            Today&apos;s Data:
          </Text>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Hours of sleep: {userStat?.sleep_hours || sleepHours}
          </Text>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Did you eat well?{' '}
            {didEatWell.length
              ? didEatWell
              : userStat?.eaten_well
              ? 'yes'
              : 'no'}
          </Text>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Exercised?{' '}
            {didExercise.length
              ? didExercise
              : userStat?.exercised
              ? 'yes'
              : 'no'}
          </Text>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Notes: {userStat?.notes || notes}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[
                user.readable_font ? textStyles.txt_big : textStyles.txt,
                { marginTop: 10 }
              ]}
            >
              Mood:{' '}
            </Text>
            <TouchableOpacity>
              {userStat?.mood === 'great' ? (
                <Image source={excitedFace} style={styles.image} />
              ) : null}
              {userStat?.mood === 'good' ? (
                <Image source={happyFace} style={styles.image} />
              ) : null}
              {userStat?.mood === 'ok' ? (
                <Image source={neutralFace} style={styles.image} />
              ) : null}
              {userStat?.mood === 'bad' ? (
                <Image source={sadFace} style={styles.image} />
              ) : null}
              {userStat?.mood === 'terrible' ? (
                <Image source={angryFace} style={styles.image} />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ alignItems: 'flex-start' }}>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            How many hours did you sleep last night?
          </Text>
          <TextInput
            style={user.readable_font ? styles.inputLarger : styles.input}
            onChangeText={setSleepHours}
            value={sleepHours}
            placeholder='Enter 0 - 24'
            autoCapitalize='none'
          />
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Did you eat well?
          </Text>
          <TextInput
            style={user.readable_font ? styles.inputLarger : styles.input}
            onChangeText={setDidEatWell}
            value={didEatWell}
            placeholder='yes or no'
            autoCapitalize='none'
          />
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Did you get any exercise?
          </Text>
          <TextInput
            style={user.readable_font ? styles.inputLarger : styles.input}
            onChangeText={setDidExercise}
            value={didExercise}
            placeholder='yes or no'
            autoCapitalize='none'
          />
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            Daily Notes
          </Text>
          <View style={{ width: '100%' }}>
            <TextInput
              style={
                user.readable_font
                  ? styles.multi_inputLarger
                  : styles.multi_input
              }
              multiline
              numberOfLines={4}
              value={notes}
              maxLength={250}
              onChangeText={setNotes}
              editable={true}
              placeholder='Enter notes here.'
            />
          </View>
          <Text
            style={[
              user.readable_font ? textStyles.txt_big : textStyles.txt,
              { marginTop: 10 }
            ]}
          >
            What&apos;s your mood?
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={() => handleFace('terrible')}>
              {activeIcon === 'terrible' ? (
                <Image source={angryFace} style={styles.image} />
              ) : (
                <Image source={angryInactive} style={styles.image} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('bad')}>
              {activeIcon === 'bad' ? (
                <Image source={sadFace} style={styles.image} />
              ) : (
                <Image source={sadInactive} style={styles.image} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('ok')}>
              {activeIcon === 'ok' ? (
                <Image source={neutralFace} style={styles.image} />
              ) : (
                <Image source={neutralInactive} style={styles.image} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('good')}>
              {activeIcon === 'good' ? (
                <Image source={happyFace} style={styles.image} />
              ) : (
                <Image source={happyInactive} style={styles.image} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('great')}>
              {activeIcon === 'great' ? (
                <Image source={excitedFace} style={styles.image} />
              ) : (
                <Image source={excitedInactive} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              title='Submit'
              buttonStyle={styles.button}
              titleStyle={
                user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
              }
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    color: '#FAFAFA'
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5c83b1'
  },
  image: {
    resizeMode: 'contain',
    width: 35,
    height: 35
  },
  inactiveIcon: {
    color: '#9b9a9a'
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    padding: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18
  },
  inputLarger: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    padding: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  },
  multi_input: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    padding: 10,
    paddingTop: 10,
    maxWidth: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18
  },
  multi_inputLarger: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    padding: 10,
    paddingTop: 10,
    maxWidth: '100%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  },
  view: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    padding: 20
  }
});

export default DailyReflection;
