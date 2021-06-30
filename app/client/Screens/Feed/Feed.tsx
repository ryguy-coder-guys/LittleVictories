import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import ProgressBar from '../Root/ProgressBar';
import FeedView from './FeedView';

const Feed = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={bgImage}
    >
      <ProgressBar />
      <SafeAreaView>
        <FeedView />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Feed;
