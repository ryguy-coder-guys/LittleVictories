import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { v4 as getKey } from 'uuid';
import { useUserContext } from '../../Contexts/userContext';
import axios from 'axios';
import { serializeUser } from 'passport';
import { userInfo } from 'os';
import { setAutoLogAppEventsEnabledAsync } from 'expo-facebook';
import isThisWeek from 'date-fns/isThisWeek';
import isThisMonth from 'date-fns/isThisMonth';
import isPast from 'date-fns/isThisMonth';
import SingleTask from './SingleTask';

const TaskList = ({ item }) => {
  return <SingleTask item={item} />;
};

const ListHeader = ({ heading }) => (
  <Text style={styles.subheader}>{heading}</Text>
);

const sortTasks = (tasks) => {
  const thisWeek = [];
  const thisMonth = [];
  const maybeLater = [];
  for (const task of tasks) {
    const dueDate = new Date(task.due_date);
    if (isThisWeek(dueDate)) {
      thisWeek.push(task);
      continue;
    }
    if (isPast(dueDate)) {
      thisWeek.push(task);
      continue;
    }
    if (isThisMonth(dueDate)) {
      thisMonth.push(task);
      continue;
    }
    maybeLater.push(task);
  }
  return { thisWeek, thisMonth, maybeLater };
};

const TaskSummary = () => {
  const { user } = useUserContext();
  const [thisWeek, setThisWeek] = useState([]);
  const [thisMonth, setThisMonth] = useState([]);
  const [maybeLater, setMaybeLater] = useState([]);

  useEffect(() => {
    const {
      thisWeek: _thisWeek,
      thisMonth: _thisMonth,
      maybeLater: _maybelater,
    } = sortTasks(user.tasks);
    setThisWeek(_thisWeek);
    setThisMonth(_thisMonth);
    setMaybeLater(_maybelater);
  }, [user]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="This Week" />}
        data={thisWeek}
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="This Month" />}
        data={thisMonth}
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="Maybe Later" />}
        data={maybeLater}
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
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    paddingTop: 5,
    color: '#1D426D',
  },
});
export default TaskSummary;
