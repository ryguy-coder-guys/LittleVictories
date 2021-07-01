import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const QuoteContext = createContext(null);

export const QuoteContextProvider = ({ children }) => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);

  const getQuote = async ():Promise<any> => {
    const { data } = await axios.get('https://zenquotes.io/api/random');
    setQuote(data[0].q);
    setAuthor(data[0].a);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <QuoteContext.Provider value={{ quote, author, getQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => useContext(QuoteContext);
