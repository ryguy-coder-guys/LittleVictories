import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserContext } from './userContext';
import moment from 'moment';

const JournalContext = createContext(null);

export const JournalContextProvider = ({ children }) => {
  const [journal, setJournal] = useState(null);
  const [journals, setJournals] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const currentDate = moment().format('MM-D-Y');
    if (user) {
      setJournal(
        user.entries.find((entry) => entry.date === currentDate)
          ? user.entries.find((entry) => entry.date === currentDate)
          : { content: '', date: currentDate }
      );
      setJournals(user.entries);
    }
  }, [user]);

  return (
    <JournalContext.Provider
      value={{ journal, setJournal, journals, setJournals }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournalContext = () => useContext(JournalContext);
