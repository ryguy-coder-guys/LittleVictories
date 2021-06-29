import React, { createContext, useContext, useState } from 'react';

export interface Entry {
  id: number;
  user_id: string;
  createdAt: Date;
  content: string;
  date: string;
  updatedAt: Date;
}

export interface Task {
  description: string;
  due_date: Date;
  id: number;
  is_complete: boolean;
  is_important: boolean;
  minutes_to_complete: number;
}
export interface User {
  id: string;
  username: string;
  tasks: Task[];
  points: number;
  level: number;
  entries: Entry[];
}

type moodType = 'great' | 'good' | 'ok' | 'bad' | 'terrible';
export interface UserStat {
  id: number;
  sleep_hours: number;
  eaten_well: boolean;
  exercised: boolean;
  notes: string;
  mood: moodType;
  date: string;
}

interface UserContextState {
  user: User;
  setUser: (user: User) => void;
  userStats: UserStat | null;
  setUserStats: (userStats: UserStat) => void;
}

export const UserDefaultValues: UserContextState = {
  user: { id: '', username: '', tasks: [], points: 0, level: 0, entries: [] },
  setUser: (user: User): void => {},
  userStats: null,
  setUserStats: (userStats: UserStat): void => {},
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
