import React, { useState, useEffect, ReactElement } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { v4 as getKey } from 'uuid';
import filter from 'lodash.filter';
import id from 'date-fns/esm/locale/id/index.js';
import FriendListView from './FriendListView'

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

  const handleSearch = (text) => {
    const filteredData = filter(fullData, (user) => {
      const itemData = user.userName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setUsers(filteredData);
    setQuery(text);
  };


  return (
    <View>
      <Text style={styles.header}>Add Friends</Text>
      <TextInput
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={setQuery}
        value={query}
        placeholder='Search'
      />
      <FriendListView query={query} user={user} users={users} setUsers={setUsers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  metaInfo: {
    marginLeft: 10
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
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
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF'
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
});

export default Friends;
