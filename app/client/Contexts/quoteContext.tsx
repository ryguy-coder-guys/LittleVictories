import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const quotes = [
  {
    q: "Whether you think you can or you think you can't, you're right.",
    a: 'Henry Ford'
  },
  {
    q: 'My mission in life is not merely to survive but to thrive and to do so with some passion, some compassion, some humor, and some style.',
    a: 'Maya Angelou'
  },
  {
    q: "I am thankful for my struggle because, without it, I wouldn't have stumbled across my strength.",
    a: 'Alex Elle'
  },
  {
    q: 'What you do makes a difference, and you have to decide what kind of difference you want to make.',
    a: 'Jane Goodall'
  },
  {
    q: "When you have a dream, you've got to grab it and never let go.",
    a: 'Carol Burnett'
  },
  { q: 'The secret of getting ahead is getting started.', a: 'Mark Twain' },
  {
    q: "I've missed more than 9,000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life and that is why I succeed.",
    a: 'Michael Jordan'
  },
  {
    q: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    a: 'Chinese Proverb'
  },
  { q: "It's hard to beat a person who never gives up.", a: 'Babe Ruth' },
  {
    q: "If people are doubting how far you can go, go so far that you can't hear them anymore.",
    a: 'Michele Ruiz'
  },
  { q: 'Everything you can imagine is real.', a: 'Pablo Picasso' },
  {
    q: 'When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.',
    a: 'Helen Keller'
  },
  { q: 'Do one thing every day that scares you.', a: 'Eleanor Roosevelt' },
  {
    q: 'Happiness is not something ready made. It comes from your own actions.',
    a: 'Dalai Lama XIV'
  },
  { q: 'Whatever you are, be a good one.', a: 'Abraham Lincoln' },
  { q: 'Impossible is just an opinion.', a: 'Paulo Coelho' },
  {
    q: 'Magic is believing in yourself. If you can make that happen, you can make anything happen.',
    a: 'Johann Wolfgang Von Goethe'
  },
  {
    q: 'How wonderful it is that nobody need wait a single moment before starting to improve the world.',
    a: 'Anne Frank'
  },
  {
    q: 'Great things are done by a series of small things brought together',
    a: 'Vincent Van Gogh'
  },
  {
    q: 'You can waste your lives drawing lines. Or you can live your life crossing them.',
    a: 'Shonda Rhimes'
  },
  {
    q: 'I now tried a new hypothesis: It was possible that I was more in charge of my happiness than I was allowing myself to be.',
    a: 'Michelle Obama'
  },
  {
    q: 'Work hard, be kind, and amazing things will happen.',
    a: "Conan O'Brien"
  },
  {
    q: "The big secret in life is that there is no secret. Whatever your goal, you can get there if you're willing to work.",
    a: 'Oprah Winfrey'
  },
  {
    q: 'Amateurs sit around and wait for inspiration. The rest of us just get up and go to work.',
    a: 'Stephen King'
  },
  { q: 'Nothing will work unless you do.', a: 'Maya Angelou' },
  {
    q: 'Start where you are. Use what you have. Do what you can.',
    a: 'Arthur Ashe'
  },
  { q: 'Make each day your masterpiece.', a: 'John Wooden' },
  {
    q: "Every champion was once a contender that didn't give up.",
    a: 'Gabby Douglas'
  },
  { q: 'I never lose. Either I win or learn.', a: 'Nelson Mandela' },
  {
    q: "You don't need to see the whole staircase, just take the first step.",
    a: 'Martin Luther King Jr.'
  },
  {
    q: "I didn't get there by wishing for it, but by working for it.",
    a: 'Estee Lauder'
  },
  { q: 'Trust yourself that you can do it and get it.', a: 'Baz Luhrmann' },
  {
    q: 'I attribute my success to this: I never gave or took an excuse.',
    a: 'Florence Nightingale'
  },
  {
    q: 'Life is so much a daily exercise in learning to love yourself and forgive yourself, over and over.',
    a: 'Jonathan Van Ness'
  },
  { q: "If you fall – I'll be there.", a: 'Floor' }
];

const QuoteContext = createContext(null);

export const QuoteContextProvider = ({ children }) => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);

  // const getQuote = async (): Promise<any> => {
  //   const { data } = await axios.get('https://zenquotes.io/api/random');
  //   setQuote(data[0].q);
  //   setAuthor(data[0].a);
  // };

  const getQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(quote.q);
    setAuthor(quote.a);
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
