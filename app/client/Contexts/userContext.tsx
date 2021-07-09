import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserStat } from '../Interfaces/user';
import { useSocketContext } from '../Contexts/socketContext';

interface UserContextState {
  user: User;
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

  // TODO: when you log out, reset state values to zero
  const [level, setLevel] = useState(0);
  const [levelBadges, setLevelBadges] = useState({});
  const [numHabits, setNumHabits] = useState(0);
  const [numHabitsBadges, setNumHabitsBadges] = useState({});
  const [numCompletedTasks, setNumCompletedTasks] = useState(0);
  const [numCompletedTasksBadges, setNumCompletedTasksBadges] = useState({});
  const [numFollowees, setNumFollowees] = useState(0);
  const [numFolloweesBadges, setNumFolloweesBadges] = useState({});

  useEffect(() => {
    if (level === 1 && !levelBadges[1]) {
      setLevelBadges({ ...levelBadges, 1: true });
      alert('level one');
    } else if (level === 5 && !levelBadges[5]) {
      alert('level five');
    } else if (level === 10 && !levelBadges[10]) {
      alert('level ten');
    }
  }, [level]);

  useEffect(() => {
    if (numHabits === 5 && !numHabitsBadges[5]) {
      setNumHabitsBadges({ ...numHabitsBadges, 5: true });
      alert('five habits');
    }
  }, [numHabits]);

  useEffect(() => {
    if (numCompletedTasks === 5 && !numCompletedTasksBadges[5]) {
      setNumCompletedTasksBadges({ ...numCompletedTasksBadges, 5: true });
      alert('five tasks');
    }
  }, [numCompletedTasks]);

  useEffect(() => {
    if (numFollowees === 3 && !numFolloweesBadges[3]) {
      setNumFolloweesBadges({ ...numCompletedTasksBadges, 3: true });
      alert('following three users');
    }
  }, [numFollowees]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userStat,
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

export const useUserContext = () => useContext(UserContext);
