import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import List from './PastJournalsList';
import { textStyles } from '../../Stylesheets/Stylesheet';

const Journal = (): ReactElement => {
  const { user } = useUserContext();

  return (
    <View>
      <Text
        style={
          user.readable_font
            ? textStyles.screenHeading_big
            : textStyles.screenHeading
        }
      >
        Previous Journals
      </Text>
      <List />
    </View>
  );
};

export default Journal;
