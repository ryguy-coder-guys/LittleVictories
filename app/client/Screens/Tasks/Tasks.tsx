import ProgressBar from '../Root/ProgressBar';
import TaskSummary from './TaskSummary';
import HabitSummary from './HabitSummary';
import React, { ReactElement, useState } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import {
  btnStyles,
  containerStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import { useUserContext } from '../../Contexts/userContext';
import bgImage from '../../../assets/images/blue-gradient.png';

const Tasks = (): ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUserContext();

  const updateIndex = (selectedIndex) => {
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
            buttons={['Tasks', 'Habits']}
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
          {selectedIndex === 0 ? <TaskSummary /> : <HabitSummary />}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Tasks;
