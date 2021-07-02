import React, { useState, useEffect, ReactElement } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Button, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { v4 as getKey } from "uuid";
import filter from 'lodash.filter';

const Friends = () : ReactElement => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const { user } = useUserContext();


  const getAllUsers =  async () : Promise<void> => {
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
    const handleSearch = (text) => {
      //const formattedQuery = query.toUpperCase();
      const filteredData = filter(fullData, user => {
        //return contains(user, formattedQuery);
        const itemData = user.username.toUpperCase();
        const textData = text.toUpperCase();
        //return user.username.toUpperCase().includes(formattedQuery)
        return itemData.indexOf(textData) > -1
      });
      setUsers(filteredData);
      setQuery(text);
    };


    return(
      <View >
      <Text style={styles.header}>Add Friends</Text>
      <TextInput
         style={styles.textInput}
         onChangeText={(text) => handleSearch(text)}
         value={query}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
      <FlatList
        keyExtractor={() => getKey()}
        data={users}
        renderItem={({ item }) => (
          <View style={styles.textAreaContainer}>
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