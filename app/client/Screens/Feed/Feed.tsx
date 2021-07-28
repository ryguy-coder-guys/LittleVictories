import React, { ReactElement, useState } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import ProgressBar from '../Root/ProgressBar';
import FeedView from './FeedView';
import { ButtonGroup } from 'react-native-elements';
import Friends from './Friends';
import { btnStyles, containerStyles } from '../../Stylesheets/Stylesheet';
import bgImage from '../../../assets/images/blue-gradient.png';

const Feed = (): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex: number): void => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <ImageBackground style={containerStyles.bgImg} source={bgImage}>
      <ProgressBar />
      <SafeAreaView>
        <View style={containerStyles.fullScreenView}>
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={['Feed', 'Friends']}
            containerStyle={btnStyles.BG}
            selectedButtonStyle={btnStyles.BG_active}
            buttonStyle={btnStyles.BG_inactive}
            textStyle={{ fontSize: 16, color: '#ada6a6' }}
            innerBorderStyle={{ color: '#1D426D' }}
          />
          {selectedIndex === 0 ? <FeedView /> : <Friends />}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Feed;
