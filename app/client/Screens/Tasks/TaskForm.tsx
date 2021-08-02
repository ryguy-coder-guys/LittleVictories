/* eslint-disable indent */
import React, { ReactElement, useState } from 'react';
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
import { useUserContext } from '../../Contexts/userContext';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isBefore } from 'date-fns';
import { showMessage } from 'react-native-flash-message';
import { Button } from 'react-native-elements';
import minusIcon from '../../../assets/images/minus-circle-outline.png';
import {
  btnStyles,
  containerStyles,
  imgStyles,
  inputStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';

const TaskForm = (): ReactElement => {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [timeToComplete, setTimeToComplete] = useState(5);
  const [isImportant, setIsImportant] = useState(false);
  const { user, setUser } = useUserContext();
  // for date selector
  const [date, setDate] = useState(new Date());

  const toggleSwitch = () => setIsImportant((previousState) => !previousState);

  const isPast = (date: Date) => {
    if (new Date(date).getFullYear() < new Date().getFullYear()) return true;
    if (new Date(date).getFullYear() > new Date().getFullYear()) return false;
    if (new Date(date).getMonth() < new Date().getMonth()) return true;
    if (new Date(date).getMonth() > new Date().getMonth()) return false;
    if (new Date(date).getDate() < new Date().getDate()) return true;
    if (new Date(date).getDate() >= new Date().getDate()) return false;
  };

  const handleSubmit = async () => {
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
    } else if (isPast(date)) {
      showMessage({
        message: 'Form Error',
        titleStyle: { fontSize: 18, color: '#FAFAFA' },
        description:
          'This date is in the past, please select today or a future date.',
        textStyle: { fontSize: 20, color: '#FAFAFA' },
        icon: { icon: 'warning', position: 'left' },
        type: 'default',
        backgroundColor: '#fc9c94'
      });
    } else {
      const { data: task } = await axios.post(
        'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/tasks/',
        {
          user_id: user.id,
          description,
          due_date: date,
          minutes_to_complete: timeToComplete,
          is_important: isImportant
        }
      );
      const sortedTasks = [...(user?.tasks || []), task].sort((t1, t2) =>
        isBefore(new Date(t1.due_date), new Date(t2.due_date)) ? -1 : 1
      );
      setShowForm(false);
      setDescription('');
      setDate(new Date());
      setTimeToComplete(5);
      setIsImportant(false);
      setUser({
        ...user,
        tasks: sortedTasks
      });
    }
  };

  const onChange = (event, selectedDate: string) => {
    const currentDate: string | Date = selectedDate || date;
    setDate(currentDate as Date);
  };

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
          Tasks
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
                Add Task
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowForm(false);
                  setDescription('');
                  setDate(new Date());
                  setTimeToComplete(5);
                  setIsImportant(false);
                }}
              >
                <Image source={minusIcon} style={imgStyles.xsIcon} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={
                user.readable_font ? inputStyles.input_big : inputStyles.input
              }
              onChangeText={setDescription}
              value={description}
              placeholder='Enter Task Description'
              autoCapitalize='none'
            />
            <View>
              <Text
                style={
                  user.readable_font
                    ? [textStyles.txt_big, { marginTop: 5 }]
                    : [textStyles.txt, { marginTop: 5 }]
                }
              >
                Set Due Date:
              </Text>
              <DateTimePicker
                testID='dateTimePicker'
                value={date}
                display='default'
                onChange={onChange}
              />
            </View>
          </View>
          <View>
            <Text
              style={
                user.readable_font
                  ? [textStyles.txt_big, { marginTop: 15 }]
                  : [textStyles.txt, { marginTop: 15 }]
              }
            >
              How long will it take to complete this task?
            </Text>
            <Text
              style={user.readable_font ? textStyles.txt_big : textStyles.txt}
            >
              {timeToComplete} minutes
            </Text>
            <Slider
              step={5}
              minimumValue={5}
              maximumValue={60}
              value={timeToComplete}
              onValueChange={setTimeToComplete}
              minimumTrackTintColor='#1fb28a'
              maximumTrackTintColor='#fafafa'
              thumbTintColor='#b9e4c9'
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text
              style={
                user.readable_font
                  ? [textStyles.txt_big, { paddingTop: 3 }]
                  : [textStyles.txt, { paddingTop: 3 }]
              }
            >
              Mark task as important?
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={'#FAFAFA'}
              onValueChange={toggleSwitch}
              value={isImportant}
              style={{ marginLeft: 10 }}
            />
          </View>
          <Button
            buttonStyle={btnStyles.btn_submit}
            title='Submit'
            onPress={() => handleSubmit()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default TaskForm;
