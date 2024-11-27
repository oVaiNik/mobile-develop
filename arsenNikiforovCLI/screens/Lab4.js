// screens/Lab4.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '../store/store';
import { ThemeContext } from '../ThemeContext';

const Lab4 = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',  // Черный фон для темной темы, белый для светлой
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: '900',
      color: theme === 'dark' ? '#ffffff' : '#000000',  // Белый для темной темы, черный для светлой
      marginBottom: 30,
      textTransform: 'uppercase',
    },
    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    themeText: {
      fontSize: 20,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      marginRight: 10,
    },
    counterText: {
      fontSize: 24,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      marginBottom: 20,
      fontWeight: '700',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: theme === 'dark' ? '#ffffff' : '#000000',  // Белый для темной темы, черный для светлой
      borderColor: theme === 'dark' ? '#000000' : '#ffffff',  // Черный для темной, белый для светлой
      borderWidth: 2,
      borderRadius: 50,
      marginHorizontal: 20,
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 30,
      color: theme === 'dark' ? '#000000' : '#ffffff',  // Черный для темной, белый для светлой
      fontWeight: 'bold',
    },
    switch: {
      transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme switcher</Text>
      <View style={styles.themeContainer}>
        <Text style={styles.themeText}>{theme === 'dark' ? 'dark mode' : 'light mode'}</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={theme === 'dark' ? '#000000' : '#ffffff'}
          style={styles.switch}
        />
      </View>
      <Text style={styles.counterText}>counter: {counter}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(incrementCounter())}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrementCounter())}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Lab4;
