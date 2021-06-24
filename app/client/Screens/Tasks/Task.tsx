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
  ScrollView,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import TaskSummary from './TaskSummary';

const Task = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const [isModalVisible, setModalVisible] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.header}>Tasks</Text>
          <FAB
            style={styles.fab}
            small
            icon='plus'
            onPress={() => setShowForm(true)}
          />
        </View>
        {showForm ? (
          <View style={styles.textAreaContainer}>
            <View style={styles.textArea}></View>
            {/* </View>
      <View style={styles.textAreaContainer}>
      <View style={styles.textArea}>

      </View>
      </View>
      <View style={styles.textAreaContainer}>
        <View style={styles.textArea}>

        </View> */}
            <Button title="Press Me" onPress={() => setShowForm(false)} />
          </View>
        ) : null}
        <TaskSummary />
      </ScrollView>
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
  }
});

export default Task;
