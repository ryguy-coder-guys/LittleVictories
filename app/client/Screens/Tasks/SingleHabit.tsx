import axios from 'axios';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import React, { ReactElement, useState } from 'react';
import { format, getDaysInMonth } from 'date-fns';
import uncheckedBox from '../../../assets/images/checkbox-blank-outline.png';
import checkedBox from '../../../assets/images/checkbox-marked.png';
import minusIcon from '../../../assets/images/minus-circle-outline.png';
import {
  containerStyles,
  imgStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';

const SingleHabit = ({ item }): ReactElement => {
  const { user, setUser, setNumHabits, setLevel } = useUserContext();
  const [finished, setFinished] = useState<boolean>(item.is_complete);

  interface DataInterface {
    points: number;
    level: number;
  }

  const markHabitComplete = async () => {
    try {
      const {
        data: { points, level }
      } = await axios.patch<DataInterface>(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/habits/${item.id}/complete`
      );
      const mappedHabits = user.habits.map((habit) => {
        if (habit.id === item.id) {
          return { ...habit, is_complete: true };
        }
        return habit;
      });
      setLevel(level);
      setUser({ ...user, habits: mappedHabits, points, level });
    } catch (err) {
      console.warn('client-side complete habit error: ', err);
    }
  };

  const markHabitIncomplete = async () => {
    try {
      const {
        data: { points, level }
      } = await axios.patch(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/habits/${item.id}/incomplete`
      );
      const mappedHabits = user.habits.map((habit) => {
        if (habit.id === item.id) {
          return { ...habit, is_complete: false };
        }
        return habit;
      });
      setUser({ ...user, habits: mappedHabits, points, level });
    } catch (err) {
      console.warn('client-side error marking habit incomplete, error: ', err);
    }
  };

  const removeHabit = async () => {
    try {
      await axios.delete(
        `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/habits/${item.id}`
      );
      const filteredHabits = user.habits.filter((habit) => {
        return habit.id !== item.id;
      });
      setUser({ ...user, habits: filteredHabits });
      setNumHabits(user.habits.length - 1);
    } catch (error) {
      console.warn('client side remove habit error', error);
    }
  };

  const splitDays = (daysStr: string) => {
    let daysSpacedStr = '';
    if (daysStr.includes('M')) {
      daysSpacedStr += 'Mon, ';
    }
    if (daysStr.includes('Tu')) {
      daysSpacedStr += 'Tues, ';
    }
    if (daysStr.includes('W')) {
      daysSpacedStr += 'Wed, ';
    }
    if (daysStr.includes('Th')) {
      daysSpacedStr += 'Thurs, ';
    }
    if (daysStr.includes('F')) {
      daysSpacedStr += 'Fri, ';
    }
    if (daysStr.includes('Sa')) {
      daysSpacedStr += 'Sat, ';
    }
    if (daysStr.includes('Su')) {
      daysSpacedStr += 'Sun, ';
    }
    return daysSpacedStr.slice(0, -2);
  };

  const checkDate = (date: number) => {
    if (date >= 1 && date <= 28) {
      return date;
    } else {
      const daysThisMonth = getDaysInMonth(new Date());
      if (daysThisMonth < date) {
        return daysThisMonth;
      } else {
        return date;
      }
    }
  };

  return (
    <View style={containerStyles.section}>
      <View style={{ flexDirection: 'row' }}>
        {!finished ? (
          <TouchableOpacity
            onPress={() => {
              setFinished(!finished);
              finished ? void markHabitIncomplete() : void markHabitComplete();
            }}
          >
            <Image source={uncheckedBox} style={imgStyles.xsIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFinished(!finished);
              finished ? void markHabitIncomplete() : void markHabitComplete();
            }}
          >
            <Image source={checkedBox} style={imgStyles.xsIcon} />
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text
            style={
              user.readable_font
                ? [textStyles.txt_big, { maxWidth: 250 }]
                : [textStyles.txt, { maxWidth: 250 }]
            }
          >
            {item.description}
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Frequency: {item.frequency}
          </Text>
          {item.frequency === 'weekly' ? (
            <Text
              style={
                user.readable_font
                  ? [textStyles.txt_big, { maxWidth: 250 }]
                  : [textStyles.txt, { maxWidth: 250 }]
              }
            >
              On {splitDays(item.days_of_week)}
            </Text>
          ) : null}
          {item.frequency === 'monthly' ? (
            <Text
              style={user.readable_font ? textStyles.txt_big : textStyles.txt}
            >
              Due Date: {format(new Date(), 'MMMM')}{' '}
              {checkDate(item.calendar_date)}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => {
            void removeHabit();
          }}
        >
          <Image source={minusIcon} style={imgStyles.xsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleHabit;
