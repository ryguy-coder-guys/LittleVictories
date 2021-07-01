import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Button, Text } from 'react-native';
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

export default Friends;