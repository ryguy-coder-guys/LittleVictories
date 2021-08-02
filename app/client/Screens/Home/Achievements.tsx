import React, { ReactElement } from 'react';
import { View, Image, Text } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import {
  badgeStyles,
  containerStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import { badges } from '../../badges';

const Achievements = (): ReactElement => {
  const { user } = useUserContext();

  return (
    <View style={containerStyles.section}>
      <Text style={user.readable_font ? textStyles.h2_big : textStyles.h2}>
        Achievements
      </Text>
      <View style={badgeStyles.container}>
        {user.achievements.map((achievement) => {
          return (
            <View style={badgeStyles.badges} key={getKey()}>
              <Image
                source={badges[achievement.achievement_type].source}
                style={badgeStyles.image}
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
      {user.achievements.length === 0 ? (
        <View>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            No achievements yet!
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Add or complete habits and tasks, follow friends, or level up to
            start earning badges.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Achievements;
