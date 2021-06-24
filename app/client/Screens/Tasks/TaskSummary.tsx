import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { v4 as getKey } from 'uuid';

const thisWeek = ['finish blog post', 'prepare for presentation'];
const thisMonth = ['finish operation spark', 'find new place to live'];
const beyond = ['get job', 'get dog', 'get haircut'];

const Task = ({ item }) => {
  const [finished, setFinished] = useState(false);
  return (
    <Text
      style={{
        ...styles.taskText,
        textDecorationLine: finished ? 'line-through' : 'none',
      }}
      onPress={() => setFinished(!finished)}
    >
      {item}
    </Text>
  );
};

const TaskList = ({ item }) => {
  return <Task item={item} />;
};

const ListHeader = ({ heading }) => {
  return <Text style={styles.listHeader}>{heading}</Text>;
};

const TaskSummary = () => {
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="this week" />}
        data={thisWeek}
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="this month" />}
        data={thisMonth}
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="maybe later" />}
        data={beyond}
        renderItem={TaskList}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    opacity: 0.2,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  taskText: {
    fontSize: 17,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default TaskSummary;
