import React, {useState, useEffect} from 'react';
import {Text, Button, View, TextInput, StyleSheet, ImageBackground} from 'react-native';


const Login = ({ navigation }) => {
  const image = { uri: 'https://i.pinimg.com/originals/4d/06/e1/4d06e1d42101b073bb0b4491f0aaa100.jpg' };

  return (
    <ImageBackground style= { styles.backgroundImage } source={image} imageStyle={{opacity: 0.7}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <>
          <Text style={{ fontSize: 30 }}>Welcome To</Text>
          <Text></Text>
          <Text style={{ fontSize: 30 }}>LittleVictories</Text>
          <Text></Text>
          <Button onPress={() => { navigation.navigate('index'); }} title="Enter" />
        </>
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
});

export default Login;