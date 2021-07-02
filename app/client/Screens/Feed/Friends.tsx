import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Button, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { v4 as getKey } from "uuid";
import filter from 'lodash.filter';

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const getAllUsers = async () => {
    await axios.get('http://localhost:3000/api/auth/users')
    .then(({data}) => {
       console.log(data, 'users');
        setUsers(data)
        setFullData(data)
    } )
    .catch(err => console.warn(err))
  }
    useEffect(() => {
      getAllUsers()
      //console.log(fullData, 'llll')
    }, [])

    //The user's name is filtered from the state variable fullData while the state variable users stores the final results after the search to render the //////correct user.
    const handleSearch = text => {
      const formattedQuery = text.toUpperCase();
      const filteredData = filter(fullData, user => {
        return contains(user, formattedQuery);
      });
      setUsers(filteredData);
      setQuery(text);
    };

    //The contains handler method is going to look for the query. It accepts two parameters, the first and last name of the user and the formatted query to lowercase from handleSearch().
    const contains = ({ username }, query) => {
      //const { username } = name;
      //console.log(username, 'yoyoyo')
      // if (first.includes(query) || last.includes(query) || email.includes(query)) {
      //   return true;
      // }
      console.log(username, 'yoyoy')
      if (username.toUpperCase().includes(query)) {
        return true;
      }
      return false;
    };


    const renderHeader = () => {
      return (
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            marginVertical: 10,
            borderRadius: 20
          }}
        >
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
            placeholder="Search"
            style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
          />
        </View>
      );
    }

    return(
      <View style={styles.container}>
      <Text style={styles.text}>Add Friends</Text>
      <FlatList
       ListHeaderComponent={renderHeader}
        keyExtractor={() => getKey()}
        data={users}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {/* <Image
              source={{ uri: item.picture.thumbnail }}
              style={styles.coverImage}
            /> */}
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{item.username}</Text>
              <Button
                onPress={() => {alert("Friend Added!")}}
                title="Add Friend"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
              <Button
                onPress={() => {alert("Friend Removed")}}
                title="Remove Friend"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        )}
      />
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
});

export default Friends;