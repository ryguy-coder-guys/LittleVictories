/* eslint-disable indent */
import React, { useState, ReactElement } from 'react';
import { View, Button, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { containerStyles, textStyles } from '../../Stylesheets/Stylesheet';

import { useFeedContext } from '../../Contexts/feedContext';
import { useUserContext } from '../../Contexts/userContext';

import axios from 'axios';

const SingleFriend = ({ item, user, users, setUsers }): ReactElement => {
  const [isFriend, setIsFriend] = useState<boolean>(item.isFriend);
  const { feed, setFeed, refreshFeed } = useFeedContext();
  const { setNumFollowees } = useUserContext();

  const addFriend = async (id: string): Promise<void> => {
    try {
      const {
        data: { addSuccessful, numFollowees }
      } = await axios.post(
        'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/friends/',
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
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/friends/${user.id}/${id}`
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
    <View
      style={[
        containerStyles.section,
        { flexDirection: 'row', justifyContent: 'space-between' }
      ]}
    >
      <Text
        style={
          user.readable_font
            ? [textStyles.txt_big, { paddingTop: 5 }]
            : [textStyles.txt, { paddingTop: 5 }]
        }
      >
        {item.username}
      </Text>
      {!isFriend ? (
        <Button
          onPress={() => {
            void addFriend(item.id),
              showMessage({
                message: `Now following ${item.username}.`,
                titleStyle: {
                  fontSize: 20,
                  color: '#FAFAFA'
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
            void removeFriend(item.id),
              showMessage({
                message: `You are no longer following ${item.username}.`,
                titleStyle: {
                  fontSize: 20,
                  color: '#FAFAFA'
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

export default SingleFriend;
