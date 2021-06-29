import React, { useState, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import { isThisWeek, isThisMonth, isPast, getDate, addHours } from 'date-fns';
import HabitForm from './HabitForm';

import {
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
// import SingleTask from './SingleTask';
// import TaskForm from './TaskForm';

const HabitList = ({ item }) => {
  return <Text>Each habit will render here.</Text>;
};

const ListHeader = () => {
  return (
    <View>
      <HabitForm />
    </View>
  );
};

const HabitSummary = () => {
  const { user } = useUserContext();

  return (
    <View>
      <FlatList
        keyExtractor={() => getKey()}
        data={[]}
        renderItem={HabitList}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default HabitSummary;
