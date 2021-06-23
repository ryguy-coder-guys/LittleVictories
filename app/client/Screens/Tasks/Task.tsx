import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import { View, TextInput, StyleSheet, Text } from 'react-native';


const Task = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header} >Tasks</Text>

      <View style={styles.textAreaContainer} >
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          numberOfLines={10}
          multiline={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  textAreaContainer: {
    borderColor: '#d17373',
    borderWidth: 1,
    padding: 5,
    marginTop: 30,
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start'
  },
  header: {
    textAlign: 'center',
    color: '#9ee7ff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
});

export default Task;