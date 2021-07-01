import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserContext } from './userContext';
import axios from 'axios';
import { useSocketContext } from '../Contexts/socketContext';

interface Like {
  id: number;
  user_id: string;
  task_id: number;
  updatedAt: Date;
  createdAt: Date;
}

interface Comment {}

interface FeedItem {
  id: number;
  username: string;
  description: string;
  completed_at: Date;
  likes: Like[];
  comments: any[];
}

interface FeedContextState {
  feed: FeedItem[];
  setFeed: (feed: FeedItem[]) => void;
  socket: any;
}

const FeedDefaultValues: FeedContextState = {
  feed: [],
  setFeed: (feed: FeedItem[]): void => {},
  socket: null,
};

const FeedContext = createContext<FeedContextState>(FeedDefaultValues);

export const FeedContextProvider: React.FunctionComponent = ({ children }) => {
  const [feed, setFeed] = useState<FeedItem[]>(FeedDefaultValues.feed);

  const { socket } = useSocketContext();

  socket.on('connect', () => {
    console.log('socket connected');
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });

  socket.once('addToFeed', (feedItem) => {
    setFeed([...feed, feedItem]);
  });

  socket.once('removeFromFeed', (id) => {
    setFeed(feed.filter((feedItem) => feedItem.id !== id));
  });

  socket.once('addLike', (task) => {
    const mappedFeed = feed.map((feedItem) => {
      if (feedItem.id === task.id) {
        return task;
      }
      return feedItem;
    });
    setFeed(mappedFeed);
  });

  socket.once('removeLike', (task) => {
    const mappedFeed = feed.map((feedItem) => {
      if (feedItem.id === task.id) {
        return task;
      }
      return feedItem;
    });
    setFeed(mappedFeed);
  });

  socket.once('addComment', (task) => {
    const mappedFeed = feed.map((feedItem) => {
      if (feedItem.id === task.id) {
        return task;
      }
      return feedItem;
    });
    setFeed(mappedFeed);
  });

  socket.once('removeComment', (task) => {
    const mappedFeed = feed.map((feedItem) => {
      if (feedItem.id === task.id) {
        return task;
      }
      return feedItem;
    });
    setFeed(mappedFeed);
  });

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
    <FeedContext.Provider value={{ feed, setFeed, socket }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => useContext(FeedContext);
