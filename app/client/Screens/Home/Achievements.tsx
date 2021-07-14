import React, { ReactElement } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { v4 as getKey } from 'uuid';

export const badges = {
  levelOne: {
    text: 'Level 1',
    source: require('../../../assets/images/ribbon_red1.png')
  },
  levelFive: {
    text: 'Level 5',
    source: require('../../../assets/images/ribbon_green.png')
  },
  levelTen: {
    text: 'Level 10',
    source: require('../../../assets/images/ribbon_yellow.png')
  },
  fiveHabits: {
    text: '5 Habits',
    source: require('../../../assets/images/trophy_pink.png')
  },
  fiveTasks: {
    text: '5 Tasks',
    source: require('../../../assets/images/trophy_blue.png')
  },
  threeFollowees: {
    text: '3 Followers',
    source: require('../../../assets/images/star_red.png')
  },
  fiveFollowees: {
    text: '5 Followers',
    source: require('../../../assets/images/star_green.png')
  }
};

const Achievements = (): ReactElement => {
  const { user } = useUserContext();

  return (
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
        {user.achievements.map((achievement) => {
          return (
            <View style={styles.badges} key={getKey()}>
              <Image
                source={badges[achievement.achievement_type].source}
                style={styles.image}
              />
              <Text
                style={user.readable_font ? textStyles.txt_big : textStyles.txt}
              >
                {badges[achievement.achievement_type].text}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge_container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  badges: {
    height: 125,
    width: 125,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
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

export default Achievements;
