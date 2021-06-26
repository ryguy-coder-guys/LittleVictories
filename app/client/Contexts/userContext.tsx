import React, { createContext, useContext, useState } from 'react';

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
}

interface UserContextState {
  user: User;
  setUser: (user: User) => void;
}

const UserDefaultValues: UserContextState = {
  user: {id: '', username: '', tasks: [], points: 0, level: 0},
  setUser: (user: User): void => {},
};

const UserContext = createContext<UserContextState>(UserDefaultValues);

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(UserDefaultValues.user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
