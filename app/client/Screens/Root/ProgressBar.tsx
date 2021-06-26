import React from 'react';
import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useUserContext } from '../../Contexts/userContext';

const ProgressBar = () => {
  const {
    user: { points, level },
  } = useUserContext();
  return (
    <Progress.Bar
      animated={true}
      indeterminateAnimationDuration={500}
      progress={points / 100}
      width={300}
      height={13}
      borderRadius={5}
      style={styles.progressBar}
    />
  );
};

const styles = StyleSheet.create({
  progressBar: {
    alignSelf: 'center'
  }
});

export default ProgressBar;
