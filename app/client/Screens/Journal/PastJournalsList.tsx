import React, { ReactElement } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useJournalContext } from '../../Contexts/journalContext';
import { Button } from 'react-native-elements';
import moment from 'moment';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import axios from 'axios';
import { useUserContext } from '../../Contexts/userContext';
import {
  containerStyles,
  journalStyles,
  textStyles
} from '../../Stylesheets/Stylesheet';
import { showMessage, hideMessage } from 'react-native-flash-message';

const List = (): ReactElement => {
  const { journals, setJournals } = useJournalContext();
  const { user } = useUserContext();

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

  const clearJournal = (date: string) => {
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
                `http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/journalEntries/${user.id}/${date}`
              );
              const mappedJournals = journals.filter((entry) => {
                return entry.date !== date;
              });
              setJournals(mappedJournals);
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

  const format = (dateStr: string) => {
    const dateArr = dateStr.split('-');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];
    if (dateArr[0][0] === '0') {
      dateArr[0] = dateArr[0][1];
    }
    if (dateArr[1][0] === '0') {
      dateArr[1] = dateArr[1][1];
    }
    return `${months[parseInt(dateArr[0]) - 1]} ${dateArr[1]}, ${dateArr[2]}`;
  };

  return (
    <View>
      {journals.filter((journal) => journal.date < moment().format('MM-D-Y'))
        .length ? (
        <FlatList
          keyExtractor={() => getKey()}
          data={journals.filter((journal) => {
            return journal.date < moment().format('MM-D-Y');
          })}
          renderItem={({ item: journal }) => {
            return (
              <View style={containerStyles.section}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={
                      user.readable_font ? textStyles.txt_big : textStyles.txt
                    }
                  >
                    {format(journal.date)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      clearJournal(journal.date);
                    }}
                  >
                    <Image
                      style={{ resizeMode: 'contain', width: 25, height: 25 }}
                      source={require('../../../assets/images/minus-circle-outline.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={
                    user.readable_font ? textStyles.txt_big : textStyles.txt
                  }
                >
                  {journal.content}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={containerStyles.section}>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            No previous journals.
          </Text>
          <Text
            style={user.readable_font ? textStyles.txt_big : textStyles.txt}
          >
            Start documenting on the journals tab!
          </Text>
        </View>
      )}
    </View>
  );
};

export default List;
