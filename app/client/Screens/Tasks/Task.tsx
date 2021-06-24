import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
import Slider from './Slider';
import { Switch } from 'react-native-switch';


const Task = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const [showForm, setShowForm] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [tasks, setTasks] = useState([])
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [timeToComplete, setTimeToComplete] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // const handleSubmit = () => {


  // }

  const handleSubmit = async () => {
    const { data: tasks } = await axios.post('http://localhost:3000/api/tasks', {
      description,
      date,
      timeToComplete,
      isImportant,
    });
    setTasks((task) => [...task, tasks]);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Tasks</Text>
        <View>
          <FAB
            style={styles.fab}
            small
            color="blue"
            icon="plus"
            onPress={() => setShowForm(true)}
          />
        </View>
        {showForm ? (
          <View style={styles.view}>
            <View style={{ alignItems: 'center' }}>
            <Text style={styles.prompt}>Add Task</Text>
            <TextInput
              style={styles.input}
              // onChangeText={setSleepHours}
              // value={sleepHours}
              placeholder='Enter Task Description'
              autoCapitalize='none'
            />
            <TextInput
              style={styles.input}
              // onChangeText={setSleepHours}
              // value={sleepHours}
              placeholder='Due Date'
              autoCapitalize='none'
            />
            </View>
            <Slider/>
            <Text>Is Important?</Text>
            <Switch
          style={styles.switch}
          circleActiveColor={'#9ee7ff'}
          circleInActiveColor={'#f4f3f4'}
          backgroundActive={'rgb(7, 40, 82)'}
          backgroundInactive={'rgb(7, 40, 82)'}
          switchLeftPx={5}
          switchRightPx={5}
          onValueChange={toggleSwitch}
          value={isEnabled}
          />
            <Button title="submit" onPress={() => handleSubmit()}/>
            <Button title="x" onPress={() => setShowForm(false)}/>
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  textAreaContainer: {
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    opacity: 0.2,
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start',
  },
  header: {
    textAlign: 'center',
    color: '#9ee7ff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  prompt: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 10
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
  view: {
    backgroundColor: '#8ebac6',
    borderRadius: 20,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  switch: {
    marginBottom: '30%',
  },

});
export default Task;
