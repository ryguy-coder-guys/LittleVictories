import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { useUserContext } from '../../Contexts/userContext';
import { progBarStyles } from '../../Stylesheets/Stylesheet';

const ProgressBar = (): ReactElement => {
  const { user } = useUserContext();
  if (!user) {
    return <View></View>;
  }
  const { points, level, username } = user;
  return (
    <View style={progBarStyles.main}>
      <View style={{ flexDirection: 'column' }}>
        <Text
          style={user.readable_font ? progBarStyles.txt_big : progBarStyles.txt}
        >
          {username}{' '}
        </Text>
        <Text
          style={user.readable_font ? progBarStyles.txt_big : progBarStyles.txt}
        >
          Level {level | 0}{' '}
        </Text>
      </View>
      <Progress.Bar
        animated={true}
        indeterminateAnimationDuration={500}
        progress={points / 100}
        width={210}
        height={17}
        borderRadius={5}
        style={progBarStyles.prog_bar}
      />
      <Text
        style={user.readable_font ? progBarStyles.txt_big : progBarStyles.txt}
      >
        {' '}
        {user.points}/100
      </Text>
    </View>
  );
};

export default ProgressBar;
