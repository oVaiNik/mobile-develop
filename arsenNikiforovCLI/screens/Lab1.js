import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter } from '../store/store';
import ThemedBackground from '../components/ThemedBackground';
import { ThemedText } from '../components/ThemedText';
import Bubble from '../components/Bubble';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

function InfoBox() {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={[styles.infoBox, { borderColor: colors.text }]}>
      <Text style={[styles.infoText, { color: colors.text }]}>Info</Text>
    </View>
  );
}

const Lab1 = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { colors } = useContext(ThemeContext);

  const addBubble = useCallback(() => {
    const id = Date.now() + Math.random();
    setBubbles((prevBubbles) => [...prevBubbles, { id }]);
  }, []);

  const removeBubble = useCallback((id) => {
    setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
  }, []);

  const onDrag = useCallback(() => {
    setScore((prevScore) => prevScore + 5);
    dispatch(incrementCounter());
  }, [dispatch]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(addBubble, 2000);
      return () => clearInterval(interval);
    }
  }, [addBubble, gameOver]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const resetGame = () => {
    setBubbles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: colors.text }]}>
              score: {score}
              {'\n'}
              counter: {counter}
            </Text>
          </View>
          <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
            <InfoBox />
          </TouchableOpacity>
        </View>
        {!gameOver && (
          <TouchableOpacity style={styles.touchable} onPress={addBubble}>
            {bubbles.map((bubble) => (
              <Bubble
                key={bubble.id}
                id={bubble.id}
                removeBubble={removeBubble}
                onDrag={onDrag}
                gameOver={gameOver}
              />
            ))}
          </TouchableOpacity>
        )}

        <Modal transparent={true} visible={modalVisible} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>How to Play</Text>
              <Text style={[styles.modalText, { color: colors.text }]}>Create bubbles and drag them to earn points!</Text>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {gameOver && (
          <View style={[styles.gameOverContainer, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.gameOverText, { color: colors.text }]}>Game Over!</Text>
            <Text style={[styles.finalScoreText, { color: colors.text }]}>Your Score: {score}</Text>
            <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
              <Text style={styles.restartButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ThemedBackground>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 40,
    paddingBottom: 142,
    alignItems: 'stretch',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreContainer: {
    lineHeight: 28,
  },
  scoreText: {
    fontFamily: "Pixelify Sans, sans-serif",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  infoButton: {
    padding: 10,
  },
  touchable: {
    flex: 1,
  },
  infoBox: {
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 34,
    paddingVertical: 10,
    lineHeight: 1.4,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    width: 320,
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#03DAC6',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  gameOverContainer: {
    position: 'absolute',
    top: height / 3,
    left: width / 6,
    right: width / 6,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 22,
    fontWeight: '700',
  },
  finalScoreText: {
    fontSize: 18,
    marginVertical: 10,
  },
  restartButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#03DAC6',
  },
  restartButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

=======
>>>>>>> c6d60465d0664b4c609ab22529f86e913a53ceff
export default Lab1;