import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './userContext';
import { format } from 'date-fns';

const JournalContext = createContext(null);

export const JournalContextProvider = ({ children }) => {
  const [journal, setJournal] = useState(null);
  const { user } = useUserContext();

  // get today's journal
  const getJournal = async () => {
    if (user) {
      const user_id = user.id;
      const date = format(new Date(), 'MM-dd-yyyy');
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/journalEntries/${user_id}/${date}`
        );
        setJournal(data.content);
      } catch (err) {
        console.warn('journal load error', err.message);
      }
    }
  };

  useEffect(() => {
    if (user?.id?.length) {
      getJournal();
    }
  }, [user]);

  return (
    <JournalContext.Provider value={{ journal, setJournal }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournalContext = () => useContext(JournalContext);
