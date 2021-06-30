import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserContext } from './userContext';
import axios from 'axios';

interface Like {}

interface Comment {}

interface FeedItem {
  id: number;
  username: string;
  description: string;
  completed_at: Date;
  likes: any[];
  comments: any[];
}

interface FeedContextState {
  feed: FeedItem[];
  setFeed: (feed: FeedItem[]) => void;
}

const FeedDefaultValues: FeedContextState = {
  feed: [],
  setFeed: (feed: FeedItem[]): void => {},
};

const FeedContext = createContext<FeedContextState>(FeedDefaultValues);

export const FeedContextProvider: React.FunctionComponent = ({ children }) => {
  const [feed, setFeed] = useState<FeedItem[]>(FeedDefaultValues.feed);

  const { user } = useUserContext();

  const fetchFeed = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/tasks/${user.id}`
    );
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchFeed()
        .then((feed) => {
          console.log(feed);
          setFeed(feed);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => useContext(FeedContext);
