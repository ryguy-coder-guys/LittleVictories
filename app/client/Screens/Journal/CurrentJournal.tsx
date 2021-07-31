import React, { ReactElement, useState } from 'react';
import { Dimensions, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import { useJournalContext } from '../../Contexts/journalContext';
import moment from 'moment';
import {
  alertStyles,
  btnStyles,
  containerStyles,
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
    return '75%';
  } else if (windowHeight > 800) {
    return '70%';
  } else if (windowHeight > 600) {
    return '67%';
  }
  return '60%';
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
    await axios.post(
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/journalEntries/create',
      {
        user_id: user.id,
        content: journal.content,
        date: moment().format('MM-D-Y')
      }
    );
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
                `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/journalEntries/${
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
    <View>
      <Text
        style={
          user.readable_font
            ? textStyles.screenHeading_big
            : textStyles.screenHeading
        }
      >
        Journal
      </Text>
      <View
        style={[
          containerStyles.section,
          { height: calcHeight(), paddingBottom: 60 }
        ]}
      >
        <View>
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
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
            placeholder='What are your thoughts?'
            multiline={true}
            numberOfLines={30}
            onChangeText={(text) => setJournal({ ...journal, content: text })}
            value={journal?.content || ''}
            editable={true}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title='Clear Entry'
          buttonStyle={[btnStyles.btn, { marginTop: 0 }]}
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
            { backgroundColor: '#1D426D', marginTop: 0 }
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

export default Journal;
