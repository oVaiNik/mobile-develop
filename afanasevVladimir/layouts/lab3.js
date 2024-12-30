import React, { useState, useMemo } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [useMemoEnabled, setUseMemoEnabled] = useState(true); // Состояние для переключения

  // Функция для выполнения вычислений
  const calculate = (n1, n2, op) => {
    const number1 = parseFloat(n1);
    const number2 = parseFloat(n2);

    if (isNaN(number1) || isNaN(number2)) return 0;

    switch (op) {
      case '+':
        return number1 + number2;
      case '-':
        return number1 - number2;
      case '*':
        return number1 * number2;
      case '/':
        return number2 !== 0 ? number1 / number2 : 'Ошибка: деление на ноль';
      default:
        return 0;
    }
  };

  // Используем useMemo для кэширования результата, если включен режим useMemo
  const result = useMemo(() => calculate(num1, num2, operation), [num1, num2, operation]);

  // Вычисляем результат без useMemo, если он отключен
  const resultWithoutMemo = calculate(num1, num2, operation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Калькулятор</Text>
      <TextInput
        style={styles.input}
        placeholder="Первое число"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Второе число"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={() => setOperation('+')} />
        <Button title="-" onPress={() => setOperation('-')} />
        <Button title="*" onPress={() => setOperation('*')} />
        <Button title="/" onPress={() => setOperation('/')} />
      </View>
      <Text style={styles.result}>
        Результат: {useMemoEnabled ? result : resultWithoutMemo}
      </Text>
      <Button
        title={`Переключить на ${useMemoEnabled ? 'без useMemo' : 'с useMemo'}`}
        onPress={() => setUseMemoEnabled(!useMemoEnabled)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default Calculator;
