import React, { ReactElement } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import { textStyles } from '../../Stylesheets/Stylesheet';

const Achievements = (): ReactElement => {
  const { user, numHabits, numCompletedTasks, numFollowees } = useUserContext();
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
        {user.level >= 1 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/ribbon_red.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              Level 1
            </Text>
          </View>
        ) : null}
        {user.level >= 5 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/ribbon_green.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              Level 5
            </Text>
          </View>
        ) : null}
        {user.level >= 10 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/ribbon_yellow.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              Level 10
            </Text>
          </View>
        ) : null}
        {numHabits >= 5 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/trophy_pink.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              5 Habits
            </Text>
          </View>
        ) : null}
        {numCompletedTasks >= 5 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/trophy_blue.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              5 Tasks
            </Text>
          </View>
        ) : null}
        {numFollowees >= 3 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/star_red.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              3 Friends
            </Text>
          </View>
        ) : null}
        {numFollowees >= 5 ? (
          <View style={styles.badges}>
            <Image
              source={require('../../../assets/images/star_green.png')}
              style={{
                resizeMode: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              5 Friends
            </Text>
          </View>
        ) : null}
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
    height: 115,
    width: 115,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
