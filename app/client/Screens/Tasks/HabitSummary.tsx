import React, { useState, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import { isThisWeek, isThisMonth, isPast, getDate, addHours } from 'date-fns';

import {
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
// import SingleTask from './SingleTask';
// import TaskForm from './TaskForm';

const TaskList = ({ item }) => {
  return <Text>Each task will render here.</Text>;
};

const ListHeader = () => {
  return (
    <View>
      <Text>Habit form will go here</Text>
    </View>
  );
};

const HabitSummary = () => {
  const { user } = useUserContext();

  return (
    <View>
      <Text>This will be the habit summary</Text>
      {/* <FlatList
        keyExtractor={() => getKey()}
        data={user ? user.tasks : []}
        renderItem={TaskList}
        ListHeaderComponent={<ListHeader />}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({

});

export default HabitSummary;
