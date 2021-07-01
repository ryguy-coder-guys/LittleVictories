import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Button, Text, FlatList, StyleSheet, } from 'react-native';
import axios from 'axios';

const Friends = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    await axios.get('http://localhost:3000/api/auth/users')
    .then(({data}) => {
      // console.log(data, 'users');
        setUsers(data)
    } )
    .catch(err => console.warn(err))

    useEffect(() => {
      getAllUsers()
    }, [])
}

    return(
      <View style={styles.container}>
      <Text style={styles.text}>Favorite Contacts</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.first}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {/* <Image
              source={{ uri: item.picture.thumbnail }}
              style={styles.coverImage}
            /> */}
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{`${item.username} ${
                item.username
              }`}</Text>
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