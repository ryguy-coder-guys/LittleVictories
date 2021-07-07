import React, { ReactElement, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import ProgressBar from '../Root/ProgressBar';
import FeedView from './FeedView';
import { ButtonGroup } from 'react-native-elements';
import Friends from './Friends';

const Feed = (): ReactElement => {
  const bgImage = require('../../../assets/blue-gradient.png');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = ['Feed', 'Followers'];

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{
            height: 40,
            borderRadius: 10,
            borderColor: '#5c83b1',
            marginTop: 20,
            marginLeft: 40,
            marginRight: 40
          }}
          selectedButtonStyle={{
            backgroundColor: '#5c83b1',
            borderColor: '#5c83b1'
          }}
          buttonStyle={{ backgroundColor: '#1D426D', borderColor: '#5c83b1' }}
          textStyle={{ fontSize: 16, color: '#ada6a6' }}
          innerBorderStyle={{ color: '#1D426D' }}
        />
        {selectedIndex === 0 ? <FeedView /> : <Friends />}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  scrollview: {
    textAlign: 'center',
    alignContent: 'center'
  },
  taskbarText: {
    fontSize: 18,
    color: '#1D426D'
  },
  taskbarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20
  }
});

export default Feed;
