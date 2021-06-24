import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  username: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextState {
  user: User;
  setUser: (user: User) => void;
}

const UserDefaultValues: UserContextState = {
  user: null,
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
