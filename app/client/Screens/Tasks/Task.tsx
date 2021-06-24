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
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';

const Task = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const [showForm, setShowForm] = useState(false);

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
            <Button title="submit" onPress={() => setShowForm(false)}/>
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
  }

});
export default Task;
