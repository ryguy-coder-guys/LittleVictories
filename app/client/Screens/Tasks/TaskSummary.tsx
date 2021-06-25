import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { v4 as getKey } from 'uuid';
import { useUserContext } from '../../Contexts/userContext';
import axios from 'axios';
import { serializeUser } from 'passport';
import { userInfo } from 'os';
const getEndOfWeek = () => new Date().getDate() + (6 - new Date().getDay());
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
          !finished ? markTaskComplete() : markTaskIncomplete();
          setFinished(!finished);
        }}
      >
        {finished ? '✓ ' : '☐ '}
      </Text>
      <Text>
        {item.description}
        {item.due_date}
      </Text>
      <Button title="Remove Task" onPress={removeTask} />
    </Text>
  );
};
const TaskList = ({ item }) => {
  return <SingleTask item={item} />;
};
const ListHeader = ({ heading }) => {
  return <Text style={styles.subheader}>{heading}</Text>;
};
const TaskSummary = () => {
  const { user } = useUserContext();
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="This Week" />}
        data={
          user
            ? user.tasks
                .filter(
                  (task) =>
                    new Date(task.due_date).getDate() <= getEndOfWeek() &&
                    new Date(task.due_date).getMonth() === new Date().getMonth()
                )
                .sort(
                  (t1, t2) =>
                    new Date(t1.due_date).getDate() -
                    new Date(t2.due_date).getDate()
                )
            : []
        }
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="This Month" />}
        data={
          user
            ? user.tasks.filter(
                (task) =>
                  new Date(task.due_date).getDate() > getEndOfWeek() &&
                  new Date(task.due_date).getMonth() === new Date().getMonth()
              )
            : []
        }
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="Maybe Later" />}
        data={
          user
            ? user.tasks.filter(
                (task) =>
                  new Date(task.due_date).getMonth() > new Date().getMonth()
              )
            : []
        }
        renderItem={TaskList}
        style={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    padding: 20,
  },
  subheader: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  taskText: {
    fontSize: 18,
    paddingTop: 5,
    color: '#1D426D',
  },
});
export default TaskSummary;