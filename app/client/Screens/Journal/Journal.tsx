import React, { useState, useEffect } from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
  SafeAreaView,
} from 'react-native';
import { format } from 'date-fns';
import IconA from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useJournalContext } from '../../Contexts/journalContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressBar from '../Root/ProgressBar';
import { setDate, isToday } from 'date-fns/esm';

const Journal = () => {
  const bgImage = require('../../../assets/blue-gradient.png');

  const { user, setUser } = useUserContext();
  const { journal } = useJournalContext();

  const [datePicked, setDatePicked] = useState(new Date());
  const [text, setText] = useState(journal ? journal : '');
  const [date, setDate] = useState(format(new Date(), 'MMMM do y'));

  const [index, setIndex] = useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePicked;
    setDatePicked(currentDate);
  };

  const saveJournal = async () => {
    await axios.post('http://localhost:3000/api/journalEntries/create', {
      user_id: user.id,
      content: text,
      date: format(new Date(datePicked), 'MM-dd-yyy'),
      //date: format(new Date(), 'MM-dd-yyyy')
    });
    // unshift
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
            // shift
            setText('');
            alert('Journal successfully cleared.');
          },
        },
      ]
    );
  };

  const forward = () => {
    if (user) {
      if (!index) {
        return;
      }
      setIndex(index - 1);
      setText(user.entries[index].content);
      setDate(user.entries[index].date);
    }
  };

  const back = () => {
    if (user) {
      if (index === user.entries.length - 1) {
        return;
      }
      setIndex(index + 1);
      setText(user.entries[index].content);
      setDate(user.entries[index].date);
    }
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <ProgressBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
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
            {index < user?.entries.length - 1 && (
              <IconA
                name="caret-back"
                size={35}
                color="#1D426D"
                onPress={back}
              />
            )}
            {index > 0 && (
              <IconA
                name="caret-forward"
                size={35}
                color="#1D426D"
                onPress={forward}
              />
            )}
            {/* <View>
              <View>
                <Text style={styles.text}>Select a Date:</Text>
              </View>
              <DateTimePicker
                testID="dateTimePicker"
                value={datePicked}
                display="default"
                onChange={onChange}
              />
            </View> */}
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
              editable={
                user?.entries[index]
                 ? isToday(new Date(user.entries[index].createdAt))
                 : false
              }
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
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  button: {
    padding: 10,
    marginRight: 20,
  },
  container: {
    flex: 1,
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
  main: {
    padding: 20,
  },
  submit: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
  },
  text: {
    color: '#1D426D',
    fontSize: 16,
  },
  textArea: {
    height: '70%',
    justifyContent: 'flex-start',
    marginTop: 20,
    color: '#1D426D',
    fontSize: 18,
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
