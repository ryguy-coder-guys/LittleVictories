import React from 'react';
import { FlatList, View } from 'react-native';
import { v4 as getKey } from 'uuid';
import { useFeedContext } from '../../Contexts/feedContext';
import FeedItem from './FeedItem';

const FeedView = () => (
  <View
    style={{
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 25,
    }}
  >
    <FlatList
      data={useFeedContext().feed}
      renderItem={({ item }) => <FeedItem {...item} />}
      keyExtractor={() => getKey()}
    />
  </View>
);

export default FeedView;
