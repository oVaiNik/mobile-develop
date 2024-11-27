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
      fontSize: 28,  // Увеличиваем размер шрифта
      fontWeight: '900',  // Устанавливаем жирный шрифт
      color: colors.text,
      marginBottom: 20,
      textTransform: 'uppercase',  // Сделаем текст заглавными буквами
    },
    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    themeText: {
      fontSize: 20,  // Увеличиваем шрифт
      color: colors.text,
      marginRight: 10,
      fontWeight: '500',  // Чуть более легкий шрифт
    },
    counterText: {
      fontSize: 24,  // Увеличиваем шрифт
      color: colors.text,
      marginBottom: 20,
      fontWeight: '700',  // Увеличиваем жирность шрифта
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: theme === 'dark' ? '#555' : '#ccc',  // Темный фон для темной темы, светлый для светлой
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 50,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,  // Ширина кнопки
      height: 70,  // Высота кнопки
    },
    buttonText: {
      color: colors.text,
      fontSize: 30,  // Увеличиваем шрифт для большей выразительности
      fontWeight: 'bold',  // Жирный шрифт
    },
    switch: {
      transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],  // Увеличиваем размер переключателя
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
          thumbColor={colors.accent}
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
