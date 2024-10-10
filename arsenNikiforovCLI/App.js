import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const GAME_DURATION = 20000; // 20 seconds
const MAX_BUBBLE_SIZE = 100;
const BUBBLE_GROWTH_DURATION = 2000;
const BUBBLE_LIFESPAN = 5000;

const randomPosition = () => ({
  x: Math.random() * (width - MAX_BUBBLE_SIZE),
  y: Math.random() * (height - MAX_BUBBLE_SIZE - 100) + 100, // Avoid top area
});

const Bubble = ({id, onPop, onDrag}) => {
  const position = useRef(randomPosition()).current;
  const [pan] = useState(new Animated.ValueXY());
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const growAnimation = Animated.timing(scale, {
      toValue: 1,
      duration: BUBBLE_GROWTH_DURATION,
      useNativeDriver: true,
    });

    const popAnimation = Animated.timing(scale, {
      toValue: 0,
      duration: 200,
      delay: BUBBLE_LIFESPAN - 200,
      useNativeDriver: true,
    });

    Animated.sequence([growAnimation, popAnimation]).start(() => onPop(id));

    return () => {
      growAnimation.stop();
      popAnimation.stop();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > height - 100) {
          onDrag(id);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bubble,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}],
          left: position.x,
          top: position.y,
        },
      ]}
    />
  );
};

const App = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);

  const startGame = useCallback(() => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
    setBubbles([]);
  }, []);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setGameActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameActive]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setBubbles(prevBubbles => [...prevBubbles, {id: Date.now()}]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const handlePop = useCallback(id => {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));
  }, []);

  const handleDrag = useCallback(id => {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));
    setScore(prevScore => prevScore + 1);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.timerText}>Time: {timeLeft}s</Text>
      </View>

      {gameActive ? (
        bubbles.map(bubble => (
          <Bubble
            key={bubble.id}
            id={bubble.id}
            onPop={handlePop}
            onDrag={handleDrag}
          />
        ))
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScoreText}>Final Score: {score}</Text>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start New Game</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.basket} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#4a90e2',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bubble: {
    position: 'absolute',
    width: MAX_BUBBLE_SIZE,
    height: MAX_BUBBLE_SIZE,
    borderRadius: MAX_BUBBLE_SIZE / 2,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
  },
  basket: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 30,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
