import React, {useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setTheme, incrementCounter, decrementCounter} from '../store/store';
import {useTheme} from '@react-navigation/native';
import ThemedBackground from '../components/ThemedBackground';
import {ThemedText, TitleText, InfoText} from '../components/ThemedText';

const Lab4 = ({navigation}) => {
  const theme = useSelector(state => state.theme);
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const counterAnimation = useRef(new Animated.Value(counter)).current;

  useEffect(() => {
    Animated.timing(counterAnimation, {
      toValue: counter,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [counter]);

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <TitleText style={styles.title}>Lab 4 - Redux Theme Switcher</TitleText>

        <InfoText style={styles.text}>
          Текущая тема: {theme === 'light' ? 'Светлая' : 'Темная'}
        </InfoText>

        <Switch
          value={theme === 'dark'}
          onValueChange={switchTheme}
          thumbColor={theme === 'dark' ? '#FFF' : '#000'}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          style={styles.switch}
        />

        <View style={styles.counterContainer}>
          <Animated.Text
            style={[
              styles.counterText,
              {color: theme === 'light' ? '#333' : '#fff'},
            ]}>
            Redux Counter: {Math.round(counterAnimation.__getValue())}
          </Animated.Text>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
                borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
              },
            ]}
            onPress={() => dispatch(incrementCounter())}>
            <ThemedText style={styles.buttonText}>+ Увеличить</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
                borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
              },
            ]}
            onPress={() => dispatch(decrementCounter())}>
            <ThemedText style={styles.buttonText}>- Уменьшить</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.navigationButton,
            {
              backgroundColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
              borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
            },
          ]}
          onPress={() => navigation.navigate('Lab1')}>
          <ThemedText style={styles.buttonText}>Перейти к Lab 1</ThemedText>
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
    margin: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 5,
    textShadowColor: 'rgba(0,0,0,0.3)',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 26,
    marginBottom: 20,
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  navigationButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 250,
    borderWidth: 2,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Lab4;
