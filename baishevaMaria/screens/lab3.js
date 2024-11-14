import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Lab3() {
  const [text, setText] = useState('');
  
  const charCount = useMemo(() => {
    console.log('Подсчитываем количество символов...');
    return text.length;
  }, [text]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите текст:</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholder="Введите что-нибудь..."
      />
      <Text style={styles.counter}>Количество символов: {charCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 18,
  },
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});