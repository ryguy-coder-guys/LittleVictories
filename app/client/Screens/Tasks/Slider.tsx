import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import Slider from '@react-native-community/slider';

const Slide = () => {
  const [value, setValue] = useState(0);
  return (
    <View>
      <View>
        <Text>
        How much time to complete this task?
        </Text>
        <Slider
          step={5}
          minimumValue={0}
          maximumValue={60}
          value={value}
          onValueChange={slideValue => setValue(slideValue)}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
        />
        <Text>
          Min: {value}min
        </Text>
      </View>
    </View>
  );
};

export default Slide;