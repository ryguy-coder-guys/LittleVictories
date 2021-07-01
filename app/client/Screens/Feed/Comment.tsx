import React from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { View, Button, Text } from 'react-native';

const Comment = ({ id, content, user_id, removeComment }) => {
  const { user } = useUserContext();

  const canRemove = () => {
    if (user?.id) {
      return user_id === user.id;
    }
    return false;
  };

  return (
    <View>
      <Text>
        {content} -- {user_id}
      </Text>
      {canRemove() && (
        <Button onPress={() => removeComment(id)} title="Remove Comment" />
      )}
    </View>
  );
};

export default Comment;
