import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Journal from './client/Screens/Journal/Journal';
import RootNavigator from './client/Screens/Root/Root';
import * as Google from 'expo-google-app-auth';
import { UserContextProvider } from './client/Contexts/userContext';
import { QuoteContextProvider } from './client/Contexts/quoteContext';
import { JournalContextProvider } from './client/Contexts/journalContext';

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" /> */}
    //   <Journal/>
    // </View>
    <QuoteContextProvider>
      <UserContextProvider>
        <JournalContextProvider>
          <RootNavigator />
        </JournalContextProvider>
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
