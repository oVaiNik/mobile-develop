// Lab4.js
import React, { useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '../store/store';
import { ThemeContext } from '../ThemeContext';

const Lab4 = ({ navigation }) => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  useEffect(() => {
    console.log('Counter updated:', counter);
  }, [counter]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    text: {
      fontSize: 16,
      marginBottom: 16,
      color: colors.text,
    },
    switch: {
      marginBottom: 24,
    },
    counterContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    counterText: {
      fontSize: 20,
      marginBottom: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      padding: 12,
      marginHorizontal: 8,
      borderRadius: 50,
      width: 120,
      alignItems: 'center',
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    navigationButtonsContainer: {
      alignItems: 'center',
      marginTop: 24,
    },
    navigationButton: {
      padding: 12,
      borderRadius: 24,
      alignItems: 'center',
      width: 200,
      marginVertical: 8,
      backgroundColor: colors.accent,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Theme Switcher</Text>
      <Text style={styles.text}>
        Current theme: {theme === 'light' ? 'Light' : 'Dark'}
      </Text>

      <Switch
        value={theme === 'dark'}
        onValueChange={toggleTheme}
        thumbColor={colors.accent}
        trackColor={{ false: colors.secondary, true: colors.primary }}
        style={styles.switch}
      />

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          Redux Counter: {counter}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(incrementCounter())}
          >
            <Text style={styles.buttonText}>Increment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(decrementCounter())}
          >
            <Text style={styles.buttonText}>Decrement</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate('Lab1')}
        >
          <Text style={styles.buttonText}>Go to Lab 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate('Lab2')}
        >
          <Text style={styles.buttonText}>Go to Lab 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate('Lab3')}
        >
          <Text style={styles.buttonText}>Go to Lab 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Lab4;