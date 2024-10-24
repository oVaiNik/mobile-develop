// Lab4.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
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

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <ThemedBackground>
      <View style={[
        styles.container,
        {
          backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
        }
      ]}>
        <Text style={[
          styles.title,
          {
            color: theme === 'light' ? '#4a90e2' : '#00FFFF',
            textShadowColor: theme === 'light' ? '#4a90e2' : '#00FFFF'
          }
        ]}>Lab 4 - Redux Theme Switcher</Text>
        
        <Text style={[
          styles.text,
          { color: theme === 'light' ? '#333' : '#fff' }
        ]}>Текущая тема: {theme === 'light' ? 'Светлая' : 'Темная'}</Text>
        
        <Switch
          value={theme === 'dark'}
          onValueChange={switchTheme}
          thumbColor={theme === 'dark' ? '#FFF' : '#000'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          style={styles.switch}
        />

        <View style={styles.counterContainer}>
          <Text style={[
            styles.counterText,
            { color: theme === 'light' ? '#333' : '#fff' }
          ]}>Redux Counter: {counter}</Text>
          
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
                borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF'
              }
            ]}
            onPress={() => dispatch(incrementCounter())}
          >
            <Text style={[
              styles.buttonText,
              { color: theme === 'light' ? '#fff' : '#000' }
            ]}>+ Увеличить</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
                borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF'
              }
            ]}
            onPress={() => dispatch(decrementCounter())}
          >
            <Text style={[
              styles.buttonText,
              { color: theme === 'light' ? '#fff' : '#000' }
            ]}>- Уменьшить</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.navigationButton,
            {
              backgroundColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
              borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF'
            }
          ]}
          onPress={() => navigation.navigate('Lab1')}
        >
          <Text style={[
            styles.buttonText,
            { color: theme === 'light' ? '#fff' : '#000' }
          ]}>Перейти к Lab 1</Text>
        </TouchableOpacity>
      </View>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 30,
    margin: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
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
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  switch: {
    marginBottom: 30,
  },
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 50,
    width: 200,
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  navigationButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 250,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Lab4;