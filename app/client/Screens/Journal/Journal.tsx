import React, { useState, useEffect } from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
  Platform,
  Button
} from 'react-native';
import { format } from 'date-fns';
import IconA from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useJournalContext } from '../../Contexts/journalContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const Journal = () => {
  const bgImage = require('../../../assets/blue-gradient.png');

  const [text, setText] = useState('');
  const [date] = useState(format(new Date(), 'MMMM do y'));
  const { user } = useUserContext();
  const { journal } = useJournalContext();

  //state for selecting date
  const [datePicked, setDatePicked] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePicked;
    setDatePicked(currentDate);
  };

  useEffect(() => {
    setText(journal);
  }, []);

  const saveJournal = async () => {
    await axios.post('http://localhost:3000/api/journalEntries/create', {
      user_id: user.id,
      content: text,
      date: format(new Date(), 'MM-dd-yyyy'),
    });
    alert('Journal successfully saved.');
  };

  const clearJournal = () => {
    const areYouSure = Alert.alert(
      'Are you sure?',
      'Once deleted, you cannot get this journal entry back.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Clear Entry',
          onPress: async () => {
            await axios.post(
              'http://localhost:3000/api/journalEntries/create',
              {
                user_id: user.id,
                content: '',
                date: format(new Date(), 'MM-dd-yyyy'),
              }
            );
            setText('');
            alert('Journal successfully cleared.');
          },
        },
      ]
    );
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.header}> User's Journal </Text>
          <AwesomeButton
            backgroundColor={'#1D426D'}
            textColor={'#FAFAFA'}
            height={35}
            width={125}
            raiseLevel={0}
            borderRadius={8}
            style={styles.button}
            onPress={() => {
              clearJournal();
            }}
          >
            Clear Entry
          </AwesomeButton>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <IconA name="caret-back" size={35} color="#1D426D" />
          <IconA name="caret-forward" size={35} color="#1D426D" />
          <View>
          <View>
            <Text style={styles.text}>Select a Date:</Text>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={datePicked}
            display="default"
            onChange={onChange}
          />
          </View>
        </View>
        <View style={styles.textAreaContainer}>
          <Text style={styles.date}>{date}</Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            numberOfLines={10}
            multiline={true}
            onChangeText={setText}
            value={text}
          />
        </View>
        <AwesomeButton
          backgroundColor={'#1D426D'}
          textColor={'#FAFAFA'}
          height={35}
          width={125}
          raiseLevel={0}
          borderRadius={8}
          style={styles.submit}
          onPress={() => {
            saveJournal();
          }}
        >
          Save
        </AwesomeButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  button: {
    padding: 10,
    marginRight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  date: {
    color: '#1D426D',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  submit: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  text: {
    color: '#1D426D',
    fontSize: 16
  },
  textArea: {
    height: '75%',
    justifyContent: 'flex-start',
    marginTop: 20,
    color: '#1D426D',
    fontSize: 18
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
});

export default Journal;
