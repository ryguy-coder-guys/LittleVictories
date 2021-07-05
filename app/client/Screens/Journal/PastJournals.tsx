import React, { ReactElement } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useJournalContext } from "../../Contexts/journalContext";
import moment from "moment";
import { v4 as getKey } from "uuid";

const Journal1 = () : ReactElement => {
  const { journals } = useJournalContext();

  // const clearJournal = () => {
  //   Alert.alert(
  //     'Are you sure?',
  //     'Once deleted, you cannot get this journal entry back.',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Clear Entry',
  //         onPress: async () => {
  //           await axios.post(
  //             'http://localhost:3000/api/journalEntries/create',
  //             {
  //               user_id: user.id,
  //               content: '',
  //               date: format(new Date(), 'MM-dd-yyyy'),
  //             }
  //           );
  //           // shift
  //           setText('');
  //           alert('Journal successfully cleared.');
  //         },
  //       },
  //     ]
  //   );
  // };

  const list = () : ReactElement => {
    return (
      <View>
        <FlatList
          keyExtractor={() => getKey()}
          data={journals.filter((journal) => {
            return journal.date < moment().format('MM-D-Y');
          })}
          renderItem={({ item: journal }) => {
            return (
              <View style={styles.textAreaContainer}>
                <Text style={styles.date}>{journal.date}</Text>
                <Text style={styles.text}>{journal.content}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.header}>Previous Journals</Text>
      {list()}
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    color: '#1D426D',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  text: {
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

export default Journal1;
