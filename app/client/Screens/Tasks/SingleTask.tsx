import React, { ReactElement, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Switch } from 'react-native';

import { useUserContext } from '../../Contexts/userContext';
import { useSocketContext } from '../../Contexts/socketContext';
import { useFeedContext } from '../../Contexts/feedContext';

import axios from 'axios';
import { differenceInWeeks, getDay, isThisWeek } from 'date-fns';

import {
  containerStyles,
  imgStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';

import starIcon from '../../../assets/images/star-circle-outline.png';
import minusIcon from '../../../assets/images/minus-circle-outline.png';
import uncheckedBox from '../../../assets/images/checkbox-blank-outline.png';
import checkedBox from '../../../assets/images/checkbox-marked.png';

const SingleTask = ({ item }): ReactElement => {
  const { user, setUser, setLevel, setNumCompletedTasks } = useUserContext();
  const { socket } = useSocketContext();
  const { feed, setFeed } = useFeedContext();
  const [finished, setFinished] = useState<boolean>(item.is_complete);
  const [taskPublic] = useState<boolean>(item.is_public);

  const unshareTask = async (): Promise<void> => {
    try {
      const { data: updateSuccessful } = await axios.patch(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/${item.id}/private`
      );
      if (updateSuccessful) {
        const mappedTasks = user.tasks.map((task) => {
          if (task.id === item.id) {
            return { ...task, is_public: false };
          }
          return task;
        });
        setUser({ ...user, tasks: mappedTasks });
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
        const mappedTasks = user.tasks.map((task) => {
          if (task.id === item.id) {
            return { ...task, is_public: true };
          }
          return task;
        });
        setUser({ ...user, tasks: mappedTasks });
        setFeed([updateSuccessful, ...feed]);
        socket.emit('addToFeed', item);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const markTaskComplete = async (): Promise<void> => {
    try {
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
      setUser({ ...user, tasks: mappedTasks, points, level });
      setLevel(level);
      if (level === 1 || level === 5 || level === 10) {
        setTimeout(() => {
          setNumCompletedTasks(numCompletedTasks);
        }, 3000);
      } else {
        setNumCompletedTasks(numCompletedTasks);
      }
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
    <View style={containerStyles.section}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 10
        }}
      >
        {item.is_important ? (
          <Image source={starIcon} style={imgStyles.xsIcon} />
        ) : null}
        <TouchableOpacity onPress={() => removeTask()}>
          <Image source={minusIcon} style={imgStyles.xsIcon} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View>
          {!finished ? (
            <TouchableOpacity
              onPress={() => {
                setFinished(!finished);
                finished ? void markTaskIncomplete() : void markTaskComplete();
              }}
            >
              <Image source={uncheckedBox} style={imgStyles.xsIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setFinished(!finished);
                finished ? void markTaskIncomplete() : void markTaskComplete();
              }}
            >
              <Image source={checkedBox} style={imgStyles.xsIcon} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={
              user.readable_font
                ? [textStyles.txt_big, { width: '82%' }]
                : [textStyles.txt, { width: '82%' }]
            }
          >
            {item.description} - {addTimeStamp(item.due_date)}
          </Text>
        </View>
      </View>
      {finished ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5
          }}
        >
          <Text
            style={
              user.readable_font
                ? [textStyles.txt_big]
                : [textStyles.txt, { marginTop: 5 }]
            }
          >
            Public?{' '}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={'#FAFAFA'}
            onValueChange={() => {
              taskPublic ? void unshareTask() : void shareTask();
            }}
            value={taskPublic}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SingleTask;
