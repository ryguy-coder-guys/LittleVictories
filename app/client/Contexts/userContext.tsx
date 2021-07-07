import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserStat } from '../Interfaces/user';

interface UserContextState {
  user: User;
  setUser: (user: User) => void;
  userStats: UserStat | null;
  setUserStats: (userStats: UserStat) => void;
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
    readable_font: false
  },
  setUser: (user: User): void => {},
  userStats: null,
  setUserStats: (userStats: UserStat): void => {}
};

const UserContext = createContext<UserContextState>(UserDefaultValues);

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(UserDefaultValues.user);
  const [userStats, setUserStats] = useState<UserStat>(
    UserDefaultValues.userStats
  );

  return (
    <UserContext.Provider value={{ user, setUser, userStats, setUserStats }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
