import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useQuoteContext } from '../../Contexts/quoteContext';

const Loading = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const { quote, author } = useQuoteContext();

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.quote}>-{author}</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  quote: {
    fontSize: 16,
    color: '#1D426D',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5
  }
});

export default Loading;
