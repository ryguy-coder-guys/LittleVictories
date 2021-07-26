import React, { ReactElement } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import { containerStyles, textStyles } from '../../Stylesheets/Stylesheet';
import { v4 as getKey } from 'uuid';
import { badges } from '../../badges';

const Achievements = (): ReactElement => {
  const { user } = useUserContext();

  return (
    <View style={containerStyles.section}>
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
  }
});

export default Achievements;
