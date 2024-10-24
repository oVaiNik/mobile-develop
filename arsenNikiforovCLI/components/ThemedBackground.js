import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const ThemedBackground = ({children}) => {
  const theme = useSelector(state => state.theme);

  const backgroundImage =
    theme === 'light'
      ? require('../assets/lab4_light.jpg')
      : require('../assets/lab4_dark.jpg');

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default ThemedBackground;