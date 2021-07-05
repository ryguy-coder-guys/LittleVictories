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
import { containerStyles, textStyles } from '../../Stylesheets/Stylesheet';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

class SleepHoursChart extends React.PureComponent {
  render() {
    const data = [5, 6, 8, 6.5, 8, 7, 9];
    const days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

    const axesSvg = { fontSize: 16, fill: '#1D426D' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    return (
      <View>
        <Text style={textStyles.text}>Hours of Sleep</Text>
        <View style={{ height: 200, flexDirection: 'row', marginTop: 15 }}>
          <YAxis
            data={data}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ flex: 1 }}
              data={data}
              contentInset={verticalContentInset}
              svg={{ stroke: '#3e6188', fill: '#1D426D' }}
            >
              <Grid />
            </BarChart>
            <XAxis
              style={{
                marginHorizontal: 10,
                height: xAxisHeight,
                marginTop: 10
              }}
              data={data}
              formatLabel={(value, index) => days[index]}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
    <ImageBackground style={containerStyles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
        <ScrollView>
          <View style={styles.view}>
            <Text
              style={[
                user.readable_font ? textStyles.h2_big : textStyles.h2,
                { marginBottom: 10 }
              ]}
            >
              Upcoming Tasks
            </Text>
            {user.tasks?.slice(0, 5).map((task) => {
              return (
                <View style={styles.task} key={getKey()}>
                  <Text
                    style={
                      user.readable_font ? textStyles.text_big : textStyles.text
                    }
                  >
                    {task.description} - {task.due_date}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.view}>
            <Text
              style={[
                user.readable_font ? textStyles.h2_big : textStyles.h2,
                { marginBottom: 10 }
              ]}
            >
              Daily Reflection
            </Text>
            {hasSubmitted || userStats ? (
              <View>
                <Text
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
                >
                  Fill out your Daily Reflection data tomorrow for the most
                  accurate Weekly Stats.
                </Text>
                <Text
                  style={[
                    user.readable_font ? textStyles.h3_big : textStyles.h3,
                    { marginTop: 15 }
                  ]}
                >
                  Today's Data:
                </Text>
                <Text
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
                >
                  Hours of sleep: {userStats?.sleep_hours || sleepHours}
                </Text>
                <Text
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
                >
                  Did you eat well?{' '}
                  {userStats?.eaten_well ? 'yes' : 'no' || didEatWell}
                </Text>
                <Text
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
                >
                  Exercised?{' '}
                  {userStats?.exercised ? 'yes' : 'no' || didExercise}
                </Text>
                <Text
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
                >
                  Notes: {userStats?.notes || notes}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      user.readable_font
                        ? textStyles.text_big
                        : textStyles.text,
                      { marginTop: 10 }
                    ]}
                  >
                    Mood:{' '}
                  </Text>
                  {userStats?.mood ? getIcon(userStats?.mood) : getIcon(mood)}
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'flex-start' }}>
                <Text
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
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
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
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
                  style={[
                    user.readable_font ? textStyles.text_big : textStyles.text,
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
                    user.readable_font ? textStyles.text_big : textStyles.text,
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
                    user.readable_font ? textStyles.text_big : textStyles.text,
                    { marginTop: 10 }
                  ]}
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
                        ? textStyles.buttonText_big
                        : textStyles.buttonText
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
              style={[
                user.readable_font ? textStyles.h2_big : textStyles.h2,
                { marginBottom: 10 }
              ]}
            >
              Weekly Stats
            </Text>
            <SleepHoursChart />
          </View>
          <View style={styles.view}>
            <Text
              style={[
                user.readable_font ? textStyles.h2_big : textStyles.h2,
                { marginBottom: 10 }
              ]}
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
                      user.readable_font ? textStyles.text_big : textStyles.text
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
                      user.readable_font ? textStyles.text_big : textStyles.text
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
                      user.readable_font ? textStyles.text_big : textStyles.text
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
  button: {
    marginTop: 20,
    backgroundColor: '#1D426D'
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
