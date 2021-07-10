import React, { createContext, useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { User, UserStat } from '../Interfaces/user';
import { useSocketContext } from '../Contexts/socketContext';
import { showMessage } from 'react-native-flash-message';

interface UserContextState {
  user: User;
  numHabits: number;
  numCompletedTasks: number;
  numFollowees: number;
  setUser: (user: User) => void;
  userStat: UserStat | null;
  setUserStat: (userStat: UserStat) => void;
  setLevel: (level: number) => void;
  setNumHabits: (numHabits: number) => void;
  setNumCompletedTasks: (numCompletedTasks: number) => void;
  setNumFollowees: (numFollowees: number) => void;
}

export const UserDefaultValues: UserContextState = {
  user: {
    id: '',
    username: '',
    tasks: [],
    habits: [],
    points: 0,
    level: 0,
    entries: [],
    readable_font: false,
    userStats: []
  },
  setUser: (user: User): void => {},
  userStat: null,
  numHabits: 0,
  numCompletedTasks: 0,
  numFollowees: 0,
  setUserStat: (userStat: UserStat): void => {},
  setLevel: (level: number): void => {},
  setNumHabits: (numHabits: number): void => {},
  setNumCompletedTasks: (numCompletedTasks: number): void => {},
  setNumFollowees: (numFollowees: number): void => {}
};

const UserContext = createContext<UserContextState>(UserDefaultValues);

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(UserDefaultValues.user);
  const [userStat, setUserStat] = useState<UserStat>(
    UserDefaultValues.userStat
  );

  const { socket } = useSocketContext();

  socket.on('disconnect', () => {
    if (user.id.length) {
      socket.emit('loggedOut', user.id);
    }
  });

  socket.on('reconnect', () => {
    if (user.id.length) {
      socket.emit('loggedIn', user.id);
    }
  });

  const [level, setLevel] = useState(0);
  const [numHabits, setNumHabits] = useState(0);
  const [numCompletedTasks, setNumCompletedTasks] = useState(0);
  const [numFollowees, setNumFollowees] = useState(0);

  const displayMessage = (props = {}) => {
    const message: any = {
      type: 'default',
      autoHide: false,
      backgroundColor: '#1D426D',
      icon: { icon: 'danger', position: 'right' },
      position: 'bottom',
      message: 'Congratulations!',
      titleStyle: {
        fontSize: 20,
        color: '#FAFAFA',
        paddingTop: 30,
        textAlign: 'center'
      },
      style: {
        width: '100%',
        borderRadius: 0,
        paddingLeft: 40
      },
      ...props
    };

    showMessage(message);
  };

  useEffect(() => {
    if (level === 1) {
      displayMessage({
        description: 'Level 1 Reached',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/ribbon_red.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    } else if (level === 5) {
      displayMessage({
        description: 'Level 5 Reached',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/ribbon_green.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    } else if (level === 10) {
      displayMessage({
        description: 'Level 10 Reached',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/ribbon_yellow.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    }
  }, [level]);

  useEffect(() => {
    if (numHabits === 5) {
      displayMessage({
        description: '5 Habits Added',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/trophy_pink.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    }
  }, [numHabits]);

  useEffect(() => {
    if (numCompletedTasks === 5) {
      displayMessage({
        description: '5 Completed Tasks',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/trophy_blue.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    }
  }, [numCompletedTasks]);

  useEffect(() => {
    if (numFollowees === 3) {
      displayMessage({
        description: 'Added 3 Friends',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/star_red.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    }
    if (numFollowees === 5) {
      displayMessage({
        description: 'Added 5 Friends',
        textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
        renderCustomContent: () => (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/star_green.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )
      });
    }
  }, [numFollowees]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userStat,
        numHabits,
        numCompletedTasks,
        numFollowees,
        setUserStat,
        setLevel,
        setNumHabits,
        setNumCompletedTasks,
        setNumFollowees
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  }
});

export const useUserContext = () => useContext(UserContext);
