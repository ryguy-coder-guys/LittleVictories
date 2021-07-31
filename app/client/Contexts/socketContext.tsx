import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const socket = io('http://ec2-3-131-151-82.us-east-2.compute.amazonaws.com');
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
