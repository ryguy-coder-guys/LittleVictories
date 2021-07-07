import React, { useState, useEffect, ReactElement } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import {
  View,
  Button,
  Text,
  FlatList,
  StyleSheet,
  TextInput
} from 'react-native';
import axios from 'axios';
import { v4 as getKey } from 'uuid';
import { textStyles } from '../../Stylesheets/Stylesheet';

const SingleFriend = ({ item, user, users, setUsers }) => {
  const [isFriend, setIsFriend] = useState(item.isFriend);

  const addFriend = async (id: string): Promise<void> => {
    try {
      const addSuccessful = await axios.post(
        'http://localhost:3000/api/friends/',
        {
          userId: user.id,
          friendId: id
        }
      );
      if (addSuccessful) {
        const mappedUsers = users.map((currentUser) => {
          if (currentUser.id === item.id) {
            return { ...currentUser, isFriend: true };
          }
          return currentUser;
        });
        setIsFriend(true);
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const removeFriend = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3000/api/friends/${user.id}/${id}`);
      const mappedUsers = users.map((currentUser) => {
        if (currentUser.id === item.id) {
          return { ...currentUser, isFriend: false };
        }
        return currentUser;
      });
      setIsFriend(false);
      setUsers(mappedUsers);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.textAreaContainer}>
      <Text style={user.readable_font ? textStyles.text_big : textStyles.text}>
        {item.userName}
      </Text>
      {!isFriend ? (
        <Button
          onPress={() => {
            addFriend(item.id), alert('Friend Added!');
          }}
          title='Add Friend'
        />
      ) : (
        <Button
          onPress={() => {
            removeFriend(item.id), alert('Friend Removed');
          }}
          title='Remove Friend'
        />
      )}
    </View>
  );
};

const Friends = (): ReactElement => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useUserContext();

  const getAllUsers = () => {
    axios
      .get('http://localhost:3000/api/auth/users')
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.warn(err, 'l'));
  };

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [user]);

  const List = ({ query }) => {
    return (
      <FlatList
        keyExtractor={() => getKey()}
        data={users.filter((user) => {
          return user.userName.includes(query);
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

  return (
    <View style={styles.main}>
      <Text style={user.readable_font ? textStyles.h1_big : textStyles.h1}>
        Add Friends
      </Text>
      <TextInput
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={setQuery}
        value={query}
        placeholder='Search'
      />
      <List query={query} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    padding: 20
  },
  main: {
    margin: 20
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20
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
