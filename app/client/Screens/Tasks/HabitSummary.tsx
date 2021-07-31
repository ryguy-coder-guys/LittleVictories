/* eslint-disable indent */
import React, { ReactElement, useState } from 'react';
import { FlatList, Text, View, Switch } from 'react-native';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import { getDay, format } from 'date-fns';
import HabitForm from './HabitForm';
import SingleHabit from './SingleHabit';
import { useUserContext } from '../../Contexts/userContext';
import { textStyles } from '../../Stylesheets/Stylesheet';

const HabitsTodayList = ({ item }): ReactElement => {
  return <SingleHabit item={item} />;
};

const HabitsLaterList = ({ item }): ReactElement => {
  return <SingleHabit item={item} />;
};

const ListHeader = ({ showAll, toggleShowAll }): ReactElement => {
  const { user } = useUserContext();
  return (
    <View>
      <HabitForm />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
          alignItems: 'center'
        }}
      >
        {!showAll ? (
          <Text
            style={
              user.readable_font
                ? [textStyles.h3_big, { marginBottom: 10 }]
                : [textStyles.h3, { marginBottom: 10 }]
            }
          >
            Due Today
          </Text>
        ) : (
          <Text
            style={
              user.readable_font
                ? [textStyles.h3_big, { marginBottom: 10 }]
                : [textStyles.h3, { marginBottom: 10 }]
            }
          >
            All Habits
          </Text>
        )}
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Due Today{'  '}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={'#FAFAFA'}
            onValueChange={() => toggleShowAll((prevState) => !prevState)}
            value={showAll}
          />
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            {'  '}
            View All
          </Text>
        </View>
      </View>
    </View>
  );
};

const habitsDueToday = () => {
  const { user } = useUserContext();
  const currentDateOfMonth = format(new Date(), 'd');
  const filteredHabits = user?.habits.filter((habit) => {
    if (habit.frequency === 'daily') {
      return habit;
    } else if (habit.frequency === 'weekly') {
      const currentDayOfWk = getDay(new Date());
      // sunday = 0 -> saturday = 6
      if (currentDayOfWk === 0 && habit.days_of_week.includes('Su')) {
        return habit;
      } else if (currentDayOfWk === 1 && habit.days_of_week.includes('M')) {
        return habit;
      } else if (currentDayOfWk === 2 && habit.days_of_week.includes('Tu')) {
        return habit;
      } else if (currentDayOfWk === 3 && habit.days_of_week.includes('W')) {
        return habit;
      } else if (currentDayOfWk === 4 && habit.days_of_week.includes('Th')) {
        return habit;
      } else if (currentDayOfWk === 5 && habit.days_of_week.includes('F')) {
        return habit;
      } else if (currentDayOfWk === 6 && habit.days_of_week.includes('Sa')) {
        return habit;
      }
    } else if (
      habit.frequency === 'monthly' &&
      currentDateOfMonth === habit.calendar_date.toString()
    ) {
      return habit;
    }
  });
  return filteredHabits || [];
};

const HabitSummary = (): ReactElement => {
  const { user } = useUserContext();
  const [showAll, toggleShowAll] = useState(false);

  return (
    <View style={{ maxHeight: '90%' }}>
      {!showAll ? (
        <FlatList
          keyExtractor={() => getKey()}
          data={user ? habitsDueToday() : []}
          renderItem={HabitsTodayList}
          ListHeaderComponent={
            <ListHeader showAll={showAll} toggleShowAll={toggleShowAll} />
          }
        />
      ) : (
        <FlatList
          keyExtractor={() => getKey()}
          data={user ? user.habits : []}
          renderItem={HabitsLaterList}
          ListHeaderComponent={
            <ListHeader showAll={showAll} toggleShowAll={toggleShowAll} />
          }
        />
      )}
    </View>
  );
};

export default HabitSummary;
