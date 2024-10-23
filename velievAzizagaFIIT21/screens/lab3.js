import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView } from 'react-native';

export default function Lab3() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Edward',
    'Frank',
    'George',
    'Hannah',
  ];

  // useMemo мемоизирует отфильтрованный список, чтобы пересчитывать его только при изменении searchTerm или списка пользователей
  const filteredUsers = useMemo(() => {
    console.log('Фильтрация пользователей...');
    return users.filter(user => user.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, users]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Поиск пользователей"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.user}>{item}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  user: {
    fontSize: 18,
    paddingVertical: 5,
  },
});
