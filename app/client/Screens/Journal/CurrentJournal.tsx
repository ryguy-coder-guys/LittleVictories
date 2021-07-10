import React, { ReactElement, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useJournalContext } from '../../Contexts/journalContext';
import moment from 'moment';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { Button } from 'react-native-elements';
import { showMessage, hideMessage } from 'react-native-flash-message';

const Journal = (): ReactElement => {
  const { user } = useUserContext();
  const { journal, setJournal } = useJournalContext();
  const [date] = useState(moment().format('MMMM Do Y'));

  const displayMessage = (props = {}) => {
    const message: any = {
      type: 'default',
      autoHide: false,
      backgroundColor: '#1D426D',
      icon: 'warning',
      position: 'bottom',
      message:
        'Are you sure?\n\nOnce deleted, you cannot get this journal entry back.',
      ...props
    };

    showMessage(message);
  };

  const saveJournal = async (): Promise<void> => {
    await axios.post('http://localhost:3000/api/journalEntries/create', {
      user_id: user.id,
      content: journal.content,
      date: moment().format('MM-D-Y')
    });
    showMessage({
      message: 'Journal entry successfully saved.',
      titleStyle: { fontSize: 20, color: '#FAFAFA', alignSelf: 'center' },
      icon: { icon: 'success', position: 'left' },
      type: 'default',
      backgroundColor: '#1D426D'
    });
  };

  const clearJournal = (): void => {
    displayMessage({
      titleStyle: {
        fontSize: 20,
        color: '#FAFAFA',
        paddingTop: 30,
        textAlign: 'center'
      },
      style: {
        width: '100%',
        borderRadius: 0,
        paddingRight: 40
      },
      renderCustomContent: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            title='Cancel'
            style={[styles.button, { width: 100, marginTop: 10 }]}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={() => {
              hideMessage();
            }}
          />
          <Button
            title='Clear Entry'
            style={[styles.button, { width: 130, marginTop: 10 }]}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={async () => {
              await axios.delete(
                `http://localhost:3000/api/journalEntries/${
                  user.id
                }/${moment().format('MM-D-Y')}`
              );
              setJournal('');
              showMessage({
                message: 'Entry successfully deleted.',
                titleStyle: {
                  fontSize: 20,
                  color: '#FAFAFA',
                  alignSelf: 'center'
                },
                icon: { icon: 'success', position: 'left' },
                type: 'default',
                backgroundColor: '#1D426D'
              });
            }}
          />
        </View>
      )
    });
  };

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text style={user.readable_font ? textStyles.h1_big : textStyles.h1}>
          User's Journal{' '}
        </Text>
        <Button
          title='Clear Entry'
          buttonStyle={styles.button}
          titleStyle={
            user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
          }
          onPress={() => {
            clearJournal();
          }}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <Text style={user.readable_font ? styles.dateLarger : styles.date}>
          {date}
        </Text>
        <TextInput
          style={user.readable_font ? styles.textAreaLarger : styles.textArea}
          placeholder='Type something'
          numberOfLines={10}
          multiline={true}
          onChangeText={(text) => setJournal({ ...journal, content: text })}
          value={journal?.content || ''}
          editable={true}
        />
      </View>
      <Button
        title='Save'
        buttonStyle={[styles.button, styles.submit]}
        titleStyle={
          user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
        }
        onPress={() => {
          saveJournal();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#1D426D',
    borderRadius: 10
  },
  date: {
    color: '#1D426D',
    fontSize: 18,
    alignSelf: 'flex-end'
  },
  dateLarger: {
    color: '#1D426D',
    fontSize: 20,
    alignSelf: 'flex-end'
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20
  },
  main: {
    padding: 40
  },
  submit: {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  textArea: {
    height: '69%',
    justifyContent: 'flex-start',
    marginTop: 5,
    color: '#1D426D',
    fontSize: 18
  },
  textAreaLarger: {
    height: '69%',
    justifyContent: 'flex-start',
    marginTop: 5,
    color: '#1D426D',
    fontSize: 20
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  }
});

export default Journal;
