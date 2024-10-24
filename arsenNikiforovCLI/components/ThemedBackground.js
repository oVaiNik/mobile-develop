// components/ThemedBackground.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ThemedBackground = ({ children }) => {
  const theme = useSelector(state => state.theme);

  const backgroundImage = theme === 'light'
    ? require('../assets/lab4_dark.jpg') 
    : require('../assets/lab4_light.jpg'); 

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default ThemedBackground;