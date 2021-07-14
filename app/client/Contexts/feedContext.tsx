import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserContext } from './userContext';
import axios from 'axios';
import { useSocketContext } from '../Contexts/socketContext';
import { FeedItem } from '../Interfaces/feed';
import { any } from 'sequelize/types/lib/operators';

interface FeedContextState {
  feed: FeedItem[];
  setFeed: (feed: FeedItem[]) => void;
  refreshFeed: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setQueue: (queue: any[]) => void;
}

export const FeedDefaultValues: FeedContextState = {
  feed: [],
  setFeed: (feed: FeedItem[]): void => {},
  refreshFeed: (): void => {},
  setIsEditing: (isEditing: boolean): void => {},
  setQueue: (queue: any[]): void => {}
};

const FeedContext = createContext<FeedContextState>(FeedDefaultValues);

export const FeedContextProvider: React.FunctionComponent = ({ children }) => {
  const [feed, setFeed] = useState<FeedItem[]>(FeedDefaultValues.feed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [queue, setQueue] = useState([]);

  const { socket } = useSocketContext();
  const { user } = useUserContext();

  useEffect(() => {
    if (!isEditing && queue.length) {
      // setFeed([...queue, ...feed]);
      console.log('update feed');
    }
  }, [isEditing]);

  const updateFeed = (task) => {
    const mappedFeed = feed.map((feedItem) => {
      if (feedItem.id === task.id) {
        return task;
      }
      return feedItem;
    });
    setFeed(mappedFeed);
  };

  socket.on(
    'addToFeed',
    (feedItem) => setFeed([feedItem, ...feed].slice(0, 10))
    // setQueue(feedItem)
  );
  socket.on('removeFromFeed', (taskId) =>
    setFeed(feed.filter((feedItem) => feedItem.id !== taskId))
  );
  socket.on('addLike', (task) => updateFeed(task));
  socket.on('removeLike', (task) => updateFeed(task));
  socket.on('addComment', (task) => updateFeed(task));
  socket.on('removeComment', (task) => updateFeed(task));

  const fetchFeed = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/tasks/${user.id}`
    );
    return data;
  };

  const refreshFeed = () => {
    fetchFeed()
      .then((feed) => setFeed(feed))
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    if (user.id.length) {
      fetchFeed()
        .then((feed) => setFeed(feed))
        .catch((err) => console.warn(err));
    }
  }, [user]);

  return (
    <FeedContext.Provider
      value={{ feed, setFeed, refreshFeed, setIsEditing, setQueue }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => useContext(FeedContext);
