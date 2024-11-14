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
import {useSelector, useDispatch} from 'react-redux';
import {incrementCounter} from '../store/store';
import ThemedBackground from '../components/ThemedBackground';
import {ThemedText, InfoText} from '../components/ThemedText';
import {Easing} from 'react-native'; // Добавляем импорт Easing

const {width, height} = Dimensions.get('window');

const randomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;

const randomPosition = () => ({
  x: Math.random() * (width - 100),
  y: Math.random() * (height - 300),
});

const Bubble = ({id, removeBubble, onDrag, basket, gameOver}) => {
  const [scale] = useState(new Animated.Value(0));
  const [popAnimation] = useState(new Animated.Value(1)); // Создаем анимацию лопания
  const initialPosition = randomPosition();
  const [pan] = useState(
    new Animated.ValueXY({x: initialPosition.x, y: initialPosition.y}),
  );
  const [color] = useState(randomColor());

  useEffect(() => {
    const scaleAnimation = Animated.timing(scale, {
      toValue: 1.5,
      duration: 5000,
      useNativeDriver: false,
    });
    scaleAnimation.start(({finished}) => {
      if (finished) {
        removeBubble(id);
      }
    });
  }, [removeBubble, id]);

  const handlePop = useCallback(() => {
    Animated.timing(popAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => removeBubble(id));
  }, [popAnimation, removeBubble, id]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !gameOver,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
      const {x, y} = pan.__getValue();
      const bubbleSize = 80 * scale.__getValue();

      if (
        x + bubbleSize / 2 > basket.x &&
        x + bubbleSize / 2 < basket.x + basket.width &&
        y + bubbleSize / 2 > basket.y &&
        y + bubbleSize / 2 < basket.y + basket.height
      ) {
        onDrag();
        handlePop(); // Вызываем анимацию лопания
      } else {
        // Если не попали в корзину, просто убираем смещение
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
          backgroundColor: color,
          transform: [
            {translateX: pan.x},
            {translateY: pan.y},
            {scale: Animated.multiply(scale, popAnimation)}, // Применяем анимацию лопания
          ],
        },
      ]}
    />
  );
};

const Lab1 = ({navigation}) => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

const basket = {
  x: width / 2 - 50,
  y: height - 200, 
  width: 100,
  height: 100,
};


  const addBubble = useCallback(() => {
    const id = Date.now() + Math.random();
    setBubbles(prevBubbles => [...prevBubbles, {id}]);
  }, []);

  const removeBubble = useCallback(id => {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));
  }, []);

  const onDrag = useCallback(() => {
    setScore(prevScore => prevScore + 5);
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
    <ThemedBackground
      source={require('../assets/mountain.png')}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setModalVisible(true)}>
          <InfoText style={styles.infoButtonText}>Инфо</InfoText>
        </TouchableOpacity>
        <View style={styles.scoreContainer}>
          <ThemedText style={styles.scoreText}>Счет: {score}</ThemedText>
        </View>

        <View style={styles.reduxContainer}>
          <Text style={styles.reduxText}>Redux Counter: {counter}</Text>
        </View>
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

        <View
          style={[
            styles.basket,
            {
              left: basket.x,
              top: basket.y,
              width: basket.width,
              height: basket.height,
            },
          ]}>
          <InfoText style={styles.basketText}>Корзина</InfoText>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Как играть</Text>
            <Text style={styles.modalText}>
              Создавайте пузырьки и перетаскивайте их в корзину, чтобы
              заработать очки!
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Игра окончена!</Text>
          <Text style={styles.finalScoreText}>Ваш счет: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Играть снова</Text>
          </TouchableOpacity>
        </View>
      )}
    </ThemedBackground>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
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
  reduxContainer: {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  reduxText: {
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
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#00ffff',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    color: 'white',
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#00ffff',
    padding: 10,
    borderRadius: 10,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Lab1;
