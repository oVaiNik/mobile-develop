import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setTheme} from '../store/store';

const Lab4 = ({navigation}) => {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <ImageBackground
      source={
        theme === 'light'
          ? require('../assets/lab4_light.jpg')
          : require('../assets/lab4_dark.jpg')
      }
      style={styles.container}>
      <Text style={styles.title}>Lab 4 - Redux Theme Switcher</Text>
      <Text style={styles.text}>Текущая тема: {theme}</Text>
      <TouchableOpacity style={styles.button} onPress={switchTheme}>
        <Text style={styles.buttonText}>Сменить тему</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lab1')}>
        <Text style={styles.buttonText}>Перейти к Lab 1</Text>
      </TouchableOpacity>
    </ImageBackground>
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
    color: '#007AFF',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Lab4;
