import React, { ReactElement } from 'react';
import { FlatList, View, Text } from 'react-native';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import { useFeedContext } from '../../Contexts/feedContext';
import { useUserContext } from '../../Contexts/userContext';
import { textStyles } from '../../Stylesheets/Stylesheet';
import FeedItem from './FeedItem';

const FeedView = (): ReactElement => {
  const { feed } = useFeedContext();
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
        Feed
      </Text>
      <FlatList
        data={feed}
        renderItem={({ item }) => <FeedItem {...item} />}
        keyExtractor={() => getKey()}
        style={{ height: '81%' }}
      />
    </View>
  );
};

export default FeedView;
