import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, useTheme } from './ThemeContext';

import Lab1 from "./layouts/lab1";
import Lab2 from "./layouts/lab2-3";
import Lab4 from "./layouts/lab4";

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: isDarkTheme ? '#222' : '#fff' },
            headerStyle: { backgroundColor: isDarkTheme ? '#444' : '#fff' },
            headerTintColor: isDarkTheme ? '#fff' : '#000',
          }}
        >
          <Tab.Screen name="Lab1" component={Lab1} />
          <Tab.Screen name="Lab2" component={Lab2} />
          <Tab.Screen name="Lab4" component={Lab4} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppTabs;
