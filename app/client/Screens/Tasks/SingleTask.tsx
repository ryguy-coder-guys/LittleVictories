import axios from 'axios';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import React, { useState } from 'react';
import { differenceInDays, differenceInWeeks, getDay } from 'date-fns';

const SingleTask = ({ item }) => {
  const { user, setUser } = useUserContext();
  const [finished, setFinished] = useState(item.is_complete);

  const markTaskComplete = async () => {
    try {
      const {
        data: { task, points, level },
      } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/complete`
      );
      console.log('points', points, 'level', level);
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: true };
        }
        return task;
      });
      setUser({ ...user, tasks: mappedTasks, points, level });
    } catch (error) {
      console.log(error);
    }
  };

  const markTaskIncomplete = async () => {
    try {
      const {
        data: { task, points, level },
      } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/incomplete`
      );
      console.log('points', points, 'level', level);
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: false };
        }
        return task;
      });
      setUser({ ...user, tasks: mappedTasks, points, level });
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      6: 'Sunday',
    };
    if (differenceInDays(new Date(date), new Date()) <= 6) {
      return `due ${days[getDay(new Date(date))]}`;
    }
    return `due in ${differenceInWeeks(new Date(date), new Date())} weeks`;
  };

  return (
    <Text style={styles.taskText}>
      <Text
        onPress={() => {
          finished ? markTaskIncomplete() : markTaskComplete();
          setFinished(!finished);
        }}
      >
        {finished ? '✓ ' : '☐ '}
      </Text>
      <Text>
        {item.description} - {fn(item.due_date)}
      </Text>
      <Button title="Remove" onPress={removeTask} />
    </Text>
  );
};

const styles = StyleSheet.create({
  taskText: {
    fontSize: 14,
    paddingTop: 5,
    color: '#1D426D',
  },
});

export default SingleTask;
