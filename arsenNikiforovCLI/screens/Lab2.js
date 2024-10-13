import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

const Lab2 = ({ navigation }) => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = () => {
    setLoading(true);
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => response.json())
      .then((data) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/lab2.jpg')}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Lab1')}>
          <Text style={styles.switchButtonText}>Lab1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ffff" />
        ) : (
          <>
            <Text style={styles.setupText}>{joke?.setup || 'Loading joke...'}</Text>
            <Text style={styles.punchlineText}>{joke?.punchline}</Text>
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={fetchJoke}>
          <Text style={styles.buttonText}>New Joke</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  switchButton: {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  switchButtonText: {
    color: '#00ffff',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  setupText: {
    color: '#00ffff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  punchlineText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00ffff',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#001f3f',
    fontSize: 18,
  },
});

export default Lab2;