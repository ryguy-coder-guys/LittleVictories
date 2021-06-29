import React from 'react';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useFeedContext } from '../../Contexts/feedContext';
import {
  Text,
  Button,
  View,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import Comment from './Comment';
import { v4 as getKey } from 'uuid';

const FeedItem = ({
  username,
  description,
  completed_at,
  id,
  likes,
  comments,
}) => {
  const { user } = useUserContext();
  const { feed, setFeed } = useFeedContext();

  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');

  const addLike = async (taskId: number) => {
    const { data: newLike } = await axios.post(
      'http://localhost:3000/api/likes/',
      {
        userId: user.id,
        taskId,
      }
    );
    if (newLike) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return { ...feedItem, likes: [...likes, newLike] };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
    }
  };

  const removeLike = async (taskId: number) => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/likes/${user.id}/${taskId}`
    );
    if (removeSuccessful) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return {
            ...feedItem,
            likes: likes.filter((like) => like.user_id !== user.id),
          };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
    }
  };

  const addComment = async () => {
    const { data: newComment } = await axios.post(
      'http://localhost:3000/api/comments',
      {
        user_id: user.id,
        task_id: id,
        content: commentText,
      }
    );
    if (newComment) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return { ...feedItem, comments: [...comments, newComment] };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      setCommentText('');
    }
  };

  const removeComment = async (commentId) => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/comments/${commentId}`
    );
    if (removeSuccessful) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return {
            ...feedItem,
            comments: comments.filter((comment) => comment.id !== commentId),
          };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
    }
  };

  const canLike = () => {
    if (user?.id) {
      return likes.reduce((canLike, like) => {
        if (like.user_id === user.id) {
          return false;
        }
        return canLike;
      }, true);
    }
  };

  return (
    <View style={styles.feedItemContainer}>
      <Text style={{ ...styles.text, fontWeight: 'bold' }}>{username}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>{completed_at}</Text>
      <Text style={styles.text}>{likes.length} likes</Text>
      <View style={styles.btnContainer}>
        <Button
          title={`${canLike() ? 'Add Like' : 'Remove Like'}`}
          onPress={() => (canLike() ? addLike(id) : removeLike(id))}
        />
        <Button
          title="Comment"
          onPress={() => setShowCommentInput(!showCommentInput)}
        />
      </View>
      {comments.length ? (
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment {...item} removeComment={removeComment} />
          )}
          keyExtractor={() => getKey()}
        />
      ) : null}
      {showCommentInput && (
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={setCommentText}
            value={commentText}
          />
          <Button
            title="Add Comment"
            onPress={() => {
              if (commentText.length) {
                addComment();
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedItemContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 90,
    paddingVertical: 13,
    borderRadius: 25,
    margin: 13,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
  },
  textInput: {
    width: 100,
    height: 33,
  },
});

export default FeedItem;
