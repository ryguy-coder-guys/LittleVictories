import React, { useState, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import { isThisWeek, isThisMonth, isPast, getDate, addHours } from 'date-fns';

import {
  StyleSheet,
  Text,
  SectionList,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import SingleTask from './SingleTask';
import Task from './Task';

const TaskList = ({ item }) => {
  return <SingleTask item={item} />;
};

const ListHeader = () => {
  return (
    <View>
      <Task />
    </View>
  );
};

const TaskSummary = () => {
  const { user } = useUserContext();

  return (
    <View>
      <FlatList
        keyExtractor={() => getKey()}
        data={user ? user.tasks : []}
        renderItem={TaskList}
        ListHeaderComponent={<ListHeader />}
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
