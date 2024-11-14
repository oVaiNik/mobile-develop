import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [color, setColor] = useState('blue');
  const [position, setPosition] = useState({ top: 50, left: 50 });

  const changeColorAndPosition = () => {
    const newColor = color === 'blue' ? 'green' : 'blue';
    const newPosition = {
      top: Math.random() * 300,
      left: Math.random() * 300,
    };
    setColor(newColor);
    setPosition(newPosition);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.rectangle, { backgroundColor: color, top: position.top, left: position.left }]} />
      <TouchableOpacity style={styles.button} onPress={changeColorAndPosition}>
        <Text style={styles.buttonText}>Change Color & Position</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rectangle: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

