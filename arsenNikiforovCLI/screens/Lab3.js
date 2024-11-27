import React, { useState, useMemo, useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

const OPERATIONS = ['+', '-', '*', '/'];
const MAX_LEVEL = 5;
const MAX_MISTAKES = 3;

const CalculatorButton = ({ value, onPress, style }) => (
  <TouchableOpacity 
    style={[styles.button, style]} 
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{value}</Text>
  </TouchableOpacity>
);

const ButtonRow = ({ values, onKeyPress }) => (
  <View style={styles.buttonRow}>
    {values.map((value, index) => (
      <CalculatorButton 
        key={index} 
        value={value} 
        onPress={() => onKeyPress(value)}
      />
    ))}
  </View>
);

const SpaceMathGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const { colors } = useContext(ThemeContext);

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
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
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

  const handleKeyPress = useCallback((key) => {
    ReactNativeHapticFeedback.trigger('selection');
    if (key === '⌫') {
      setUserAnswer(userAnswer.slice(0, -1));
    } else if (userAnswer.length < 8) {
      setUserAnswer(userAnswer + key);
    }
  }, [userAnswer]);

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
      <View style={styles.calculatorContainer}>
        <View style={styles.scoreBoard}>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreItem}>
              <Text style={styles.pixelText}>score: {score}</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.pixelText}>mistakes: {mistakes}</Text>
            </View>
          </View>
          <View style={styles.levelContainer}>
            <Text style={styles.pixelText}>Game Over!</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.answerButton} 
          onPress={restartGame}
        >
          <Text style={styles.pixelText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.calculatorContainer}>
      <View style={styles.scoreBoard}>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Text style={styles.pixelText}>score: {score}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.pixelText}>mistakes: {mistakes}/{MAX_MISTAKES}</Text>
          </View>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.pixelText}>level: {level}</Text>
        </View>
      </View>

      <View style={styles.equationContainer}>
        <Text style={styles.equationText}>
          {memoizedProblem.num1} {memoizedProblem.operation} {memoizedProblem.num2} = ?
        </Text>
      </View>

      <View style={styles.resultDisplay}>
        <Text style={styles.resultText}>{userAnswer || '___'}</Text>
      </View>

      <ButtonRow 
        values={['7', '8', '9']} 
        onKeyPress={handleKeyPress} 
      />
      <ButtonRow 
        values={['4', '5', '6']} 
        onKeyPress={handleKeyPress} 
      />
      <ButtonRow 
        values={['1', '2', '3']} 
        onKeyPress={handleKeyPress} 
      />

      <View style={styles.bottomRow}>
        <CalculatorButton 
          value="." 
          onPress={() => handleKeyPress('.')} 
        />
        <CalculatorButton 
          value="0" 
          onPress={() => handleKeyPress('0')} 
        />
        <CalculatorButton 
          value="⌫" 
          onPress={() => handleKeyPress('⌫')} 
        />
      </View>

      <TouchableOpacity 
        style={styles.answerButton} 
        onPress={checkAnswer}
      >
        <Text style={styles.pixelText}>answer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calculatorContainer: {
    display: 'flex',
    marginHorizontal: 'auto',
    maxWidth: 480,
    width: '100%',
    padding: 55,
    paddingBottom: 72,
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light background
  },
  pixelText: {
    fontFamily: 'Pixelify Sans, sans-serif',
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '500',
  },
  scoreBoard: {
    alignSelf: 'stretch',
    display: 'flex',
    width: '100%',
    gap: 20,
    justifyContent: 'space-between',
  },
  scoreContainer: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'column',
    gap: 10,
  },
  scoreItem: {
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
  },
  levelContainer: {
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
  },
  equationContainer: {
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 24,
    marginTop: 109,
    width: 146,
    padding: 4,
    alignItems: 'center',
  },
  equationText: {
    fontFamily: 'Post No Bills Jaffna ExtraBold, sans-serif',
    fontSize: 35,
  },
  resultDisplay: {
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 94,
    padding: 10,
    marginTop: -4,
    alignItems: 'center',
  },
  resultText: {
    fontFamily: 'Pixelify Sans, sans-serif',
    fontSize: 50,
    textAlign: 'center',
  },
  buttonRow: {
    display: 'flex',
    width: 240,
    maxWidth: '100%',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    borderRadius: 12,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    minHeight: 55,
    paddingHorizontal: 23,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Pixelify Sans, sans-serif',
    fontSize: 24,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '700',
    textAlign: 'center',
  },
  bottomRow: {
    display: 'flex',
    width: 230,
    maxWidth: '100%',
    alignItems: 'center',
    gap: 12,
    flexDirection: 'row',
    marginTop: 10,
  },
  answerButton: {
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 31,
    minHeight: 47,
    width: 184,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SpaceMathGame;