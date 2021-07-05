import React, { useState, useEffect, ReactElement } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Button, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { v4 as getKey } from "uuid";
import filter from 'lodash.filter';
import id from 'date-fns/esm/locale/id/index.js';


const SingleFriend  = ({ item, user, users, setUsers }) => {
  const [isFriend, setIsFriend] = useState(item.isFriend)

  console.log(item.userName, 'line 13');
  const addFriend = async (id: string): Promise<void> => {
    try {
      const addSuccessful = await axios.post('http://localhost:3000/api/friends/', {
        userId: user.id,
        friendId: id,
      })
      if (addSuccessful) {
        const mappedUsers = users.map((currentUser) => {
          if (currentUser.id === item.id) {
            return { ...currentUser, isFriend: true }
          }
          return currentUser
        })
        setUsers(mappedUsers)
        setIsFriend(true);
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const removeFriend = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3000/api/friends/${user.id}/${id}`)
      const mappedUsers = users.map((currentUser) => {
        if (currentUser.id === item.id) {
          return { ...currentUser, isFriend: false }
        }
        return currentUser
      })
      setUsers(mappedUsers)
      setIsFriend(false);
    } catch (error) {
      console.warn(error)
    }
  }


  return (
    <View style={styles.textAreaContainer}>
      <View style={styles.metaInfo}>
        <Text style={styles.title}>{item.userName}</Text>
        {!isFriend ?
          <Button
            onPress={() => { addFriend(item.id), alert('Friend Added!') }}
            title="Add Friend"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          : null
        }
        {
          isFriend ?
            <Button
              onPress={() => { removeFriend(item.id), alert('Friend Removed') }}
              title="Remove Friend"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            : null
        }
      </View>
    </View>
  )
}



const Friends = (): ReactElement => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const { user } = useUserContext();

  const getAllUsers = () => {
    axios.get('http://localhost:3000/api/auth/users')
      .then(({ data }) => {
        //console.log(data, 'users');
        setFullData(data)
        setUsers(data)
        // console.log(fullData, 'line23')
      })
      .catch(err => console.warn(err, 'l'))
  }
  useEffect(() => {
    if (user) {
      getAllUsers()
    }
  }, [user])

  //The user's name is filtered from the state variable fullData while the state variable users stores the final results after the search to render the //////correct user.
  const handleSearch = (text) => {
    const filteredData = filter(fullData, user => {
      console.log(users, 'line 116')
      const itemData = user.userName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    setUsers(filteredData);
    setQuery(text);
  };

  const List = ({ query }) => {
    return (
      <FlatList
        keyExtractor={() => getKey()}
        data={users.filter(user => {
          return user.userName.includes(query)
        })}
        renderItem={({ item }) => <SingleFriend item={item} user={user} users={users} setUsers={setUsers} />}
      />
    )
  }

  return (
    <View >
      <Text style={styles.header}>Add Friends</Text>
      <TextInput
        autoCorrect={false}
        style={styles.textInput}
        onChangeText={setQuery}
        value={query}
        placeholder="Search" />
      <List query={query} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  header: {
    color: "#1D426D",
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
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
    backgroundColor: "#8ebac6",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  },
});

export default Friends;