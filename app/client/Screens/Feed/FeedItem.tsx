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
import { badges } from '../../badges';

const FeedItem = ({
  username,
  description,
  completed_at,
  id,
  likes,
  comments,
  isAchievement
}) => {
  const { user } = useUserContext();
  const {
    feed,
    setFeed,
    commentingId,
    setCommentingId,
    commentingText: currentCommentText,
    setCommentingText
  } = useFeedContext();
  const { socket } = useSocketContext();

  const [showCommentInput, setShowCommentInput] = React.useState(
    username === user.id ? false : commentingId === id
  );
  const [commentText, setCommentText] = React.useState(
    username === user.id ? '' : commentingId === id ? currentCommentText : ''
  );

  const addAchievementComment = async () => {
    const { data: newAchievementComment } = await axios.post(
      'http://localhost:3000/api/achievements/comment',
      {
        userId: user.id,
        achievementId: id,
        content: commentText
      }
    );
    if (newAchievementComment) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id) {
          return {
            ...feedItem,
            comments: [...feedItem.comments, newAchievementComment]
          };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      setCommentingId(0);
      setCommentingText('');
      socket.emit('addAchievementComment', newAchievementComment);
    }
  };

  const removeAchievementComment = async (commentId: number) => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/achievements/comment/${commentId}`
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
      socket.emit('removeAchievementComment', id);
    }
  };

  const addAchievementLike = async () => {
    console.log('in add achievement like');
    const { data: newLike } = await axios.post(
      'http://localhost:3000/api/achievements/like',
      {
        userId: user.id,
        achievementId: id
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
      socket.emit('addAchievementLike', newLike);
    }
  };

  const removeAchievementLike = async () => {
    console.log('in remove  achievement like');
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/achievements/like/${user.id}/${id}`
    );
    if (removeSuccessful) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id && feedItem.description === description) {
          const filteredLikes = feedItem.likes.filter((like) => {
            console.log(like);

            return !(like.user_id === user.id);
          });
          return { ...feedItem, likes: filteredLikes };
        }
        return feedItem;
      });
      setFeed(mappedFeed);
      socket.emit('removeAchievementLike', id);
    }
  };

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
      setCommentingId(0);
      setCommentingText('');
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
      const output = `${months[parseInt(dateArr[1]) - 1]} ${parseInt(
        dateArr[2]
      )}, ${dateArr[0]}`;
      return output;
    }
  };

  if (isAchievement) {
    return (
      <View style={styles.feedItemContainer}>
        <View style={styles.badges}>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            {username}
          </Text>
          <Image source={badges[description].source} style={styles.image} />
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            {badges[description].text}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {username === user.username ? (
            <Image
              source={require('../../../assets/images/heart.png')}
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 25
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() =>
                canLike() ? addAchievementLike() : removeAchievementLike()
              }
            >
              <Image
                source={
                  canLike()
                    ? require('../../../assets/images/heart-outline.png')
                    : require('../../../assets/images/heart.png')
                }
                style={{
                  resizeMode: 'contain',
                  width: 25,
                  height: 25
                }}
              />
            </TouchableOpacity>
          )}
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            {' '}
            {likes?.length}
          </Text>
        </View>
        {comments?.length ? (
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <Comment
                {...item}
                removeComment={() => removeAchievementComment(item.id)}
              />
            )}
            keyExtractor={() => getKey()}
          />
        ) : null}
        <View style={styles.btnContainer}>
          {username !== user.username && (
            <Button
              title='Add Comment'
              onPress={() => {
                if (showCommentInput) {
                  setCommentingId(0);
                  setCommentingText('');
                  setShowCommentInput(false);
                } else {
                  setCommentingId(id);
                  setCommentingText('');
                  setShowCommentInput(true);
                }
              }}
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
              onChangeText={(text) => {
                setCommentText(text);
                setCommentingText(text);
              }}
              value={commentText}
              autoFocus={commentingId === id}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Button
                title='Cancel'
                onPress={() => {
                  setCommentText('');
                  setCommentingId(0);
                  setCommentingText('');
                  setShowCommentInput(false);
                }}
              />
              <Button
                title='Submit'
                onPress={() => {
                  if (commentText.length) {
                    addAchievementComment();
                  }
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.feedItemContainer}>
      <Text
        style={
          user.readable_font
            ? [textStyles.txt_big, { fontWeight: 'bold' }]
            : [textStyles.txt, { fontWeight: 'bold' }]
        }
      >
        {username}
      </Text>
      <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
        {description}
      </Text>
      <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
        Completed on: {formatDate(completed_at)}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        {username === user.username ? (
          <Image
            source={require('../../../assets/images/heart.png')}
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 25
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => (canLike() ? addLike(id) : removeLike(id))}
          >
            <Image
              source={
                canLike()
                  ? require('../../../assets/images/heart-outline.png')
                  : require('../../../assets/images/heart.png')
              }
              style={{
                resizeMode: 'contain',
                width: 25,
                height: 25
              }}
            />
          </TouchableOpacity>
        )}
        <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
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
            onPress={() => {
              if (showCommentInput) {
                setCommentingId(0);
                setCommentingText('');
                setShowCommentInput(false);
              } else {
                setCommentingId(id);
                setCommentingText('');
                setShowCommentInput(true);
              }
            }}
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
            onChangeText={(text) => {
              setCommentText(text);
              setCommentingText(text);
            }}
            value={commentText}
            autoFocus={commentingId === id}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button
              title='Cancel'
              onPress={() => {
                setCommentText('');
                setCommentingId(0);
                setCommentingText('');
                setShowCommentInput(false);
              }}
            />
            <Button
              title='Submit'
              onPress={() => {
                if (commentText.length) {
                  addComment();
                }
              }}
            />
          </View>
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
    color: '#1D426D',
    borderRadius: 8
  },
  badges: {
    height: 125,
    width: 125,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  }
});

export default FeedItem;
