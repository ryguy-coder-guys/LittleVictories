import React from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from './client/Screens/Root/Root';
import { UserContextProvider } from './client/Contexts/userContext';
import { QuoteContextProvider } from './client/Contexts/quoteContext';
import { JournalContextProvider } from './client/Contexts/journalContext';
import { FeedContextProvider } from './client/Contexts/feedContext';

export default function App() {
  return (
    <QuoteContextProvider>
      <UserContextProvider>
        <FeedContextProvider>
          <JournalContextProvider>
            <RootNavigator />
          </JournalContextProvider>
        </FeedContextProvider>
      </UserContextProvider>
    </QuoteContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
