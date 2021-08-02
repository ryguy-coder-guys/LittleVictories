import React, { ReactElement, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { FAB } from 'react-native-paper';
import { useUserContext } from '../../Contexts/userContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Button, ButtonGroup } from 'react-native-elements';
import {
  btnStyles,
  containerStyles,
  imgStyles,
  inputStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import { Habit } from '../../Interfaces/user';
import { showMessage } from 'react-native-flash-message';
import minusIcon from '../../../assets/images/minus-circle-outline.png';

const TaskForm = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const { user, setUser, setNumHabits } = useUserContext();
  const [date, setDate] = useState(new Date());
  const [selectedFrequencyIndex, setSelectedFrequencyIndex] = useState(0);
  const [selectedDayIndices, setSelectedDayIndices] = useState([]);

  const daysSelected = (selectedDayIndices: number[]): string => {
    const days: string[] = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
    let dayStr = '';
    for (let i = 0; i < selectedDayIndices.length; i++) {
      dayStr = dayStr + days[selectedDayIndices[i]];
    }
    return dayStr;
  };

  const postHabit = async (): Promise<void> => {
    const frequencies: string[] = ['daily', 'weekly', 'monthly'];
    const { data: habit }: AxiosResponse<Habit> = await axios.post(
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/habits/',
      {
        user_id: user.id,
        description: description,
        frequency: frequencies[selectedFrequencyIndex],
        days_of_week: daysSelected(selectedDayIndices),
        calendar_date: parseInt(format(date, 'dd'))
      }
    );
    const habitArr: Habit[] = [...user.habits, habit];
    setUser({
      ...user,
      habits: habitArr
    });
    setShowForm(false);
    setDescription('');
    setDate(new Date());
    setSelectedFrequencyIndex(0);
    setSelectedDayIndices([]);
    setNumHabits(user.habits.length + 1);
  };

  const handleSubmit = (): void => {
    if (description === '') {
      showMessage({
        message: 'Form Error',
        titleStyle: { fontSize: 18, color: '#FAFAFA' },
        description: 'Please enter a description.',
        textStyle: { fontSize: 20, color: '#FAFAFA' },
        icon: { icon: 'warning', position: 'left' },
        type: 'default',
        backgroundColor: '#fc9c94'
      });
    } else if (selectedFrequencyIndex === 0) {
      void postHabit();
    } else if (selectedFrequencyIndex === 1) {
      if (!selectedDayIndices.length) {
        showMessage({
          message: 'Form Error',
          titleStyle: { fontSize: 18, color: '#FAFAFA' },
          description:
            'Please select the weekday(s) you would like the habit to be due.',
          textStyle: { fontSize: 20, color: '#FAFAFA' },
          icon: { icon: 'warning', position: 'left' },
          type: 'default',
          backgroundColor: '#fc9c94'
        });
      } else {
        void postHabit();
      }
    } else if (selectedFrequencyIndex === 2) {
      void postHabit();
    }
  };

  // event needs to stay, breaks date picker without it
  const onChange = (event, selectedDate: Date): void => {
    const currentDate: string | Date = selectedDate || date;
    setDate(currentDate);
  };

  const dayArr: string[] = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          style={
            user.readable_font
              ? textStyles.screenHeading_big
              : textStyles.screenHeading
          }
        >
          Habits
        </Text>
        <FAB
          style={btnStyles.fab}
          small
          icon='plus'
          onPress={() => setShowForm(true)}
        />
      </View>
      {showForm ? (
        <View style={containerStyles.section}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text
                style={user.readable_font ? textStyles.h2_big : textStyles.h2}
              >
                Add Habit
              </Text>
              <TouchableOpacity onPress={() => setShowForm(false)}>
                <Image source={minusIcon} style={imgStyles.xsIcon} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={
                user.readable_font ? inputStyles.input_big : inputStyles.input
              }
              onChangeText={setDescription}
              value={description}
              placeholder='Enter Habit Description'
              autoCapitalize='none'
            />
          </View>
          <Text
            style={
              user.readable_font
                ? [textStyles.txt_big, { marginTop: 10 }]
                : [textStyles.txt, { marginTop: 10 }]
            }
          >
            Habit Frequency
          </Text>
          <ButtonGroup
            onPress={setSelectedFrequencyIndex}
            selectedIndex={selectedFrequencyIndex}
            buttons={['daily', 'weekly', 'monthly']}
            containerStyle={{
              height: 40,
              borderRadius: 10,
              borderColor: '#5c83b1',
              marginLeft: 0,
              marginRight: 0
            }}
            selectedButtonStyle={{
              backgroundColor: '#5c83b1',
              borderColor: '#5c83b1'
            }}
            buttonStyle={{ backgroundColor: '#1D426D', borderColor: '#5c83b1' }}
            textStyle={
              user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
            }
            disabledTextStyle={
              user.readable_font
                ? { fontSize: 20, color: '#a3a0a0' }
                : { fontSize: 18, color: '#a3a0a0' }
            }
            innerBorderStyle={{ color: '#1D426D' }}
          />
          {selectedFrequencyIndex === 1 ? (
            <View>
              <Text
                style={
                  user.readable_font
                    ? [textStyles.txt_big, { marginTop: 10 }]
                    : [textStyles.txt, { marginTop: 10 }]
                }
              >
                Habit Day(s)
              </Text>
              <ButtonGroup
                onPress={setSelectedDayIndices}
                selectedIndexes={selectedDayIndices}
                buttons={dayArr}
                containerStyle={btnStyles.BG}
                selectedButtonStyle={btnStyles.BG_active}
                buttonStyle={btnStyles.BG_inactive}
                textStyle={
                  user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
                }
                disabledTextStyle={
                  user.readable_font
                    ? textStyles.disabledBtnTxt_big
                    : textStyles.disabledBtnTxt
                }
                innerBorderStyle={{ color: '#1D426D' }}
                selectMultiple={true}
              />
            </View>
          ) : null}
          {selectedFrequencyIndex === 2 ? (
            <View>
              <Text
                style={
                  user.readable_font
                    ? [textStyles.txt_big, { marginTop: 10, marginBottom: 15 }]
                    : [textStyles.txt, { marginTop: 10, marginBottom: 15 }]
                }
              >
                Monthly Repeat Date
              </Text>
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                display='default'
                onChange={onChange}
              />
            </View>
          ) : null}
          <Button
            buttonStyle={btnStyles.btn_submit}
            titleStyle={
              user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
            }
            title='Submit'
            onPress={() => handleSubmit()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default TaskForm;
