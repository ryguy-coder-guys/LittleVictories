import ProgressBar from '../Root/ProgressBar';
import CurrentJournal from './CurrentJournal';
import PastJournals from './PastJournals';
import React, { ReactElement, useState } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useUserContext } from '../../Contexts/userContext';
import {
  btnStyles,
  containerStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import bgImage from '../../../assets/images/blue-gradient.png';

const Journals = (): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUserContext();

  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <ImageBackground style={containerStyles.bgImg} source={bgImage}>
      <ProgressBar />
      <SafeAreaView>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={['Current', 'Previous']}
          containerStyle={btnStyles.BG}
          selectedButtonStyle={btnStyles.BG_active}
          buttonStyle={btnStyles.BG_inactive}
          textStyle={
            user.readable_font
              ? textStyles.disabledBtnTxt_big
              : textStyles.disabledBtnTxt
          }
          innerBorderStyle={{ color: '#1D426D' }}
        />
        {selectedIndex === 0 ? (
          <CurrentJournal />
        ) : (
          <View>
            <PastJournals />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Journals;
