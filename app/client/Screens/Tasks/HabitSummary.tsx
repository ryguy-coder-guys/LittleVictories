import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, Switch } from 'react-native';
import { v4 as getKey } from 'uuid';
import { getDay, format } from 'date-fns';
import HabitForm from './HabitForm';
import SingleHabit from './SingleHabit';
import { useUserContext } from '../../Contexts/userContext';

const HabitsTodayList = ({ item }) => {
  return <SingleHabit item={item} />
};

const HabitsLaterList = ({ item }) => {
  return <SingleHabit item={item} />
};

const ListHeader = ({showAll, toggleShowAll}) => {
  return (
    <View>
      <HabitForm />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {!showAll ? <Text style={styles.subheader}>Due Today</Text> : <Text style={styles.subheader}>All Habits</Text>}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#1D426D', marginBottom: 5, marginTop: 20}}>Due Today </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={'#FAFAFA'}
            onValueChange={() => toggleShowAll((prevState) => !prevState)}
            value={showAll}
            style={{marginTop: 20}}
          />
          <Text style={{fontSize: 16, color: '#1D426D', marginBottom: 5, marginTop: 20, marginRight: 40}}> View All</Text>
        </View>
      </View>
    </View>
  );
};

const habitsDueToday = () => {
  const { user } = useUserContext();
  const filteredHabits = user?.habits.filter(habit => {
    if (habit.frequency === 'daily') {
      return habit;
    } else if (habit.frequency === 'weekly') {
      const currentDayOfWk = getDay(new Date());
      // sunday = 0 -> saturday = 6
      if (currentDayOfWk === 0) {
        if (habit.days_of_week.includes('Su')) {
          return habit;
        }
      } else if (currentDayOfWk === 1) {
        if (habit.days_of_week.includes('M')) {
          return habit;
        }
      } else if (currentDayOfWk === 2) {
        if (habit.days_of_week.includes('Tu')) {
          return habit;
        }
      } else if (currentDayOfWk === 3) {
        if (habit.days_of_week.includes('W')) {
          return habit;
        }
      } else if (currentDayOfWk === 4) {
        if (habit.days_of_week.includes('Th')) {
          return habit;
        }
      } else if (currentDayOfWk === 5) {
        if (habit.days_of_week.includes('F')) {
          return habit;
        }
      } else if (currentDayOfWk === 6) {
        if (habit.days_of_week.includes('Sa')) {
          return habit;
        }
      }
    } else if (habit.frequency === 'monthly') {
      const currentDateOfMonth = format(new Date(), 'd');
      if (currentDateOfMonth === habit.calendar_date.toString()) {
        return habit;
      }
    }
  });
  return filteredHabits || [];
}

const HabitSummary = () => {
  const { user } = useUserContext();
  const [ showAll, toggleShowAll ] = useState(false)

  return (
    <View>
      {!showAll ? <FlatList
        keyExtractor={() => getKey()}
        data={user ? habitsDueToday() : []}
        renderItem={HabitsTodayList}
        ListHeaderComponent={<ListHeader showAll={showAll} toggleShowAll={toggleShowAll}/>}
      /> :
      <View>
        <FlatList
          keyExtractor={() => getKey()}
          data={user ? user.habits : []}
          renderItem={HabitsLaterList}
          ListHeaderComponent={<ListHeader showAll={showAll} toggleShowAll={toggleShowAll}/>}
        />
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  subheader: {
    color: '#1D426D',
    fontSize: 20,
    marginLeft: 40,
    fontWeight: 'bold',
    marginTop: 20
  }
});

export default HabitSummary;
