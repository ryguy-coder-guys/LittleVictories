import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { v4 as getKey } from 'uuid';
import { useUserContext } from '../../Contexts/userContext';
import axios from 'axios';
import { serializeUser } from 'passport';
import { userInfo } from 'os';
import { setAutoLogAppEventsEnabledAsync } from 'expo-facebook';
import isThisWeek from 'date-fns/isThisWeek';
import isThisMonth from 'date-fns/isThisMonth';
import SingleTask from './SingleTask';

const TaskList = ({ item }) => {
  return <SingleTask item={item} />;
};

const ListHeader = ({ heading }) => (
  <Text style={styles.subheader}>{heading}</Text>
);

const TaskSummary = () => {
  const { user } = useUserContext();
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="This Week" />}
        data={
          user
            ? user.tasks.filter((task) => isThisWeek(new Date(task.due_date)))
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
                  !isThisWeek(new Date(task.due_date)) &&
                  isThisMonth(new Date(task.due_date))
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
                  !isThisWeek(new Date(task.due_date)) &&
                  !isThisMonth(new Date(task.due_date))
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
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    paddingTop: 5,
    color: '#1D426D',
  },
});

export default TaskSummary;
