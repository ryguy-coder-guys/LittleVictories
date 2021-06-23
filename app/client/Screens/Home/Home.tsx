import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground } from 'react-native';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

const Home = () => {
  const bgImage = require('../../../assets/blue-gradient.png');

  return (
    <ImageBackground style= { styles.backgroundImage } source={bgImage}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomePage</Text>
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


export default Home;