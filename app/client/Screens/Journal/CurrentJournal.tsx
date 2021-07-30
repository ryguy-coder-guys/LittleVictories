import React, { ReactElement, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useJournalContext } from '../../Contexts/journalContext';
import moment from 'moment';
import {
  alertStyles,
  btnStyles,
  journalStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import { Button } from 'react-native-elements';
import { showMessage, hideMessage } from 'react-native-flash-message';

interface Message {
  type: string;
  autoHide: boolean;
  backgroundColor: string;
  icon: string;
  position: string;
  message: string;
}

// 12 Pro Max // 428 x 926
// 12 Pro 390 x 844
// 12 414 x 895
// 11 390 x 844
// XR 414 x 896
// XS 375 x 812
// XS Max 414 x 896
// X 375 x 812
// 8 Plus 414 x 736
// 8 375 x 667
// 7 Plus 414 x 736

const windowHeight = Dimensions.get('window').height;
// to calculate the correct height for journal entry text area
const calcHeight = () => {
  if (windowHeight > 850) {
    return '69%';
  } else if (windowHeight > 800) {
    return '63%';
  } else if (windowHeight > 600) {
    return '58%';
  }
  return '54%';
};

const Journal = (): ReactElement => {
  const { user } = useUserContext();
  const { journal, setJournal } = useJournalContext();
  const [date] = useState(moment().format('MMMM D, Y'));

  const displayMessage = (props = {}) => {
    const message: Message = {
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
      titleStyle: user.readable_font
        ? alertStyles.title_big
        : alertStyles.title,
      icon: { icon: 'success', position: 'left' },
      type: 'default',
      backgroundColor: '#1D426D'
    });
  };

  const clearJournal = (): void => {
    displayMessage({
      titleStyle: user.readable_font
        ? [alertStyles.title_big, { paddingTop: 30 }]
        : [alertStyles.title, { paddingTop: 30 }],
      style: alertStyles.bottomContainer,
      renderCustomContent: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            title='Cancel'
            style={journalStyles.alert_btn1}
            buttonStyle={{ backgroundColor: '#FAFAFA' }}
            titleStyle={{ color: '#1D426D' }}
            onPress={() => {
              hideMessage();
            }}
          />
          <Button
            title='Clear Entry'
            style={journalStyles.alert_btn2}
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
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          style={
            user.readable_font
              ? [textStyles.h1_big, { marginBottom: 0 }]
              : [textStyles.h1, { marginBottom: 0 }]
          }
        >
          User&apos;s Journal
        </Text>
      </View>
      <View style={styles.textAreaContainer}>
        <Text
          style={
            user.readable_font
              ? [textStyles.txt_big, { alignSelf: 'flex-end' }]
              : [textStyles.txt, { alignSelf: 'flex-end' }]
          }
        >
          {date}
        </Text>
        <TextInput
          style={
            user.readable_font
              ? [styles.textAreaLarger, { height: calcHeight() }]
              : [styles.textArea, { height: calcHeight() }]
          }
          placeholder='Type something'
          numberOfLines={10}
          multiline={true}
          onChangeText={(text) => setJournal({ ...journal, content: text })}
          value={journal?.content || ''}
          editable={true}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title='Clear Entry'
          buttonStyle={[btnStyles.btn, journalStyles.btn]}
          titleStyle={
            user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
          }
          onPress={() => {
            clearJournal();
          }}
        />
        <Button
          title='Save'
          buttonStyle={[
            btnStyles.btn,
            journalStyles.btn,
            { backgroundColor: '#1D426D' }
          ]}
          titleStyle={
            user.readable_font ? textStyles.btnTxt_big : textStyles.btnTxt
          }
          onPress={() => {
            void saveJournal();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20
  },
  main: {
    padding: 40
  },
  textArea: {
    marginTop: 5,
    color: '#1D426D',
    fontSize: 18
  },
  textAreaLarger: {
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
