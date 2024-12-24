import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useMemo } from 'react';

const expensiveCalculation = (num) => {
  console.log('Выполняется сложное вычисление...');
  let result = 0;
  for (let i = 0; i < num * 1000000; i++) {
    result += Math.sin(i);
  }
  return result;
};

const Lab3 = () => {
  const [number, setNumber] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // Использование useMemo для кэширования результата вычисления
  const calculationResult = useMemo(
    () => expensiveCalculation(number),
    [number]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        Результат вычисления: {calculationResult.toFixed(2)}
      </Text>

      {/* Размещение кнопок */}
      <View style={styles.buttonContainer}>
        <Button
          title="Увеличить число"
          onPress={() => setNumber((prevNum) => prevNum + 1)}
        />
        <Button
          title="Показать дополнительный контент"
          onPress={() => setIsVisible(true)}
        />
      </View>

      {isVisible && (
        <Text style={styles.contentText}>Дополнительный контент</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Распределение элементов по вертикали
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Lab3;
