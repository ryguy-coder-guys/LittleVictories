import React, { ReactElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import List from './PastJournalsList';

const Journal = (): ReactElement => {
  const { user } = useUserContext();

  return (
    <View>
      <Text style={user.readable_font ? styles.headerLarger : styles.header}>
        Previous Journals
      </Text>
      <List />
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    color: '#1D426D',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  dateLarger: {
    color: '#1D426D',
    fontSize: 18,
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  header: {
    color: '#1D426D',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 20
  },
  headerLarger: {
    color: '#1D426D',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: 20
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  }
});

export default Journal;
