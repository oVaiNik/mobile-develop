import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const randomColor = () => {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
};

const randomPosition = () => ({
  x: Math.random() * (width - 100),
  y: Math.random() * (height - 300),
});

const Bubble = ({ id, removeBubble, onDrag, basket, gameOver }) => {
  const [scale] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const position = randomPosition();
  const [pan] = useState(new Animated.ValueXY(position));
  const [color] = useState(randomColor());

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      })
    ]).start(() => removeBubble(id));
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !gameOver,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
      const { x, y } = pan.__getValue();

      if (
        x + 50 > basket.x &&
        x + 50 < basket.x + basket.width &&
        y + 50 > basket.y &&
        y + 50 < basket.y + basket.height
      ) {
        onDrag();
        removeBubble(id);
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bubble,
        {
          left: position.x,
          top: position.y,
          opacity,
          transform: [
            { scale },
            { translateX: pan.x },
            { translateY: pan.y }
          ],
        },
      ]}
    >
      <Animated.View style={[styles.innerBubble, { backgroundColor: color }]} />
    </Animated.View>
  );
};

const Lab1 = ({ navigation }) => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const basket = {
    x: width / 2 - 50,
    y: height - 150,
    width: 100,
    height: 100,
  };

  const addBubble = useCallback(() => {
    const id = Date.now();
    setBubbles((prevBubbles) => [...prevBubbles, { id }]);
  }, []);

  const removeBubble = useCallback((id) => {
    setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
  }, []);

  const onDrag = useCallback(() => {
    setScore((prevScore) => prevScore + 1);
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(addBubble, 1000);
      return () => clearInterval(interval);
    }
  }, [addBubble, gameOver]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const resetGame = () => {
    setBubbles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <ImageBackground
      source={require('../assets/lab1.jpg')}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.infoButtonText}>Info</Text>
        </TouchableOpacity>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
        <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Lab2')}>
          <Text style={styles.switchButtonText}>Lab2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameArea}>
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            id={bubble.id}
            removeBubble={removeBubble}
            onDrag={onDrag}
            basket={basket}
            gameOver={gameOver}
          />
        ))}

        <View
          style={[
            styles.basket,
            {
              left: basket.x,
              top: basket.y,
              width: basket.width,
              height: basket.height,
            },
          ]}
        >
          <Text style={styles.basketText}>Basket</Text>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>How to Play</Text>
            <Text style={styles.modalText}>
              Neon bubbles will appear and grow on the screen. Drag them into the basket before they disappear! You have 15 seconds.
            </Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScoreText}>Bubbles Caught: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameArea: {
    flex: 1,
  },
  bubble: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBubble: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  header: {
    position: 'absolute',
    top: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  infoButton: {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  infoButtonText: {
    color: '#00ffff',
    fontSize: 18,
  },
  switchButton: {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  switchButtonText: {
    color: '#00ffff',
    fontSize: 18,
  },
  scoreContainer: {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  scoreText: {
    color: '#00ffff',
    fontSize: 18,
  },
  basket: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#00ffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketText: {
    color: '#00ffff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#001f3f',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#00ffff',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#00ffff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: '#001f3f',
    fontSize: 18,
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: '#00ffff',
    fontSize: 32,
    marginBottom: 20,
  },
  finalScoreText: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#00ffff',
    padding: 15,
    borderRadius: 10,
  },
  restartButtonText: {
    color: '#001f3f',
    fontSize: 18,
  },
});

export default Lab1;