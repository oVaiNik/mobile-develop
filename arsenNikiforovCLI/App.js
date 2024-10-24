import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Lab1 from './screens/Lab1';
import Lab2 from './screens/Lab2';
import Lab3 from './screens/Lab3';
import Lab4 from './screens/Lab4';
import SavedImage from './screens/SavedImage';

const Stack = createNativeStackNavigator();

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    card: '#FFFFFF',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    text: '#FFFFFF',
    primary: '#007AFF',
    card: '#000000',
  },
};

const App = () => {
  const theme = useSelector(state => state.theme);
  const navigationTheme = theme === 'light' ? LightTheme : CustomDarkTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Lab1" component={Lab1} />
        <Stack.Screen name="Lab2" component={Lab2} />
        <Stack.Screen name="Lab3" component={Lab3} />
        <Stack.Screen name="Lab4" component={Lab4} />
        <Stack.Screen name="SavedImage" component={SavedImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;