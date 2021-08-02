import React from 'react';
import {
  Button,
  FlatList,
  Image,
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
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import {
  badgeStyles,
  containerStyles,
  imgStyles,
  inputStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import { badges } from '../../badges';
import heartOutline from '../../../assets/images/heart-outline.png';
import fullHeart from '../../../assets/images/heart.png';

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
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/achievements/comment',
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
      `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/achievements/comment/${commentId}`
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
    const { data: newLike } = await axios.post(
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/achievements/like',
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
    const { data: removeSuccessful } = await axios.delete(
      `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/achievements/like/${user.id}/${id}`
    );
    if (removeSuccessful) {
      const mappedFeed = feed.map((feedItem) => {
        if (feedItem.id === id && feedItem.description === description) {
          const filteredLikes = feedItem.likes.filter((like) => {
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
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/likes/',
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
      `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/likes/${user.id}/${taskId}`
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
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/comments',
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
      `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/comments/${commentId}`
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

  const formatDate = (date: string) => {
    if (date) {
      const dateArr: string[] = date.split('-');
      const months: string[] = [
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
      <View style={containerStyles.section}>
        <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
          {username} has earned a new achievement badge!
        </Text>
        <Text style={user.readable_font ? textStyles.h3_big : textStyles.h3}>
          {badges[description].text}
        </Text>
        <View style={badgeStyles.feed_badge}>
          <Image
            source={badges[description].source}
            style={badgeStyles.feed_image}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {username === user.username ? (
            <Image source={fullHeart} style={imgStyles.xsIcon} />
          ) : (
            <TouchableOpacity
              onPress={() =>
                canLike() ? addAchievementLike() : removeAchievementLike()
              }
            >
              <Image
                source={canLike() ? heartOutline : fullHeart}
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
        <View style={badgeStyles.container}>
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
                user.readable_font ? inputStyles.input_big : inputStyles.input
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
    <View style={containerStyles.section}>
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
          <Image source={fullHeart} style={imgStyles.xsIcon} />
        ) : (
          <TouchableOpacity
            onPress={() => (canLike() ? addLike(id) : removeLike(id))}
          >
            <Image
              source={canLike() ? heartOutline : fullHeart}
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
      <View>
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
              user.readable_font ? inputStyles.input_big : inputStyles.input
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

export default FeedItem;
