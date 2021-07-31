import React, { createContext, useContext, useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { User, UserStat } from '../Interfaces/user';
import { useSocketContext } from '../Contexts/socketContext';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { badges } from '../badges';
import { alertStyles, badgeStyles } from '../Stylesheets/Stylesheet';
import { Style } from 'util';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [user, setUser] = useState<User>(UserDefaultValues.user);
  const [userStat, setUserStat] = useState<UserStat>(
    UserDefaultValues.userStat
  );

  const { socket } = useSocketContext();
  socket.removeAllListeners();

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

  interface Icon {
    icon: string;
    position: string;
  }
  interface Message {
    type: string;
    autoHide: boolean;
    backgroundColor: string;
    icon: Icon;
    position: string;
    message: string;
    titleStyle: Style;
    style: Style;
  }

  const displayMessage = (props = {}) => {
    const message: Message = {
      type: 'default',
      autoHide: false,
      backgroundColor: '#1D426D',
      icon: { icon: 'danger', position: 'right' },
      position: 'bottom',
      message: 'Congratulations!',
      titleStyle: user.readable_font
        ? [alertStyles.title_big, { paddingTop: 30 }]
        : [alertStyles.title, { paddingTop: 30 }],
      style: {
        width: '100%',
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
      'http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com/api/achievements',
      {
        user_id: user.id,
        achievement_type
      }
    );
    socket.emit('achievementAdded', newAchievement);
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
            style={badgeStyles.achievement_badge}
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
      void addAchievement('levelOne', 'Level 1 Reached');
    else if (level === 5 && !hasAchievement('levelFive'))
      void addAchievement('levelFive', 'Level 5 Reached');
    else if (level === 10 && !hasAchievement('levelTen'))
      void addAchievement('levelTen', 'Level 10 Reached');
  }, [level]);

  useEffect(() => {
    if (numCompletedTasks === 5 && !hasAchievement('fiveTasks'))
      void addAchievement('fiveTasks', '5 Completed Tasks');
  }, [numCompletedTasks]);

  useEffect(() => {
    if (numHabits === 5 && !hasAchievement('fiveHabits'))
      void addAchievement('fiveHabits', '5 Habits Added');
  }, [numHabits]);

  useEffect(() => {
    if (numFollowees === 3 && !hasAchievement('threeFollowees'))
      void addAchievement('threeFollowees', 'Added 3 Friends');
    else if (numFollowees === 5 && !hasAchievement('fiveFollowees'))
      void addAchievement('fiveFollowees', 'Added 5 Friends');
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

export const useUserContext = () => useContext(UserContext);
