import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  Button
} from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
import { Switch } from 'react-native-switch';
import { useUserContext } from '../../Contexts/userContext';
import Slider from '@react-native-community/slider';
import TaskSummary from './TaskSummary';

const Task = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [isImportant, setIsImportant] = useState(false);
  const { user, setUser } = useUserContext();

  const toggleSwitch = () => setIsImportant((previousState) => !previousState);

  const handleSubmit = async () => {
    const { data: tasks } = await axios.post(
      'http://localhost:3000/api/tasks/',
      {
        user_id: user.id,
        description,
        date,
        timeToComplete,
        is_important: isImportant,
      }
    );
    setTasks([...tasks]);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.header}>Tasks</Text>
          <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => setShowForm(true)}
          />
        </View>
        {showForm ? (
          <View style={styles.view}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.subheader}>Add Task</Text>
              <Button title="Cancel" onPress={() => setShowForm(false)} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setDescription}
              value={description}
              placeholder="Enter Task Description"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              onChangeText={setDate}
              value={date}
              placeholder="Due Date"
              autoCapitalize="none"
            />
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
                onValueChange={(value) => setTimeToComplete(value)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
              />
            </View>
            <Text style={styles.prompt}>Is Important?</Text>
            <Switch
              circleActiveColor={'#9ee7ff'}
              circleInActiveColor={'#f4f3f4'}
              backgroundActive={'rgb(7, 40, 82)'}
              backgroundInactive={'rgb(7, 40, 82)'}
              switchLeftPx={5}
              switchRightPx={5}
              onValueChange={toggleSwitch}
              value={isImportant}
            />
            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        ) : null}
        <TaskSummary />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
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
  input: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 10
  },
  prompt: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16
  },
  subheader: {
    color: '#1D426D',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },
  submitButton: {
    marginTop: 20,
  },
  text: {
    color: '#1D426D',
    marginBottom: 10
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start',
  },
  view: {
    backgroundColor: '#8ebac6',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
  }
});
export default Task;
