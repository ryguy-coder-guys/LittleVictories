import React, { ReactElement, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import Loading from '../Root/Loading';
import ProgressBar from '../Root/ProgressBar';
import { containerStyles } from '../../Stylesheets/Stylesheet';
import Achievements from './Achievements';
import WeeklyStats from './WeeklyStats';
import DailyReflection from './DailyReflection';
import UpcomingTasks from './UpcomingTasks';

const Home = (): ReactElement => {
  const { user, userStat } = useUserContext();
  const bgImage = require('../../../assets/images/blue-gradient.png');
  const [hasStats, setHasStats] = useState(userStat || user.userStats.length);

  if (!user) {
    return <Loading />;
  }
  return (
    <ImageBackground style={containerStyles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView>
          <View style={styles.view}>
            <UpcomingTasks />
            <DailyReflection setHasStats={setHasStats} />
            {hasStats ? <WeeklyStats /> : null}
            <Achievements />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingTop: 20
  }
});

export default Home;
