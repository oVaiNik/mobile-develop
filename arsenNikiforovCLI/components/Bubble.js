// components/Bubble.js
import React, { useState, useEffect, useCallback } from 'react';
import { Animated, StyleSheet, PanResponder, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

const randomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;

const Bubble = ({ id, removeBubble, onDrag, basket, gameOver }) => {
  const [scale] = useState(new Animated.Value(0));
  const [popAnimation] = useState(new Animated.Value(1));
  const initialPosition = {
    x: Math.random() * (width - 100),
    y: Math.random() * (height - 300),
  };
  const [pan] = useState(new Animated.ValueXY(initialPosition));
  const [color] = useState(randomColor());

  useEffect(() => {
    const scaleAnimation = Animated.timing(scale, {
      toValue: 1.5,
      duration: 5000,
      useNativeDriver: false,
    });
    scaleAnimation.start(({ finished }) => {
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
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
      const { x, y } = pan.__getValue();
      const bubbleSize = 80 * scale.__getValue();

      if (
        x + bubbleSize / 2 > basket.x &&
        x + bubbleSize / 2 < basket.x + basket.width &&
        y + bubbleSize / 2 > basket.y &&
        y + bubbleSize / 2 < basket.y + basket.height
      ) {
        onDrag();
        handlePop();
      } else {
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
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: Animated.multiply(scale, popAnimation) },
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
});

export default Bubble;