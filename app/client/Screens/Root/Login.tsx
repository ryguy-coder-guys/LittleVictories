import React, {useState, useEffect} from 'react';
import {Text, Button, View, TextInput, StyleSheet, ImageBackground, Image} from 'react-native';


const Login = ({ navigation }) => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const logo = require('../../../assets/logo.png');

  return (
    <ImageBackground style= { styles.backgroundImage } source={bgImage}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <>
          <Image source={logo} />
          <Button color='#FAFAFA' onPress={() => { navigation.navigate('index'); }} title="Enter" />
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