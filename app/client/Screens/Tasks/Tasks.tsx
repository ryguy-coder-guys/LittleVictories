import ProgressBar from '../Root/ProgressBar';
import TaskSummary from '../Tasks/TaskSummary';
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView
} from 'react-native';

const Tasks = () => {
  const bgImage = require('../../../assets/blue-gradient.png');

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView>
        <TaskSummary></TaskSummary>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
})

export default Tasks;