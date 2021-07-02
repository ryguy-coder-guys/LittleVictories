import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput
} from 'react-native';
import axios from 'axios';
import filter from 'lodash.filter';
import { v4 as getKey } from "uuid";

const SearchBar = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    await axios.get('http://localhost:3000/api/auth/users')
    .then(({data}) => {
       console.log(data, 'users');
        setUsers(data)
    } )
    .catch(err => console.warn(err))
  }
    useEffect(() => {
      getAllUsers()
      console.log(users, 'llll')
    }, [])

    return(
      <View style={styles.container}>
      <Text style={styles.text}>Add Friends</Text>
      <FlatList
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

export default SearchBar;