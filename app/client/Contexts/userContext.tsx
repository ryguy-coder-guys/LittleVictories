import React, { createContext, useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { User, UserStat } from '../Interfaces/user';
import { useSocketContext } from '../Contexts/socketContext';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { badges } from '../Screens/Home/Achievements';

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
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
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
    userStats: [],
    achievements: [],
    numCompletedTasks: 0,
    numFollowees: 0
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
  setNumFollowees: (numFollowees: number): void => {},
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean): void => {}
};

const UserContext = createContext<UserContextState>(UserDefaultValues);

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
  console.log('user context re-rendering');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  useEffect(() => {
    if (isLoggedIn) {
      setLevel(user.level);
      setNumHabits(user.habits.length);
      setNumCompletedTasks(user.numCompletedTasks);
      setNumFollowees(user.numFollowees);
    }
  }, [isLoggedIn]);

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

  const addAchievement = async (
    achievement_type: string,
    msg: string
  ): Promise<void> => {
    const { data: newAchievement } = await axios.post(
      'http://localhost:3000/api/achievements',
      {
        user_id: user.id,
        achievement_type
      }
    );
    setUser({ ...user, achievements: [...user.achievements, newAchievement] });
    showModal(achievement_type, msg);
  };

  const showModal = (achievement_type: string, text: string) => {
    displayMessage({
      description: text,
      textStyle: { textAlign: 'center', marginTop: 10, fontSize: 18 },
      renderCustomContent: () => (
        <TouchableOpacity>
          <Image
            source={badges[achievement_type].source}
            style={styles.image}
          />
        </TouchableOpacity>
      )
    });
  };

  const hasAchievement = (achievement_type: string): boolean => {
    return !!user.achievements.find(
      (achievement) => achievement.achievement_type === achievement_type
    );
  };

  useEffect(() => {
    if (level === 1 && !hasAchievement('levelOne'))
      addAchievement('levelOne', 'Level 1 Reached');
    else if (level === 5 && !hasAchievement('levelFive'))
      addAchievement('levelFive', 'Level 5 Reached');
    else if (level === 10 && !hasAchievement('levelTen'))
      addAchievement('levelTen', 'Level 10 Reached');
  }, [level]);

  useEffect(() => {
    if (numCompletedTasks === 5 && !hasAchievement('fiveTasks'))
      addAchievement('fiveTasks', '5 Completed Tasks');
  }, [numCompletedTasks]);

  useEffect(() => {
    if (numHabits === 5 && !hasAchievement('fiveHabits'))
      addAchievement('fiveHabits', '5 Habits Added');
  }, [numHabits]);

  useEffect(() => {
    if (numFollowees === 3 && !hasAchievement('threeFollowees'))
      addAchievement('threeFollowees', 'Added 3 Friends');
    else if (numFollowees === 5 && !hasAchievement('fiveFollowees'))
      addAchievement('fiveFollowees', 'Added 5 Friends');
  });

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
        setNumFollowees,
        isLoggedIn,
        setIsLoggedIn
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
