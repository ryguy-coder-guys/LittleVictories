import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { useUserContext } from '../../Contexts/userContext';
import { v4 as getKey } from 'uuid';

const UpcomingTasks = () => {
  const { user } = useUserContext();

  const formatDueDate = (dueDate) => {
    if (dueDate) {
      const dateArr = dueDate.split('-');
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ];
      let date = `${months[parseInt(dateArr[1]) - 1]} ${parseInt(dateArr[2])}`;
      return date;
    }
  };

  return (
    <View style={styles.view}>
      <Text
        style={[
          user.readable_font ? textStyles.h2_big : textStyles.h2,
          { marginBottom: 10 }
        ]}
      >
        Upcoming Tasks
      </Text>
      {user.tasks?.slice(0, 5).map((task) => {
        return (
          <View style={styles.task} key={getKey()}>
            <Text
              style={user.readable_font ? textStyles.text_big : textStyles.text}
            >
              {task.description} - due {formatDueDate(task.due_date)}{' '}
            </Text>
            {task.is_important ? (
              <Image
                source={require('../../../assets/images/star-circle-outline.png')}
                style={{
                  resizeMode: 'contain',
                  width: 25,
                  height: 25
                }}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  view: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    padding: 20
  }
});

export default UpcomingTasks;
