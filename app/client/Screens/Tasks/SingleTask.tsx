import axios from 'axios';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import { useSocketContext } from '../../Contexts/socketContext';
import React, { useState } from 'react';
import {
  differenceInDays,
  differenceInWeeks,
  getDay,
  isThisWeek
} from 'date-fns';
import { textStyles } from '../../Stylesheets/Stylesheet';

const SingleTask = ({ item }) => {
  const { user, setUser } = useUserContext();
  const { socket } = useSocketContext();
  const [finished, setFinished] = useState(item.is_complete);
  const [taskPublic, setTaskPublic] = useState(item.is_public);

  const unshareTask = async () => {
    try {
      const { data: updateSuccessful } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/private`
      );
      if (!updateSuccessful) {
        return;
      }
      setTaskPublic(false);
      socket.emit('removeFromFeed', item);
    } catch (error) {
      console.warn(error);
    }
  };

  const shareTask = async () => {
    try {
      const { data: updateSuccessful } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/public`
      );
      if (!updateSuccessful) {
        return;
      }
      setTaskPublic(true);
      socket.emit('addToFeed', item);
    } catch (error) {
      console.warn(error);
    }
  };

  const markTaskComplete = async () => {
    try {
      const {
        data: { task, points, level }
      } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/complete`
      );
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: true };
        }
        return task;
      });
      setUser({ ...user, tasks: mappedTasks, points, level });
    } catch (error) {
      console.warn(error);
    }
  };

  const markTaskIncomplete = async () => {
    try {
      const {
        data: { points, level }
      } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/incomplete`
      );
      unshareTask();
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: false };
        }
        return task;
      });
      setUser({ ...user, tasks: mappedTasks, points, level });
    } catch (error) {
      console.warn(error);
    }
  };

  const removeTask = async () => {
    try {
      const { data: deleteSuccessful } = await axios.delete(
        `http://localhost:3000/api/tasks/${item.id}`
      );
      const filteredTasks = user.tasks.filter((task) => {
        return task.id !== item.id;
      });
      setUser({ ...user, tasks: filteredTasks });
    } catch (error) {
      console.warn(error);
    }
  };

  const fn = (date: Date) => {
    const days = {
      0: 'Monday',
      1: 'Tuesday',
      2: 'Wednesday',
      3: 'Thursday',
      4: 'Friday',
      5: 'Saturday',
      6: 'Sunday'
    };
    const dueDate = new Date(date);
    if (differenceInDays(dueDate, new Date()) <= 6) {
      return `due ${days[getDay(dueDate)]}${
        !isThisWeek(dueDate)
          ? ' ' + dueDate.getMonth() + '/' + dueDate.getDate()
          : ''
      }`;
    }
    return `due in ${differenceInWeeks(dueDate, new Date()) + 1} weeks`;
  };

  return (
    <View style={styles.task_view}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={user.readable_font ? textStyles.text_big : textStyles.text}
          onPress={() => {
            finished ? markTaskIncomplete() : markTaskComplete();
            setFinished(!finished);
          }}
        >
          {finished ? '✓ ' : '☐ '}
        </Text>
        <Text
          style={user.readable_font ? textStyles.text_big : textStyles.text}
        >
          {item.description} - {fn(item.due_date)}
        </Text>
      </View>
      <Button title='Remove' onPress={removeTask} />
      {finished && !taskPublic ? (
        <Button title='Add to Feed' onPress={shareTask} />
      ) : null}
      {finished && taskPublic ? (
        <Button title='Remove from Feed' onPress={unshareTask} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  task_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 10,
    flexWrap: 'wrap'
  }
});

export default SingleTask;
