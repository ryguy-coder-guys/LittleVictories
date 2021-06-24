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
            icon='plus'
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20
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
