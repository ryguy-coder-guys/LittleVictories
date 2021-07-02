import React from "react";
import axios from "axios";
import { useUserContext } from "../../Contexts/userContext";
import { useFeedContext } from "../../Contexts/feedContext";
import { useSocketContext } from "../../Contexts/socketContext";
import {
  Text,
  Button,
  View,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import Comment from "./Comment";
import { v4 as getKey } from "uuid";

const FeedItem = ({
  username,
  description,
  completed_at,
  id,
  likes,
  comments,
}) => {
  const { user } = useUserContext();
  const { socket } = useSocketContext();

  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const addLike = async (taskId: number) => {
    const { data: newLike } = await axios.post(
      "http://localhost:3000/api/likes/",
      {
        userId: user.id,
        taskId,
      }
    );
    if (newLike) {
      socket.emit("addLike", newLike);
    }
  };

  const removeLike = async (taskId: number) => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/likes/${user.id}/${taskId}`
    );
    if (removeSuccessful) {
      socket.emit("removeLike", taskId);
    }
  };

  const addComment = async () => {
    const { data: newComment } = await axios.post(
      "http://localhost:3000/api/comments",
      {
        user_id: user.id,
        task_id: id,
        content: commentText,
      }
    );
    if (newComment) {
      socket.emit("addComment", newComment);
    }
  };

  const removeComment = async (commentId) => {
    const { data: removeSuccessful } = await axios.delete(
      `http://localhost:3000/api/comments/${commentId}`
    );
    if (removeSuccessful) {
      socket.emit("removeComment", id);
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

  return (
    <View style={styles.feedItemContainer}>
      <Text style={{ ...styles.text, fontWeight: "bold" }}>{username}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>{completed_at}</Text>
      <Text style={styles.text}>{likes?.length} likes</Text>
      <View style={styles.btnContainer}>
        <Button
          title={`${canLike() ? "Add Like" : "Remove Like"}`}
          onPress={() => (canLike() ? addLike(id) : removeLike(id))}
        />
        <Button
          title="Comment"
          onPress={() => setShowCommentInput(!showCommentInput)}
        />
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
      {showCommentInput && (
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={setCommentText}
            value={commentText}
          />
          <Button
            title="Submit"
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
    backgroundColor: "#8ebac6",
    padding: 20,
    margin: 15,
    width: 335,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    color: "#1D426D",
  },
  textInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "#9ec5cf",
    fontSize: 18,
    color: "#1D426D",
  },
});

export default FeedItem;
