import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

// Генерация случайного цвета
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Генерация случайной позиции внутри экрана
const randomPosition = () => ({
  top: Math.random() * (height - 100),
  left: Math.random() * (width - 100),
});

const Bubble = ({ id, removeBubble }) => {
  const [scale] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const [position] = useState(randomPosition());
  const [color] = useState(randomColor());

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1.5,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      delay: 1000,
      useNativeDriver: true,
    }).start(() => removeBubble(id));
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          backgroundColor: color,
          transform: [{ scale }],
          opacity,
          top: position.top,
          left: position.left,
        },
      ]}
    />
  );
};

const App = () => {
  const [bubbles, setBubbles] = useState([]);
  const [showHint, setShowHint] = useState(true);
  const [hintOpacity] = useState(new Animated.Value(1));

  const addBubble = () => {
    const id = Date.now();
    setBubbles([...bubbles, { id }]);

    if (showHint) {
      Animated.timing(hintOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowHint(false));
    }
  };

  const removeBubble = (id) => {
    setBubbles((bubbles) => bubbles.filter((bubble) => bubble.id !== id));
  };

  return (
    <ImageBackground
      source={require('./assets/mountain.png')} // путь к картинке
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.touchable} onPress={addBubble}>
        {bubbles.map((bubble) => (
          <Bubble key={bubble.id} id={bubble.id} removeBubble={removeBubble} />
        ))}

        {showHint && (
          <Animated.View style={[styles.hintContainer, { opacity: hintOpacity }]}>
            <Text style={styles.hintText}>Нажми на экран, чтобы создать пузырь!</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
