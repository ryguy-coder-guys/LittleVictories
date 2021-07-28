import React, { ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../Stylesheets/Stylesheet';
import { useUserContext } from '../../Contexts/userContext';
import 'react-native-get-random-values';
import { v4 as getKey } from 'uuid';
import starIcon from '../../../assets/images/star-circle-outline.png';

const UpcomingTasks = (): ReactElement => {
  const { user } = useUserContext();

  const formatDueDate = (dueDate: Date) => {
    if (dueDate) {
      const dateArr: string[] = dueDate.toString().split('-');
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
      const date = `${months[parseInt(dateArr[1]) - 1]} ${parseInt(
        dateArr[2]
      )}`;
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
      {user.tasks
        ?.filter((task) => !task.is_complete)
        .slice(0, 5)
        .map((task) => {
          return (
            <View style={styles.task} key={getKey()}>
              <Text
                style={user.readable_font ? textStyles.txt_big : textStyles.txt}
              >
                {task.description} - due {formatDueDate(task.due_date)}{' '}
              </Text>
              {task.is_important ? (
                <Image
                  source={starIcon}
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
      {!user.tasks.length ? (
        <Text style={user.readable_font ? textStyles.txt_big : textStyles.txt}>
          No upcoming tasks.
        </Text>
      ) : null}
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
    marginBottom: 20,
    padding: 20
  }
});

export default UpcomingTasks;
