import React, { useState, useEffect, ReactElement } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { textStyles } from '../../Stylesheets/Stylesheet';
import FriendListView from './FriendListView';

const Friends = (): ReactElement => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useUserContext();

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
      .catch((err) => console.warn(err, 'l'));
  };

  // useEffect(() => {
  //   if (user.id.length) {
  //     getAllUsers();
  //   }
  // }, [user]);

  // const handleSearch = (text) => {
  //   const filteredData = filter(fullData, (user) => {
  //     const itemData = user.username.toUpperCase();
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });
  //   setUsers(filteredData);
  //   setQuery(text);
  // };

  return (
    <View style={styles.list}>
      <View style={styles.main}>
        <Text style={user.readable_font ? textStyles.h1_big : textStyles.h1}>
          User Search
        </Text>
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={setQuery}
          value={query}
          placeholder='Search'
        />
        <FriendListView
          query={query}
          user={user}
          users={users}
          setUsers={setUsers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '80%'
  },
  main: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  textInput: {
    height: 42,
    borderRadius: 8,
    backgroundColor: '#FFFF',
    padding: 10,
    fontSize: 18,
    color: '#1D426D',
    marginTop: 10
  }
});

export default Friends;
