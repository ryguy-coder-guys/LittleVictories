import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import axios from 'axios';
import Loading from '../Root/Loading';
import { v4 as getKey } from 'uuid';
import { format } from 'date-fns';
import FaceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../Root/ProgressBar';
import { Button } from 'react-native-elements';

const Home = () => {
  const { user, userStats } = useUserContext();
  const bgImage = require('../../../assets/blue-gradient.png');
  const [sleepHours, setSleepHours] = useState('');
  const [didEatWell, setDidEatWell] = useState('');
  const [didExercise, setDidExercise] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [activeIcon, setActiveIcon] = useState(null);

  const submitStats = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/stats', {
        user_id: user.id,
        sleep_hours: sleepHours,
        eaten_well: didEatWell === 'yes',
        exercised: didExercise === 'yes',
        notes: notes,
        mood: mood,
        date: format(new Date(), 'MM-dd-yyyy')
      });
    } catch (err) {
      console.warn('had issues posting stats (client)');
    }
  };

  const handleSubmit = () => {
    submitStats();
    setHasSubmitted(true);
  };

  const handleFace = (value) => {
    setMood(value);
    setActiveIcon(value);
  };

  const getIcon = (mood) => {
    const icons = {
      great: 'emoticon-excited-outline',
      good: 'emoticon-happy-outline',
      ok: 'emoticon-neutral-outline',
      bad: 'emoticon-sad-outline',
      terrible: 'emoticon-angry-outline'
    };
    return <FaceIcon name={icons[mood]} size={35} color='#FAFAFA' />;
  };

  if (!user) {
    return <Loading />;
  }
  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        <ScrollView>
          <View style={styles.view}>
            <Text
              style={user.readable_font ? styles.headingLarger : styles.heading}
            >
              Upcoming Tasks
            </Text>
            {user.tasks?.slice(0, 5).map((task) => {
              return (
                <View style={styles.task} key={getKey()}>
                  <Text
                    style={user.readable_font ? styles.descLarger : styles.desc}
                  >
                    {task.description} - {task.due_date}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.view}>
            <Text
              style={user.readable_font ? styles.headingLarger : styles.heading}
            >
              Daily Reflection
            </Text>
            {hasSubmitted || userStats ? (
              <View>
                <Text
                  style={user.readable_font ? styles.textLarger : styles.text}
                >
                  Fill out your Daily Reflection data tomorrow for the most
                  accurate Weekly Stats.
                </Text>
                <Text
                  style={
                    user.readable_font
                      ? styles.subheaderLarger
                      : styles.subheader
                  }
                >
                  Today's Data:
                </Text>
                <Text
                  style={user.readable_font ? styles.textLarger : styles.text}
                >
                  Hours of sleep: {userStats?.sleep_hours || sleepHours}
                </Text>
                <Text
                  style={user.readable_font ? styles.textLarger : styles.text}
                >
                  Did you eat well?{' '}
                  {userStats?.eaten_well ? 'yes' : 'no' || didEatWell}
                </Text>
                <Text
                  style={user.readable_font ? styles.textLarger : styles.text}
                >
                  Exercised?{' '}
                  {userStats?.exercised ? 'yes' : 'no' || didExercise}
                </Text>
                <Text
                  style={user.readable_font ? styles.textLarger : styles.text}
                >
                  Notes: {userStats?.notes || notes}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={user.readable_font ? styles.textLarger : styles.text}
                  >
                    Mood:{' '}
                  </Text>
                  {userStats?.mood ? getIcon(userStats?.mood) : getIcon(mood)}
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={
                    user.readable_font ? styles.promptLarger : styles.prompt
                  }
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
                  style={
                    user.readable_font ? styles.promptLarger : styles.prompt
                  }
                >
                  Did you skip any meals?
                </Text>
                <TextInput
                  style={user.readable_font ? styles.inputLarger : styles.input}
                  onChangeText={setDidEatWell}
                  value={didEatWell}
                  placeholder='yes or no'
                  autoCapitalize='none'
                />
                <Text
                  style={
                    user.readable_font ? styles.promptLarger : styles.prompt
                  }
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
                  style={
                    user.readable_font ? styles.promptLarger : styles.prompt
                  }
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
                  style={
                    user.readable_font ? styles.promptLarger : styles.prompt
                  }
                >
                  What's your mood?
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <FaceIcon
                    name='emoticon-angry-outline'
                    onPress={() => handleFace('terrible')}
                    size={35}
                    style={
                      activeIcon === 'terrible'
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name='emoticon-sad-outline'
                    onPress={() => handleFace('bad')}
                    size={35}
                    style={
                      activeIcon === 'bad'
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name='emoticon-neutral-outline'
                    onPress={() => handleFace('ok')}
                    size={35}
                    style={
                      activeIcon === 'ok'
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name='emoticon-happy-outline'
                    onPress={() => handleFace('good')}
                    size={35}
                    style={
                      activeIcon === 'good'
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
                  <FaceIcon
                    name='emoticon-excited-outline'
                    onPress={() => handleFace('great')}
                    size={35}
                    style={
                      activeIcon === 'great'
                        ? styles.activeIcon
                        : styles.inactiveIcon
                    }
                  />
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
                      user.readable_font
                        ? styles.buttonTextLarger
                        : styles.buttonText
                    }
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.view}>
            <Text
              style={user.readable_font ? styles.headingLarger : styles.heading}
            >
              Weekly Stats
            </Text>
          </View>
          <View style={styles.view}>
            <Text
              style={user.readable_font ? styles.headingLarger : styles.heading}
            >
              Achievements
            </Text>
            <View style={styles.badge_container}>
              {user.level >= 1 ? (
                <View style={styles.badges}>
                  <Image
                    source={require('../../../assets/badge.png')}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  <Text
                    style={
                      user.readable_font
                        ? styles.badgeTextLarger
                        : styles.badgeText
                    }
                  >
                    Level 1
                  </Text>
                </View>
              ) : null}
              {user.level >= 5 ? (
                <View style={styles.badges}>
                  <Image
                    source={require('../../../assets/badge.png')}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  <Text
                    style={
                      user.readable_font
                        ? styles.badgeTextLarger
                        : styles.badgeText
                    }
                  >
                    Level 5
                  </Text>
                </View>
              ) : null}
              {user.level >= 10 ? (
                <View style={styles.badges}>
                  <Image
                    source={require('../../../assets/badge.png')}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                  <Text
                    style={
                      user.readable_font
                        ? styles.badgeTextLarger
                        : styles.badgeText
                    }
                  >
                    Level 10
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  badge_container: {
    flexDirection: 'row'
  },
  badges: {
    height: 80,
    width: 80,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: '#1D426D',
    fontSize: 16
  },
  badgeTextLarger: {
    color: '#1D426D',
    fontSize: 18
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1D426D'
  },
  buttonText: {
    fontSize: 18
  },
  buttonTextLarger: {
    fontSize: 20
  },
  desc: {
    color: '#1D426D',
    fontSize: 18
  },
  descLarger: {
    color: '#1D426D',
    fontSize: 20
  },
  heading: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  headingLarger: {
    color: '#1D426D',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  activeIcon: {
    color: '#FAFAFA'
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
  task: {
    paddingTop: 10
  },
  prompt: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 10,
    fontSize: 18
  },
  promptLarger: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 10,
    fontSize: 20
  },
  subheader: {
    color: '#1D426D',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15
  },
  subheaderLarger: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15
  },
  text: {
    color: '#1D426D',
    fontSize: 18,
    marginTop: 10
  },
  textLarger: {
    color: '#1D426D',
    fontSize: 20,
    marginTop: 10
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
export default Home;
