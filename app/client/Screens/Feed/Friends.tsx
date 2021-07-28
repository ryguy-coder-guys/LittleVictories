import React, { useState, useEffect, ReactElement } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Text, TextInput } from 'react-native';
import axios from 'axios';
import { inputStyles, textStyles } from '../../Stylesheets/Stylesheet';
import FriendListView from './FriendListView';

const Friends = (): ReactElement => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const { user, isLoggedIn } = useUserContext();

  const getAllUsers = () => {
    axios
      .get(`http://localhost:3000/api/auth/users/${user.id}`)
      .then(({ data }) => {
        setUsers(
          data.filter((users) => {
            return users.username !== user.username;
          })
        );
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllUsers();
    }
  }, [isLoggedIn]);

  return (
    <View>
      <Text
        style={
          user.readable_font
            ? textStyles.screenHeading_big
            : textStyles.screenHeading
        }
      >
        User Search
      </Text>
      <TextInput
        autoCorrect={false}
        style={user.readable_font ? inputStyles.input_big : inputStyles.input}
        onChangeText={setQuery}
        value={query}
        placeholder='Search'
        autoCapitalize={'none'}
      />
      <Text></Text>
      <FriendListView
        query={query}
        user={user}
        users={users}
        setUsers={setUsers}
      />
    </View>
  );
};

export default Friends;
