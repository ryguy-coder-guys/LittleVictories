import axios from 'axios';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import React, { useState } from 'react';

const SingleTask = ({ item }) => {
  const { user, setUser } = useUserContext();
  const [finished, setFinished] = useState(item.is_complete);

  const markTaskComplete = async () => {
    try {
      const { data: task } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/complete`
      );
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: true };
        }
        return task;
      });
      setUser({ ...user, tasks: mappedTasks });
    } catch (error) {
      console.log(error);
    }
  };

  const markTaskIncomplete = async () => {
    try {
      const { data: task } = await axios.patch(
        `http://localhost:3000/api/tasks/${item.id}/incomplete`
      );
      const mappedTasks = user.tasks.map((task) => {
        if (task.id === item.id) {
          return { ...task, is_complete: false };
        }
        return task;
      });
      setUser({ ...user, tasks: mappedTasks });
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
        {item.description} - {item.due_date}
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
