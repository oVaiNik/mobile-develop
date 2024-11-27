// screens/Lab4.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '../store/store';
import { ThemeContext } from '../ThemeContext';

const Lab4 = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    themeText: {
      fontSize: 18,
      color: colors.text,
      marginRight: 10,
    },
    counterText: {
      fontSize: 22,
      color: colors.text,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      backgroundColor: colors.accent,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    buttonText: {
      color: colors.text,
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme switcher</Text>
      <View style={styles.themeContainer}>
        <Text style={styles.themeText}>dark mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={colors.accent}
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