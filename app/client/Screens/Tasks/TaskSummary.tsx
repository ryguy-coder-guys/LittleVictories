import React, { ReactElement } from 'react';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import { FlatList, View } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import SingleTask from './SingleTask';
import TaskForm from './TaskForm';

const TaskList = ({ item }): ReactElement => {
  return <SingleTask item={item} />;
};

const TaskSummary = (): ReactElement => {
  const { user } = useUserContext();

  return (
    <View style={{ height: '89.8%' }}>
      <FlatList
        keyExtractor={() => getKey()}
        data={user ? user.tasks : []}
        renderItem={TaskList}
        ListHeaderComponent={() => <TaskForm />}
      />
    </View>
  );
};

export default TaskSummary;
