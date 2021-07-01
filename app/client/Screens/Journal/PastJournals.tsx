import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useJournalContext } from "../../Contexts/journalContext";
import moment from "moment";
import { v4 as getKey } from "uuid";

const Journal1 = () => {
  const { journals } = useJournalContext();

<<<<<<< HEAD

  const saveJournal = async () => {
    await axios.post('http://localhost:3000/api/journalEntries/create', {
      user_id: user.id,
      content: text,
      //date: format(new Date(datePicked), 'MM-dd-yyyy'),
      date: moment().format('MM-D-Y')
    });
    // unshift
    alert('Journal successfully saved.');
  };
  const clearJournal = () => {
    Alert.alert(
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
=======
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

  const list = () => {
    return (
      <View>
        <FlatList
          keyExtractor={() => getKey()}
          data={journals.filter((journal) => {
            return journal.date < moment().format("MM-D-Y");
          })}
          renderItem={({ item: journal }) => {
            return (
              <View style={styles.textAreaContainer}>
                <Text style={styles.date}>{journal.date}</Text>
                <Text style={styles.text}>{journal.content}</Text>
              </View>
>>>>>>> 7fc89d9ae0bc748fc32e5cfe348e21720b4e5543
            );
          }}
        />
      </View>
    );
  };
<<<<<<< HEAD
  const forward = () => {
    if (user) {
      if (!index) {
        return;
      }
      setIndex(index - 1);
      // setText(user.entries[index].content);
      // setDate(user.entries[index].date);
      setText(journals[index].content);
      setDate(journals[index].date);
    }
  };
  const back = () => {
    if (user) {
      if (index === journals.length - 1) {
        return;
      }
      setIndex(index + 1);
      // setText(user.entries[index].content);
      // setDate(user.entries[index].date);
      setText(journals[index].content);
      setDate(journals[index].date);
    }
  };

  useEffect(() => {
    getJournal()
    console.log(user, 'user')
  }, [])

  const getJournal = async () => {
    await axios.get(`http://localhost:3000/api/journalEntries/${user.id}`)
    .then(({data}) => {
      console.log(data, 'getJournal Data');
        setJournals(data)
    } )
    .catch(err => console.warn(err))
  }

  const list = () => {
    if(user){
      return journals.map(journal => {
         if(journal.date < moment().format('MM-D-Y')){
           return (
             <View>
               <Text></Text>
             <View style={{ flexDirection: 'row', marginLeft: 20 }}>
           </View>
             <View style={styles.textAreaContainer}>
             <Text style={styles.date}>{journal.date}</Text>
            <Text>
              {journal.content}
            </Text>
            <Text></Text>
           </View>
                  {/* <AwesomeButton
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
               </AwesomeButton> */}
             </View>
           )
           //yoooo
             }
            })
    }
  }

=======
>>>>>>> 7fc89d9ae0bc748fc32e5cfe348e21720b4e5543

  return (
    <View>
      <Text style={styles.header}>Previous Journals</Text>
      {list()}
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    color: "#1D426D",
    fontSize: 18,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  header: {
    color: "#1D426D",
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  text: {
    color: "#1D426D",
    fontSize: 18,
  },
  textAreaContainer: {
    backgroundColor: "#8ebac6",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
});

export default Journal1;
