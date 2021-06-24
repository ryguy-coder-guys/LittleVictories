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
        ListHeaderComponent={() => <ListHeader heading="Today" />}
        data={thisWeek}
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="This Week" />}
        data={thisMonth}
        renderItem={TaskList}
        style={styles.listContainer}
      />
      <FlatList
        ListHeaderComponent={() => <ListHeader heading="Later" />}
        data={beyond}
        renderItem={TaskList}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    padding: 20
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#1D426D'
  },
  taskText: {
    fontSize: 14,
    paddingTop: 5,
    color: '#1D426D'
  },
});

export default TaskSummary;
