import React, { useState, ReactElement } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { useSocketContext } from '../../Contexts/socketContext';
import { useFeedContext } from '../../Contexts/feedContext';

const SingleFriend = ({ item, user, users, setUsers }): ReactElement => {
  const [isFriend, setIsFriend] = useState(item.isFriend);
  const { socket } = useSocketContext();
  const { feed, setFeed, refreshFeed } = useFeedContext();

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
        refreshFeed();
        const mappedUsers = users.map((currentUser) => {
          if (currentUser.id === item.id) {
            return { ...currentUser, isFriend: true };
          }
          return currentUser;
        });
        setIsFriend(true);
        setUsers(mappedUsers);
        // socket.emit('addFriend', { userId: user.id, friendId: id });
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
      const filteredFeed = feed.filter(
        (feedItem) => feedItem.username !== item.username
      );
      setIsFriend(false);
      setUsers(mappedUsers);
      setFeed(filteredFeed);
      // socket.emit('removeFriend', { userId: user.id, friendId: id });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.textAreaContainer}>
      <Text style={user.readable_font ? textStyles.text_big : textStyles.text}>
        {item.username}
      </Text>
      {!isFriend ? (
        <Button
          onPress={() => {
            addFriend(item.id), alert('Friend Added!');
          }}
          title='Follow'
        />
      ) : (
        <Button
          onPress={() => {
            removeFriend(item.id), alert('Friend Removed');
          }}
          title='Unfollow'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  }
});

export default SingleFriend;
