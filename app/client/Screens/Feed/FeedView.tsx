import React from 'react';
import { FlatList, View } from 'react-native';
import { v4 as getKey } from 'uuid';
import { useFeedContext } from '../../Contexts/feedContext';
import FeedItem from './FeedItem';

const FeedView = () => {
  const { feed } = useFeedContext();
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 25,
      }}
    >
      <FlatList
        data={feed}
        renderItem={({ item }) => <FeedItem {...item} />}
        keyExtractor={() => getKey()}
      />
    </View>
  );
};

export default FeedView;
