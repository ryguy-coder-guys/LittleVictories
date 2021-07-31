import React, { ReactElement } from 'react';
import RootNavigator from './client/Screens/Root/Root';
import { UserContextProvider } from './client/Contexts/userContext';
import { QuoteContextProvider } from './client/Contexts/quoteContext';
import { JournalContextProvider } from './client/Contexts/journalContext';
import { FeedContextProvider } from './client/Contexts/feedContext';
import { SocketContextProvider } from './client/Contexts/socketContext';
import FlashMessage from 'react-native-flash-message';

export default function App(): ReactElement {
  return (
    <SocketContextProvider>
      <QuoteContextProvider>
        <UserContextProvider>
          <FeedContextProvider>
            <JournalContextProvider>
              <RootNavigator />
              {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
              <FlashMessage position='top' />
            </JournalContextProvider>
          </FeedContextProvider>
        </UserContextProvider>
      </QuoteContextProvider>
    </SocketContextProvider>
  );
}
