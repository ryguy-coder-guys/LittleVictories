import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch
} from 'react-native';

import { useUserContext } from '../../Contexts/userContext';
import { useSocketContext } from '../../Contexts/socketContext';
import { useFeedContext } from '../../Contexts/feedContext';

import axios from 'axios';
import {
  differenceInDays,
  differenceInWeeks,
  getDay,
  isThisWeek
} from 'date-fns';

import { textStyles } from '../../Stylesheets/Stylesheet';

const SingleTask = ({ item }) => {
  const { user, setUser, setLevel, setNumCompletedTasks } = useUserContext();
  const { socket } = useSocketContext();
  const { feed, setFeed } = useFeedContext();
  const [finished, setFinished] = useState(item.is_complete);
  const [taskPublic, setTaskPublic] = useState(item.is_public);

  const unshareTask = async (): Promise<void> => {
    try {
      const { data: updateSuccessful } = await axios.patch(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/${item.id}/private`
      );
      if (updateSuccessful) {
        setTaskPublic(false);
        setFeed(feed.filter((feedItem) => feedItem.id !== item.id));
        socket.emit('removeFromFeed', item.id);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shareTask = async (): Promise<void> => {
    try {
      const { data: updateSuccessful } = await axios.patch(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/${item.id}/public`
      );
      if (updateSuccessful) {
        setTaskPublic(true);
        setFeed([updateSuccessful, ...feed]);
        socket.emit('addToFeed', item);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const markTaskComplete = async (): Promise<void> => {
    try {
      const currentLevel = user.level;
      const {
        data: { task, points, level, numCompletedTasks }
      } = await axios.patch(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/${item.id}/complete`
      );
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: true };
        }
        return task;
      });
      new Promise((resolve) => {
        if (currentLevel !== level) {
          setLevel(level);
          setTimeout(() => resolve(true), 5000);
        } else {
          resolve(true);
        }
      }).then(() => {
        setNumCompletedTasks(numCompletedTasks);
      });
      setUser({ ...user, tasks: mappedTasks, points, level });
    } catch (error) {
      console.warn(error);
    }
  };

  const markTaskIncomplete = async (): Promise<void> => {
    try {
      const currentLevel = user.level;
      const {
        data: { points, level, numCompletedTasks }
      } = await axios.patch(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/${item.id}/incomplete`
      );
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: false, is_public: false };
        }
        return task;
      });
      // setFinished(false);
      if (currentLevel !== level) {
        setLevel(level);
      }
      setNumCompletedTasks(numCompletedTasks);
      setUser({ ...user, tasks: mappedTasks, points, level });
      // setFeed(feed.filter((feedItem) => feedItem.id !== item.id));
      socket.emit('removeFromFeed', item.id);
    } catch (error) {
      console.warn(error);
    }
  };

  const removeTask = async (): Promise<void> => {
    try {
      const { data: deleteSuccessful } = await axios.delete(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/${item.id}`
      );
      if (deleteSuccessful) {
        const filteredTasks = user.tasks.filter((task) => {
          return task.id !== item.id;
        });
        setUser({ ...user, tasks: filteredTasks });
        setFeed(feed.filter((feedItem) => feedItem.id !== item.id));
        socket.emit('removeFromFeed', item.id);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const addTimeStamp = (date: string) => {
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
    const dayDifference = +date.slice(-2) - +new Date().toString().slice(8, 10);
    if (dayDifference === 0) {
      return 'due today';
    } else if (dayDifference <= 6) {
      return `due ${days[getDay(dueDate)]}${
        !isThisWeek(dueDate)
          ? ' ' + (dueDate.getMonth() + 1) + '/' + (dueDate.getDate() + 1)
          : ''
      }`;
    } else {
      return `due in ${differenceInWeeks(dueDate, new Date()) + 1} weeks`;
    }
  };

  return (
    <View style={styles.task_view}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 10
        }}
      >
        {item.is_important ? (
          <Image
            source={require('../../../assets/images/star-circle-outline.png')}
            style={{
              resizeMode: 'contain',
              width: 25,
              height: 25
            }}
          />
        ) : null}
        <TouchableOpacity onPress={() => removeTask()}>
          <Image
            source={require('../../../assets/images/minus-circle-outline.png')}
            style={styles.checkbox}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {!finished ? (
          <TouchableOpacity
            onPress={() => {
              setFinished(!finished);
              finished ? markTaskIncomplete() : markTaskComplete();
            }}
          >
            <Image
              source={require('../../../assets/images/checkbox-blank-outline.png')}
              style={styles.checkbox}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFinished(!finished);
              finished ? markTaskIncomplete() : markTaskComplete();
            }}
          >
            <Image
              source={require('../../../assets/images/checkbox-marked.png')}
              style={styles.checkbox}
            />
          </TouchableOpacity>
        )}
        <View style={{ width: '90%', padding: 10 }}>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            {'  '}
            {item.description} - {addTimeStamp(item.due_date)}
          </Text>
        </View>
      </View>
      {finished ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 15
          }}
        >
          <Text style={textStyles.txt}>Public? </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={'#FAFAFA'}
            onValueChange={() => {
              taskPublic ? unshareTask() : shareTask();
            }}
            value={taskPublic}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    resizeMode: 'contain',
    width: 25,
    height: 25
  },
  task_view: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 15
  }
});

export default SingleTask;
