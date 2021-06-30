import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { v4 as getKey } from 'uuid';
import { isThisWeek, isThisMonth, isPast, getDate, addHours } from 'date-fns';
import HabitForm from './HabitForm';
import SingleHabit from './SingleHabit';
import { useUserContext } from '../../Contexts/userContext';


const HabitList = ({ item }) => {
  return <SingleHabit item={item} />
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
        data={user ? user.habits : []}
        renderItem={HabitList}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default HabitSummary;
