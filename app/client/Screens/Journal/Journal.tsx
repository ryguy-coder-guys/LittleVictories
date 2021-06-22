import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import { View, TextInput, StyleSheet, Text } from 'react-native';


const Journal = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header} >Users Journal</Text>
      <AwesomeButton
        height={30} width={100}  padding={10}
        style={styles.button}
        progress
        onPress={next => {
        /** Do Something **/
          next();
        }}
      >
      Clear Entry
      </AwesomeButton>
      <View style={styles.textAreaContainer} >
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <AwesomeButton
        height={30} width={100}  padding={10}
        style={styles.submitButton}
        progress
        onPress={next => {
        /** Do Something **/
          next();
        }}
      >
      Submit
      </AwesomeButton>
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
    height: 550,
    width: 350,
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

export default Journal;