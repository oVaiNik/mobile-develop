// screens/Lab3.js
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import useTheme from '../hooks/useTheme';

const { width } = Dimensions.get('window');

const OPERATIONS = ['+', '-', '*', '/'];
const MAX_LEVEL = 5;
const MAX_MISTAKES = 3;

const CalculatorButton = ({ value, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{value}</Text>
  </TouchableOpacity>
);

const ButtonRow = ({ values, onKeyPress }) => (
  <View style={styles.buttonRow}>
    {values.map((value, index) => (
      <CalculatorButton key={index} value={value} onPress={() => onKeyPress(value)} />
    ))}
  </View>
);

const Lab3 = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const colors = useTheme();

  const generateProblem = useCallback((level) => {
    const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
    let num1, num2;
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * (20 * level)) + 1;
        num2 = Math.floor(Math.random() * (20 * level)) + 1;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (20 * level)) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        break;
      case '*':
        num1 = Math.floor(Math.random() * (10 * level)) + 1;
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        break;
      case '/':
        num2 = Math.floor(Math.random() * (10 * level)) + 1;
        num1 = num2 * (Math.floor(Math.random() * (10 * level)) + 1);
        break;
    }
    return { num1, num2, operation };
  }, []);

  const calculateAnswer = useCallback((problem) => {
    const { num1, num2, operation } = problem;
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
    }
  }, []);

  const memoizedProblem = useMemo(() => {
    if (!currentProblem) {
      const newProblem = generateProblem(level);
      setCurrentProblem(newProblem);
      return newProblem;
    }
    return currentProblem;
  }, [level, currentProblem, generateProblem]);

  const handleKeyPress = useCallback(
    (key) => {
      ReactNativeHapticFeedback.trigger('selection');
      if (key === '⌫') {
        setUserAnswer(userAnswer.slice(0, -1));
      } else if (userAnswer.length < 8) {
        setUserAnswer(userAnswer + key);
      }
    },
    [userAnswer]
  );

  const checkAnswer = useCallback(() => {
    const memoizedAnswer = calculateAnswer(memoizedProblem);
    const userAnswerNum = parseFloat(userAnswer);

    if (Math.abs(userAnswerNum - memoizedAnswer) < 0.01) {
      ReactNativeHapticFeedback.trigger('notificationSuccess');
      setScore(score + level * 10);
      if (level < MAX_LEVEL) {
        setLevel(level + 1);
      } else {
        setGameOver(true);
      }
      setCurrentProblem(null);
    } else {
      ReactNativeHapticFeedback.trigger('notificationError');
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= MAX_MISTAKES) {
        setGameOver(true);
      }
    }
    setUserAnswer('');
  }, [userAnswer, memoizedProblem, level, score, mistakes, calculateAnswer]);

  const restartGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setCurrentProblem(null);
    setUserAnswer('');
    setMistakes(0);
  }, []);

  if (gameOver) {
    return (
      <View style={[styles.calculatorContainer, { backgroundColor: colors.background }]}>
        <View style={styles.scoreBoard}>
          <Text style={[styles.pixelText, { color: colors.text }]}>score: {score}</Text>
          <Text style={[styles.pixelText, { color: colors.text }]}>mistakes: {mistakes}</Text>
          <Text style={[styles.pixelText, { color: colors.text }]}>Game Over!</Text>
        </View>

        <TouchableOpacity style={styles.answerButton} onPress={restartGame}>
          <Text style={[styles.pixelText, { color: colors.text }]}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.calculatorContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topRow}>
        <View style={styles.scoreBoard}>
          <Text style={[styles.pixelText, { color: colors.text }]}>score: {score}</Text>
          <Text style={[styles.pixelText, { color: colors.text }]}>
            mistakes: {mistakes}/{MAX_MISTAKES}
          </Text>
        </View>
        <Text style={[styles.pixelText, { color: colors.text }]}>level: {level}</Text>
      </View>

      <View style={styles.equationContainer}>
        <Text style={[styles.equationText, { color: colors.text }]}>
          {memoizedProblem.num1} {memoizedProblem.operation} {memoizedProblem.num2} = ?
        </Text>
      </View>

      <View style={styles.resultDisplay}>
        <Text style={[styles.resultText, { color: colors.text }]}>
          {userAnswer || '___'}
        </Text>
      </View>

      <View style={styles.keypadContainer}>
        <ButtonRow values={['7', '8', '9']} onKeyPress={handleKeyPress} />
        <ButtonRow values={['4', '5', '6']} onKeyPress={handleKeyPress} />
        <ButtonRow values={['1', '2', '3']} onKeyPress={handleKeyPress} />

        <View style={styles.bottomRow}>
          <CalculatorButton value="." onPress={() => handleKeyPress('.')} />
          <CalculatorButton value="0" onPress={() => handleKeyPress('0')} />
          <CalculatorButton value="⌫" onPress={() => handleKeyPress('⌫')} />
        </View>
      </View>

      <TouchableOpacity style={styles.answerButton} onPress={checkAnswer}>
        <Text style={[styles.pixelText, { color: colors.text }]}>answer</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  calculatorContainer: {
    flex: 1,
    maxWidth: 480,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scoreBoard: {
    flexDirection: 'column',
  },
  pixelText: {
    fontFamily: 'Pixelify Sans, sans-serif',
    fontSize: 18,
    color: '#000',
  },
  equationContainer: {
    marginBottom: 10,
    marginTop: 140, // Добавлен marginTop для понижения уравнения
  },
  equationText: {
    fontFamily: 'Post No Bills Jaffna ExtraBold, sans-serif',
    fontSize: 35,
    color: '#000',
  },
  resultDisplay: {
    marginBottom: 20,
    marginTop: 20, // Добавлен marginTop для понижения отображения результата
  },
  resultText: {
    fontFamily: 'Pixelify Sans, sans-serif',
    fontSize: 50,
    textAlign: 'center',
    color: '#000',
  },
  keypadContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Добавлен marginTop для опускания клавиатуры
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    minHeight: 55,
    minWidth: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    fontFamily: 'Pixelify Sans, sans-serif',
    fontSize: 24,
    color: '#000',
  },
  answerButton: {
    borderRadius: 12,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    minHeight: 55,
    minWidth: 95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    marginTop: 20, // Добавлен marginTop для опускания кнопки ответа
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});

export default Lab3;