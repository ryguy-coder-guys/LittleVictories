import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import { useUserContext } from './userContext';
import axios from 'axios';
import { useSocketContext } from '../Contexts/socketContext';
import { FeedItem } from '../Interfaces/feed';

interface FeedContextState {
  feed: FeedItem[];
  setFeed: (feed: FeedItem[]) => void;
  refreshFeed: () => void;
  commentingId: number;
  setCommentingId: (commentingId: number) => void;
  commentingText: string;
  setCommentingText: (commentingText: string) => void;
}

export const FeedDefaultValues: FeedContextState = {
  feed: [],
  setFeed: (feed: FeedItem[]): void => {},
  refreshFeed: (): void => {},
  commentingId: 0,
  setCommentingId: (commentingId: number): void => {},
  commentingText: '',
  setCommentingText: (commentingText: string): void => {}
};

const FeedContext = createContext<FeedContextState>(FeedDefaultValues);

export const FeedContextProvider: React.FunctionComponent = ({ children }) => {
  console.log('feed context rerendering');

  const [commentingId, setCommentingId] = useState(0);
  const [commentingText, setCommentingText] = useState('');

  const [feed, setFeed] = useState<FeedItem[]>(FeedDefaultValues.feed);
  const { socket } = useSocketContext();
  socket.removeAllListeners();
  const { user, isLoggedIn } = useUserContext();

  const updateFeed = (task) => {
    const mappedFeed = feed.map((feedItem) => {
      if (feedItem.id === task.id) {
        return task;
      }
      return feedItem;
    });
    setFeed(mappedFeed);
  };

  socket.on('addToFeed', (feedItem) => {
    setFeed([feedItem, ...feed].slice(0, 10));
  });

  socket.on('removeFromFeed', (taskId) => {
    if (commentingId && taskId === commentingId) {
      setCommentingId(0);
      setCommentingText('');
    }
    setFeed(feed.filter((feedItem) => feedItem.id !== taskId));
  });
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
    if (isLoggedIn) {
      fetchFeed()
        .then((feed) => setFeed(feed))
        .catch((err) => console.warn(err));
    }
  }, [isLoggedIn]);

  return (
    <FeedContext.Provider
      value={{
        feed,
        setFeed,
        refreshFeed,
        commentingId,
        setCommentingId,
        commentingText,
        setCommentingText
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => useContext(FeedContext);
