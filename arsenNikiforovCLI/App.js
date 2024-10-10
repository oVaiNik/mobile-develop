// App.js
import React, {useState, useEffect, useCallback} from 'react';
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
} from 'react-native';

const {width, height} = Dimensions.get('window');

const randomColor = () => {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
};

const randomPosition = () => ({
  x: Math.random() * (width - 100),
  y: Math.random() * (height - 300), // Избегаем пересечения с корзиной
});

const Bubble = ({id, removeBubble, onDrag, basket, gameOver}) => {
  const [scale] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const initialPosition = randomPosition();
  const [pan] = useState(new Animated.ValueXY({x: 0, y: 0}));
  const [color] = useState(randomColor());

  useEffect(() => {
    // Анимация появления и исчезновения пузыря
    const animations = Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: false, // Устанавливаем false для избегания конфликтов (а то че-то с версиями связано)
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        delay: 2000,
        useNativeDriver: false,
      }),
    ]);

    animations.start(() => removeBubble(id));

    return () => {
      animations.stop();
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !gameOver,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (evt, gestureState) => {
      const finalX = initialPosition.x + gestureState.dx;
      const finalY = initialPosition.y + gestureState.dy;

      if (
        finalX + 50 > basket.x &&
        finalX + 50 < basket.x + basket.width &&
        finalY + 50 > basket.y &&
        finalY + 50 < basket.y + basket.height
      ) {
        // Пузырь в корзине
        onDrag();
        removeBubble(id);
      } else {
        // Возвращаем пузырь на место
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bubble,
        {
          backgroundColor: color,
          opacity,
          transform: [{scale}, {translateX: pan.x}, {translateY: pan.y}],
          position: 'absolute',
          left: initialPosition.x,
          top: initialPosition.y,
        },
      ]}
    />
  );
};

const App = () => {
  const [bubbles, setBubbles] = useState([]);
  const [showHint, setShowHint] = useState(true);
  const [hintOpacity] = useState(new Animated.Value(1));
  const [score, setScore] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [joke, setJoke] = useState(null);
  const [jokeModalVisible, setJokeModalVisible] = useState(false);

  const basket = {
    x: width / 2 - 50,
    y: height - 150,
    width: 100,
    height: 100,
  };

  const addBubble = useCallback(() => {
    const id = Date.now();
    setBubbles(prevBubbles => [...prevBubbles, {id}]);

    if (showHint) {
      Animated.timing(hintOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowHint(false));
    }
  }, [showHint]);

  const removeBubble = useCallback(id => {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));
  }, []);

  const onDrag = useCallback(() => {
    setScore(prevScore => prevScore + 5);
  }, []);

  useEffect(() => {
    if (!gameOver) {
      // Интервал для добавления пузырей
      const interval = setInterval(addBubble, 2000);
      return () => clearInterval(interval);
    }
  }, [addBubble, gameOver]);

  useEffect(() => {
    // Анимация фона в зависимости от счета
    Animated.timing(backgroundColor, {
      toValue: score,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [score]);

  useEffect(() => {
    // Таймер для окончания игры через 20 секунд
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [
      'rgb(200, 200, 200)',
      'rgb(150, 200, 250)',
      'rgb(100, 250, 150)',
    ],
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const fetchJoke = useCallback(() => {
    fetch('https://official-joke-api.appspot.com/jokes/random')
      .then(response => response.json())
      .then(data => {
        setJoke(data);
        setJokeModalVisible(true);
      })
      .catch(error => console.error(error));
  }, []);

  if (gameOver) {
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Игра окончена!</Text>
        <Text style={styles.finalScoreText}>Ваш счет: {score}</Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: interpolatedBackgroundColor},
      ]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.infoButton} onPress={toggleModal}>
          <Text style={styles.infoButtonText}>Как играть</Text>
        </TouchableOpacity>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Счет: {score}</Text>
        </View>
        <TouchableOpacity style={styles.jokeButton} onPress={fetchJoke}>
          <Text style={styles.jokeButtonText}>Получить шутку</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.touchable} onPress={addBubble}>
        {bubbles.map(bubble => (
          <Bubble
            key={bubble.id}
            id={bubble.id}
            removeBubble={removeBubble}
            onDrag={onDrag}
            basket={basket}
            gameOver={gameOver}
          />
        ))}

        {showHint && (
          <Animated.View style={[styles.hintContainer, {opacity: hintOpacity}]}>
            <Text style={styles.hintText}>
              Нажмите на экран, чтобы создавать пузырьки!
            </Text>
          </Animated.View>
        )}

        {/* Корзина */}
        <View
          style={[
            styles.basket,
            {
              position: 'absolute',
              left: basket.x,
              top: basket.y,
              width: basket.width,
              height: basket.height,
            },
          ]}
        />
      </TouchableOpacity>

      {/* Модальное окно "Как играть" */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Как играть</Text>
            <Text style={styles.modalText}>
              Нажимайте на экран, чтобы создавать пузырьки. Перетаскивайте их в
              корзину, чтобы заработать больше очков. Пузырьки исчезают через
              несколько секунд, так что действуйте быстро!
            </Text>
            <Pressable style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Модальное окно для шутки */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={jokeModalVisible}
        onRequestClose={() => setJokeModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Шутка</Text>
            {joke && (
              <>
                <Text style={styles.modalText}>{joke.setup}</Text>
                <Text style={styles.modalText}>{joke.punchline}</Text>
              </>
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => setJokeModalVisible(false)}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    flex: 1,
  },
  bubble: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  hintContainer: {
    position: 'absolute',
    top: height / 2 - 50,
    width: '100%',
    alignItems: 'center',
  },
  hintText: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  jokeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  jokeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  scoreContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  basket: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  gameOverText: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 20,
  },
  finalScoreText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default App;
