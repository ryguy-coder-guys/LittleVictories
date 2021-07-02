import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Switch
} from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
import { useUserContext } from '../../Contexts/userContext';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isPast, isBefore } from 'date-fns';

const TaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [description, setDescription] = useState('');
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [isImportant, setIsImportant] = useState(false);
  const { user, setUser } = useUserContext();
  //for date selector
  const [date, setDate] = useState(new Date());
  const toggleSwitch = () => setIsImportant((previousState) => !previousState);

  const handleSubmit = async () => {
    if (isPast(date)) {
      alert('this date is in the past, please select a future date.');
    } else {
      const { data: task } = await axios.post(
        'http://localhost:3000/api/tasks/',
        {
          user_id: user.id,
          description,
          due_date: date,
          minutes_to_complete: timeToComplete,
          is_important: isImportant
        }
      );
      const sortedTasks = [...user.tasks, task].sort((t1, t2) =>
        isBefore(new Date(t1.due_date), new Date(t2.due_date)) ? -1 : 1
      );
      setUser({
        ...user,
        tasks: sortedTasks
      });
      setShowForm(false);
      setDescription('');
      setDate(new Date());
      setTimeToComplete(0);
      setIsImportant(false);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.header}>Tasks</Text>
        <FAB
          style={styles.fab}
          small
<<<<<<< HEAD
          icon="plus"
=======
          icon='plus'
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
          onPress={() => setShowForm(true)}
        />
      </View>
      {showForm ? (
        <View style={styles.addTaskComponent}>
          <View>
            <View
              style={{
                flexDirection: 'row',
<<<<<<< HEAD
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.subheader}>Add Task</Text>
              <Button title="Cancel" onPress={() => setShowForm(false)} />
=======
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.subheader}>Add Task</Text>
              <Button title='Cancel' onPress={() => setShowForm(false)} />
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setDescription}
              value={description}
<<<<<<< HEAD
              placeholder="Enter Task Description"
              autoCapitalize="none"
=======
              placeholder='Enter Task Description'
              autoCapitalize='none'
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
            />
            <View>
              <Text style={styles.prompt}>Set Due Date:</Text>
              <DateTimePicker
<<<<<<< HEAD
                testID="dateTimePicker"
                value={date}
                display="default"
=======
                testID='dateTimePicker'
                value={date}
                display='default'
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
                onChange={onChange}
              />
            </View>
          </View>
          <View>
            <Text style={styles.prompt}>
              How long will it take to complete this task?
            </Text>
            <Text style={styles.text}>{timeToComplete} minutes</Text>
            <Slider
              step={5}
              minimumValue={0}
              maximumValue={60}
              value={timeToComplete}
              onValueChange={setTimeToComplete}
<<<<<<< HEAD
              minimumTrackTintColor="#1fb28a"
              maximumTrackTintColor="#fafafa"
              thumbTintColor="#b9e4c9"
=======
              minimumTrackTintColor='#1fb28a'
              maximumTrackTintColor='#fafafa'
              thumbTintColor='#b9e4c9'
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
            />
          </View>
          <View style={styles.important}>
            <Text
              style={{
                fontSize: 18,
                color: '#1D426D',
                paddingRight: 15,
<<<<<<< HEAD
                paddingTop: 2,
=======
                paddingTop: 2
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
              }}
            >
              Mark task as important?
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={'#FAFAFA'}
              onValueChange={toggleSwitch}
              value={isImportant}
            />
          </View>
<<<<<<< HEAD
          <Button title="Submit" onPress={() => handleSubmit()} />
=======
          <Button title='Submit' onPress={() => handleSubmit()} />
>>>>>>> 72369d0976950d0af7c5bcf86c5f1f7c96c439c9
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  addTaskComponent: {
    backgroundColor: '#8ebac6',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  backgroundImage: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20
  },
  fab: {
    backgroundColor: '#1D426D',
    height: 40,
    marginRight: 20
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20
  },
  important: {
    flexDirection: 'row',
    color: '#1D426D',
    marginTop: 25,
    marginBottom: 10,
    fontSize: 18
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 10,
    fontSize: 16
  },
  prompt: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 25,
    marginBottom: 10,
    fontSize: 18
  },
  subheader: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5
  },
  submitButton: {
    marginTop: 20
  },
  text: {
    color: '#1D426D',
    marginBottom: 10,
    fontSize: 16
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start'
  }
});
export default TaskForm;
