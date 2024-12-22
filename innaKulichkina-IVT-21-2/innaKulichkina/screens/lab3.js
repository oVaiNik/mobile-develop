import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const calculateFactorial = (n) => {
  console.log('Вычисляем факториал...');
  if (n < 0) return 'Нет значения'; // Отрицательные числа не имеют факториала
  return n === 0 ? 1 : n * calculateFactorial(n - 1);
};

const Lab3 = () => {
  const [input, setInput] = useState(''); // Текст из TextInput
  const [number, setNumber] = useState(0); // Преобразованное число

  // Оптимизация вычислений с помощью useMemo
  const factorial = useMemo(() => calculateFactorial(number), [number]);

  const handleChange = (text) => {
    setInput(text);
    const parsedNumber = parseInt(text, 10);
    if (!isNaN(parsedNumber)) {
      setNumber(parsedNumber);
    } else {
      setNumber(0); // Если текст не число, устанавливаем 0
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Факториал</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Введите число"
        value={input}
        onChangeText={handleChange}
      />
      <Text style={styles.result}>
        {input === ''
          ? 'Введите число'
          : `Факториал числа ${number}: ${factorial}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center',
  },
});

export default Lab3;
