import React from 'react';
import { useUserContext } from '../../Contexts/userContext';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { textStyles } from '../../Stylesheets/Stylesheet';
import minusIcon from '../../../assets/images/minus-circle-outline.png';

const Comment = ({ id, content, user_id, username, removeComment }) => {
  const { user } = useUserContext();

  const canRemove = () => {
    if (user?.id) {
      return user_id === user.id;
    }
    return false;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {canRemove() && (
        <TouchableOpacity onPress={() => removeComment(id)}>
          <Image
            source={minusIcon}
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 25
            }}
          />
        </TouchableOpacity>
      )}
      <Text style={user.readable_font ? textStyles.h3_big : textStyles.h3}>
        {' '}
        {username} -{' '}
      </Text>
      <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
        {content}
      </Text>
    </View>
  );
};

export default Comment;
