import React from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import { useSocketContext } from '../../Contexts/socketContext';
import { useFeedContext } from '../../Contexts/feedContext';
import Comment from './Comment';
import axios from 'axios';
import { v4 as getKey } from 'uuid';
import { textStyles } from '../../Stylesheets/Stylesheet';

const FeedItem = ({
  username,
  description,
  completed_at,
  id,
  likes,
  comments
}) => {
  const { user } = useUserContext();
  const { feed, setFeed } = useFeedContext();
  const { socket } = useSocketContext();

  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');

  const addLike = async (taskId: number): Promise<void> => {
    const { data: newLike } = await axios.post(
      'http://localhost:3000/api/likes/',
      {
        userId: user.id,
        taskId
      }
    );
    if (newLike) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return { ...feedItem, likes: [...feedItem.likes, newLike] };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      socket.emit('addLike', newLike);
    }
  };

  const removeLike = async (taskId: number): Promise<void> => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/likes/${user.id}/${taskId}`
    );
    if (removeSuccessful) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          const filteredLikes = feedItem.likes.filter((like) => {
            return !(like.task_id === taskId && like.user_id === user.id);
          });
          return { ...feedItem, likes: filteredLikes };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      socket.emit('removeLike', taskId);
    }
  };

  const addComment = async (): Promise<void> => {
    const { data: newComment } = await axios.post(
      'http://localhost:3000/api/comments',
      {
        user_id: user.id,
        task_id: id,
        content: commentText
      }
    );
    if (newComment) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return { ...feedItem, comments: [...feedItem.comments, newComment] };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      socket.emit('addComment', newComment);
    }
  };

  const removeComment = async (commentId: number): Promise<void> => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/comments/${commentId}`
    );
    if (removeSuccessful) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          const filteredComments = feedItem.comments.filter((comment) => {
            return comment.id !== commentId;
          });
          return { ...feedItem, comments: filteredComments };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      socket.emit('removeComment', id);
    }
  };

  const canLike = () => {
    if (user?.id) {
      return likes?.reduce((canLike, like) => {
        if (like.user_id === user.id) {
          return false;
        }
        return canLike;
      }, true);
    }
  };

  const formatDate = (date) => {
    if (date) {
      const dateArr = date.split('-');
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ];
      let output = `${months[parseInt(dateArr[1]) - 1]} ${parseInt(
        dateArr[2]
      )}, ${dateArr[0]}`;
      return output;
    }
  };

  return (
    <View style={styles.feedItemContainer}>
      <Text
        style={
          user.readable_font
            ? [textStyles.text_big, { fontWeight: 'bold' }]
            : [textStyles.text, { fontWeight: 'bold' }]
        }
      >
        {username}
      </Text>
      <Text style={user.readable_font ? textStyles.text_big : textStyles.text}>
        {description}
      </Text>
      <Text style={user.readable_font ? textStyles.text_big : textStyles.text}>
        Completed on: {formatDate(completed_at)}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => (canLike() ? addLike(id) : removeLike(id))}
        >
          {!canLike() || (username === user.username && likes?.length) ? (
            <Image
              source={require('../../../assets/images/heart.png')}
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 25
              }}
            />
          ) : (
            <Image
              source={require('../../../assets/images/heart-outline.png')}
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 25
              }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={user.readable_font ? textStyles.text_big : textStyles.text}
        >
          {' '}
          {likes?.length}
        </Text>
      </View>
      {comments?.length ? (
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment {...item} removeComment={removeComment} />
          )}
          keyExtractor={() => getKey()}
        />
      ) : null}
      <View style={styles.btnContainer}>
        {username !== user.username && (
          <Button
            title='Add Comment'
            onPress={() => setShowCommentInput(!showCommentInput)}
          />
        )}
      </View>
      {showCommentInput && (
        <View>
          <TextInput
            style={
              user.readable_font
                ? [styles.textInput, { fontSize: 20 }]
                : styles.textInput
            }
            onChangeText={setCommentText}
            value={commentText}
          />
          <Button
            title='Submit'
            onPress={() => {
              if (commentText.length) {
                addComment();
              }
            }}
          />
          <Button
            title='Cancel'
            onPress={() => {
              setCommentText('');
              setShowCommentInput(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedItemContainer: {
    backgroundColor: '#8ebac6',
    padding: 20,
    margin: 15,
    width: 335,
    borderRadius: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#9ec5cf',
    fontSize: 18,
    color: '#1D426D'
  }
});

export default FeedItem;
