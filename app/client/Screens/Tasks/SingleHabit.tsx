import axios from 'axios';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import React, { useState } from 'react';

const SingleHabit = ({ item }) => {
  const { user, setUser } = useUserContext();
  const [finished, setFinished] = useState(item.is_complete);

  const markHabitComplete = async () => {
    try {
      const {
        data: { points, level },
      } = await axios.patch(
        `http://localhost:3000/api/habits/${item.id}/complete`
      );
      console.log('points', points, 'level', level);
      const mappedHabits = user.habits.map((habit) => {
        if (habit.id === item.id) {
          return { ...habit, is_complete: true };
        }
        return habit;
      });
      setUser({ ...user, habits: mappedHabits, points, level });
    } catch (err) {
      console.log('client-side complete habit error: ', err);
    }
  };

  const markHabitIncomplete = async () => {
    try {
      const {
        data: { points, level },
      } = await axios.patch(
        `http://localhost:3000/api/habits/${item.id}/incomplete`
      );
      console.log('points', points, 'level', level);
      const mappedHabits = user.habits.map((habit) => {
        if (habit.id === item.id) {
          return { ...habit, is_complete: false };
        }
        return habit;
      });
      setUser({ ...user, habits: mappedHabits, points, level });
    } catch (err) {
      console.log('client-side error marking habit incomplete, error: ', err);
    }
  };

  const removeHabit = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/habits/${item.id}`
      );
      const filteredHabits = user.habits.filter((habit) => {
        return habit.id !== item.id;
      });
      setUser({ ...user, habits: filteredHabits });
    } catch (error) {
      console.log('client side remove habit error', error);
    }
  };

  return (
    <View style={styles.habit_view}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={styles.text}
          onPress={() => {
            finished ? markHabitIncomplete() : markHabitComplete();
            setFinished(!finished);
          }}
        >
          {finished ? '✓ ' : '☐ '}
        </Text>
        <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{item.frequency}</Text>
        { item.frequency === 'weekly' ? <Text style={styles.text}>{item.days_of_week}</Text> : null }
        { item.frequency === 'monthly' ? <Text style={styles.text}>{item.calendar_date}</Text>: null }
        </View>
      </View>
      <Button title="Remove" onPress={removeHabit} />
    </View>
  );
};

const styles = StyleSheet.create({
  habit_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 10,
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 18,
    color: '#1D426D',
  },
});

export default SingleHabit;
