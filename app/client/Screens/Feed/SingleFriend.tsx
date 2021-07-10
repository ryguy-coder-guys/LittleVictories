import React, { useState, ReactElement } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { showMessage } from 'react-native-flash-message';

import { useSocketContext } from '../../Contexts/socketContext';
import { useFeedContext } from '../../Contexts/feedContext';
import { useUserContext } from '../../Contexts/userContext';

import axios from 'axios';

const SingleFriend = ({ item, user, users, setUsers }): ReactElement => {
  const [isFriend, setIsFriend] = useState(item.isFriend);
  const { socket } = useSocketContext();
  const { feed, setFeed, refreshFeed } = useFeedContext();
  const { setNumFollowees } = useUserContext();

  const addFriend = async (id: string): Promise<void> => {
    try {
      const {
        data: { addSuccessful, numFollowees }
      } = await axios.post('http://localhost:3000/api/friends/', {
        userId: user.id,
        friendId: id
      });
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
        setNumFollowees(numFollowees);
        // socket.emit('addFriend', { userId: user.id, friendId: id });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const removeFriend = async (id: string): Promise<void> => {
    try {
      const {
        data: { deleteSuccessful, numFollowees }
      } = await axios.delete(
        `http://localhost:3000/api/friends/${user.id}/${id}`
      );
      if (deleteSuccessful) {
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
        setNumFollowees(numFollowees);
        // socket.emit('removeFriend', { userId: user.id, friendId: id });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.textAreaContainer}>
      <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
        {item.username}
      </Text>
      {!isFriend ? (
        <Button
          onPress={() => {
            addFriend(item.id),
              showMessage({
                message: `Now following ${item.username}.`,
                titleStyle: {
                  fontSize: 20,
                  color: '#FAFAFA',
                  alignSelf: 'center'
                },
                icon: { icon: 'success', position: 'left' },
                type: 'default',
                backgroundColor: '#1D426D'
              });
          }}
          title='Follow'
        />
      ) : (
        <Button
          onPress={() => {
            removeFriend(item.id),
              showMessage({
                message: `You are no longer following ${item.username}.`,
                titleStyle: {
                  fontSize: 20,
                  color: '#FAFAFA',
                  alignSelf: 'center'
                },
                icon: { icon: 'success', position: 'left' },
                type: 'default',
                backgroundColor: '#1D426D'
              });
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
