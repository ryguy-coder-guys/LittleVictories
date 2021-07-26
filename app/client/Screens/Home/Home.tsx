import React, { ReactElement, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import Loading from '../Root/Loading';
import ProgressBar from '../Root/ProgressBar';
import { containerStyles } from '../../Stylesheets/Stylesheet';
import Achievements from './Achievements';
import WeeklyStats from './WeeklyStats';
import DailyReflection from './DailyReflection';
import UpcomingTasks from './UpcomingTasks';
import bgImage from '../../../assets/images/blue-gradient.png';

const Home = (): ReactElement => {
  const { user, userStat } = useUserContext();
  const [hasStats, setHasStats] = useState<boolean>(
    !!userStat || !!user.userStats.length
  );

  if (!user) {
    return <Loading />;
  }
  return (
    <ImageBackground style={containerStyles.bgImg} source={bgImage}>
      <ProgressBar />
      <SafeAreaView>
        <ScrollView>
          <View style={containerStyles.fullScreenView}>
            <UpcomingTasks />
            <DailyReflection setHasStats={setHasStats} />
            {hasStats ? <WeeklyStats /> : null}
            <Achievements />
            <View style={{ height: 70 }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;
