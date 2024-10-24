import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, incrementCounter, decrementCounter } from '../store/store';
import { useTheme } from '@react-navigation/native';
import ThemedBackground from '../components/ThemedBackground';

const Lab4 = ({ navigation }) => {
  const theme = useSelector(state => state.theme);
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [animationValue] = useState(new Animated.Value(0));

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      dispatch(setTheme(newTheme));
      animationValue.setValue(0);
    });
  };

  const animatedBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background, theme === 'light' ? '#000000' : '#FFFFFF'],
  });

  return (
    <ThemedBackground>
      <Animated.View style={[styles.container, { backgroundColor: animatedBackgroundColor }]}>
        <Text style={[styles.title, { color: colors.text }]}>Lab 4 - Redux Theme Switcher</Text>
        <Text style={[styles.text, { color: colors.text }]}>Текущая тема: {theme}</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={switchTheme}
          thumbColor={colors.primary}
        />
        <View style={styles.counterContainer}>
          <Text style={[styles.counterText, { color: colors.text }]}>Redux Counter: {counter}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => dispatch(incrementCounter())}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Increment Counter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => dispatch(decrementCounter())}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Decrement Counter</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Lab1')}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Перейти к Lab 1</Text>
        </TouchableOpacity>
      </Animated.View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Lab4;