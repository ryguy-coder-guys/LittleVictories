/* eslint-disable indent */
import React, { useState, ReactElement } from 'react';
import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { useUserContext } from '../../Contexts/userContext';
import axios from 'axios';
import { format } from 'date-fns';
import { Button, Divider } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { UserStat } from '../../Interfaces/user';
import {
  btnStyles,
  containerStyles,
  imgStyles,
  inputStyles
} from '../../Stylesheets/Stylesheet';

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

interface DailyReflectionProps {
  setHasStats: (hasStats: boolean) => void;
}
const DailyReflection = ({
  setHasStats
}: DailyReflectionProps): ReactElement => {
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
        'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/stats',
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
      void submit();
    }
  };

  const handleFace = (value: string) => {
    setMood(value);
    setActiveIcon(value);
  };

  return (
    <View style={containerStyles.section}>
      <Text style={user.readable_font ? textStyles.h2_big : textStyles.h2}>
        Daily Reflection
      </Text>
      {hasSubmitted || userStat ? (
        <View>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Fill out your Daily Reflection data tomorrow for the most accurate
            Weekly Stats.
          </Text>
          <Divider
            orientation='horizontal'
            width={0.5}
            color={'#FAFAFA'}
            style={imgStyles.divider}
          />
          <Text style={user.readable_font ? textStyles.h3_big : textStyles.h3}>
            Today&apos;s Data:
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Hours of sleep: {userStat?.sleep_hours || sleepHours}
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Did you eat well?{' '}
            {didEatWell.length
              ? didEatWell
              : userStat?.eaten_well
              ? 'yes'
              : 'no'}
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Exercised?{' '}
            {didExercise.length
              ? didExercise
              : userStat?.exercised
              ? 'yes'
              : 'no'}
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Notes: {userStat?.notes || notes}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={user.readable_font ? textStyles.txt_big : textStyles.txt}
            >
              Mood:{' '}
            </Text>
            <TouchableOpacity>
              {userStat?.mood === 'great' ? (
                <Image source={excitedFace} style={imgStyles.smallIcon} />
              ) : null}
              {userStat?.mood === 'good' ? (
                <Image source={happyFace} style={imgStyles.smallIcon} />
              ) : null}
              {userStat?.mood === 'ok' ? (
                <Image source={neutralFace} style={imgStyles.smallIcon} />
              ) : null}
              {userStat?.mood === 'bad' ? (
                <Image source={sadFace} style={imgStyles.smallIcon} />
              ) : null}
              {userStat?.mood === 'terrible' ? (
                <Image source={angryFace} style={imgStyles.smallIcon} />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ alignItems: 'flex-start' }}>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            How many hours did you sleep last night?
          </Text>
          <TextInput
            style={
              user.readable_font ? inputStyles.input_big : inputStyles.input
            }
            onChangeText={setSleepHours}
            value={sleepHours}
            placeholder='Enter 0 - 24'
            autoCapitalize='none'
          />
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Did you eat well?
          </Text>
          <TextInput
            style={
              user.readable_font ? inputStyles.input_big : inputStyles.input
            }
            onChangeText={setDidEatWell}
            value={didEatWell}
            placeholder='yes or no'
            autoCapitalize='none'
          />
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Did you get any exercise?
          </Text>
          <TextInput
            style={
              user.readable_font ? inputStyles.input_big : inputStyles.input
            }
            onChangeText={setDidExercise}
            value={didExercise}
            placeholder='yes or no'
            autoCapitalize='none'
          />
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Daily Notes
          </Text>
          <View style={{ width: '100%' }}>
            <TextInput
              style={
                user.readable_font
                  ? [inputStyles.input_big, { paddingTop: 7 }]
                  : [inputStyles.input, { paddingTop: 7 }]
              }
              multiline
              value={notes}
              maxLength={200}
              onChangeText={setNotes}
              editable={true}
              placeholder='Enter notes here.'
            />
          </View>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            What&apos;s your mood?
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity onPress={() => handleFace('terrible')}>
              {activeIcon === 'terrible' ? (
                <Image source={angryFace} style={imgStyles.smallIcon} />
              ) : (
                <Image source={angryInactive} style={imgStyles.smallIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('bad')}>
              {activeIcon === 'bad' ? (
                <Image source={sadFace} style={imgStyles.smallIcon} />
              ) : (
                <Image source={sadInactive} style={imgStyles.smallIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('ok')}>
              {activeIcon === 'ok' ? (
                <Image source={neutralFace} style={imgStyles.smallIcon} />
              ) : (
                <Image source={neutralInactive} style={imgStyles.smallIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('good')}>
              {activeIcon === 'good' ? (
                <Image source={happyFace} style={imgStyles.smallIcon} />
              ) : (
                <Image source={happyInactive} style={imgStyles.smallIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFace('great')}>
              {activeIcon === 'great' ? (
                <Image source={excitedFace} style={imgStyles.smallIcon} />
              ) : (
                <Image source={excitedInactive} style={imgStyles.smallIcon} />
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
              buttonStyle={btnStyles.btn}
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

export default DailyReflection;
