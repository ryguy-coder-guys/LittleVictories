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

const ListHeader = ({ heading }) => (
  <Text style={styles.subheader}>{heading}</Text>
);

const TaskSummary = () => {
  const { user } = useUserContext();
  // const [data, setData] = useState([]);

  // const sortTasks = (tasks) => {
  //   console.log('sorting');

  //   const thisWeek = [];
  //   const thisMonth = [];
  //   const maybeLater = [];
  //   for (const task of tasks) {
  //     const dueDate = addHours(new Date(task.due_date), 1);
  //     // console.log(dueDate);

  //     console.log(dueDate.toString().slice(8, 10));

  //     if (isPast(dueDate)) {
  //       thisWeek.push(task);
  //     } else if (isThisWeek(dueDate)) {
  //       thisWeek.push(task);
  //     } else if (isThisMonth(dueDate)) {
  //       thisMonth.push(task);
  //     } else {
  //       maybeLater.push(task);
  //     }
  //   }
  //   return { thisWeek, thisMonth, maybeLater };
  // };

  // useEffect(() => {
  //   if (user) {
  // const { thisWeek, thisMonth, maybeLater } = sortTasks(user.tasks);
  // const newData = [
  //   {
  //     title: 'This Week',
  //     data: thisWeek,
  //   },
  //   {
  //     title: 'This Month',
  //     data: thisMonth,
  //   },
  //   {
  //     title: 'Maybe Later',
  //     data: maybeLater,
  //   },
  // ];
  //     setData(user.tasks);
  //   }
  // }, [user]);

  return (
    // <SafeAreaView>
    //   <SectionList
    //     sections={data}
    //     keyExtractor={() => getKey()}
    //     renderItem={TaskList}
    //     renderSectionHeader={({ section: { title } }) => (
    //       <ListHeader heading={title} />
    //     )}
    //     ListHeaderComponent={<Task />}
    //   />
    // </SafeAreaView>
    <View>
      <FlatList
        keyExtractor={() => getKey()}
        data={user ? user.tasks : []}
        renderItem={TaskList}
        ListHeaderComponent={<Task />}
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
