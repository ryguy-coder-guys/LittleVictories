import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import { View, TextInput, StyleSheet, Text, ImageBackground } from 'react-native';


const Journal = () => {
  const bgImage = require('../../../assets/blue-gradient.png');

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <Text style={styles.header}> User's Journal </Text>
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
    opacity: 0.2
  },
  textArea: {
    height: 550,
    width: 350,
    justifyContent: 'flex-start'
  },
  header: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20
  },
  button: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 15
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
});

export default Journal;