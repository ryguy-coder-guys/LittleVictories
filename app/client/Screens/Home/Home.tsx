import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground } from 'react-native';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

const HomeTopTab = () => {
  const image = { uri: 'https://i.pinimg.com/originals/4d/06/e1/4d06e1d42101b073bb0b4491f0aaa100.jpg' };

  return (
    <ImageBackground style= { styles.backgroundImage } source={image} imageStyle=
      {{opacity: 0.7}}>
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


export default HomeTopTab;