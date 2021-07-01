import React, { useState } from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { format } from 'date-fns';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useJournalContext } from '../../Contexts/journalContext';
import moment from 'moment';

const Journal = () => {
  const { user } = useUserContext();
  const { journal, setJournal } = useJournalContext();
  const [date] = useState(moment().format('MMM Do Y'));
  const saveJournal = async () => {
    await axios.post('http://localhost:3000/api/journalEntries/create', {
      user_id: user.id,
      content: journal.content,
      date: moment().format('MM-D-Y'),
    });

    alert('Journal successfully saved.');
  };
  const clearJournal = () => {
    Alert.alert(
      'Are you sure?',
      'Once deleted, you cannot get this journal entry back.',
      [
        {
          text: 'Cancel',
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
            setJournal('');
            alert('Journal successfully cleared.');
          },
        },
      ]
    );
  };

  // const forward = () => {
  //   if (user) {
  //     if (!index) {
  //       return;
  //     }
  //     setIndex(index - 1);
  //     setText(user.entries[index].content);
  //     setDate(user.entries[index].date);
  //   }
  // };

  // const back = () => {
  //   if (user) {
  //     if (index === user.entries.length - 1) {
  //       return;
  //     }
  //     setIndex(index + 1);
  //     setText(user.entries[index].content);
  //     setDate(user.entries[index].date);
  //   }
  // };

  return (
    <View style={styles.main}>
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
      <View style={styles.textAreaContainer}>
        <Text style={styles.date}>{date}</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Type something"
          numberOfLines={10}
          multiline={true}
          onChangeText={(text) => setJournal({ ...journal, content: text })}
          value={journal.content}
          editable={true}
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
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginRight: 20,
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
  textArea: {
    height: '75%',
    justifyContent: 'flex-start',
    marginTop: 5,
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
