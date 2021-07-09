import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import { User, UserStat } from '../Interfaces/user';
import { useSocketContext } from '../Contexts/socketContext';

interface UserContextState {
  user: User;
  setUser: (user: User) => void;
  userStat: UserStat | null;
  setUserStat: (userStat: UserStat) => void;
  setLevel: (level: number) => void;
  setNumHabits: (numHabits: number) => void;
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
  setNumHabits: (numHabits: number): void => {}
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

  useEffect(() => {
    if (level === 1) {
      alert('level one');
    } else if (level === 5) {
      alert('level five');
    } else if (level === 10) {
      alert('level ten');
    }
  }, [level]);

  useEffect(() => {
    if (numHabits === 5) {
      alert('five habits');
    }
  }, [numHabits]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userStat,
        setUserStat,
        setLevel,
        setNumHabits
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
