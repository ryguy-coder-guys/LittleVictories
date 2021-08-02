import React, { ReactElement } from 'react';
import { FlatList } from 'react-native';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import SingleFriend from './SingleFriend';

const FriendListView = ({ query, user, users, setUsers }): ReactElement => {
  return (
    <FlatList
      keyExtractor={() => getKey()}
      data={users.filter((user) => {
        return user.username.toLowerCase().includes(query.toLowerCase());
      })}
      renderItem={({ item }) => (
        <SingleFriend
          item={item}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      )}
    />
  );
};

export default FriendListView;
