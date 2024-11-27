<<<<<<< HEAD
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
=======
// Home.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
>>>>>>> c6d60465d0664b4c609ab22529f86e913a53ceff
import { ThemeContext } from '../ThemeContext';
import ThemedBackground from '../components/ThemedBackground';
import ThemedText from '../components/ThemedText';

<<<<<<< HEAD
const menuItems = [
  { id: 1, title: "Lab1" },
  { id: 2, title: "Lab2" },
  { id: 3, title: "Lab3" },
  { id: 4, title: "Lab4" },
];

function LabHeader({ colors }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, { color: colors.text }]}>
        Laboratory work
        {"\n"}
        Nikiforov Arsen
        {"\n"}
        FIIT-21
      </Text>
    </View>
  );
}

function LabButton({ title, onPress, colors }) {
  return (
    <TouchableOpacity 
      style={[styles.buttonContainer, { borderColor: colors.text }]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

function Home({ navigation }) {
  const { colors } = React.useContext(ThemeContext);

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LabHeader colors={colors} />
      {menuItems.map((lab) => (
        <LabButton 
          key={lab.id} 
          title={lab.title} 
          onPress={() => handleNavigation(lab.title.replace(' ', ''))}
          colors={colors}
        />
      ))}
    </View>
=======
const { width } = Dimensions.get('window');

const // App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { ThemeProvider } from './ThemeContext';
import store from './store/store';

import Home from './screens/Home';
import Lab1 from './screens/Lab1';
import Lab2 from './screens/Lab2';
import Lab3 from './screens/Lab3';
import Lab4 from './screens/Lab4';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Lab1" component={Lab1} />
            <Stack.Screen name="Lab2" component={Lab2} />
            <Stack.Screen name="Lab3" component={Lab3} />
            <Stack.Screen name="Lab4" component={Lab4} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;Home = ({ navigation }) => {
  const { colors } = useContext(ThemeContext);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const menuItems = [
    { screen: 'Lab1', text: 'Bubble Game', icon: '🎮' },
    { screen: 'Lab2', text: 'NASA API', icon: '🚀' },
    { screen: 'Lab3', text: 'Space Calculator', icon: '🧮' },
    { screen: 'Lab4', text: 'Redux Theme', icon: '⚙️' },
  ];

  return (
    <ThemedBackground>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
          <ThemedText style={styles.title}>CyberLabs 2077</ThemedText>
          <ThemedText style={styles.subtitle}>Лабораторные работы</ThemedText>
          <View style={styles.studentInfo}>
            <ThemedText style={styles.studentText}>Студент: Никифоров Арсен</ThemedText>
            <ThemedText style={styles.studentText}>Группа: ФИИТ-21</ThemedText>
          </View>
          <ThemedText style={styles.selectionText}>Выберите экран:</ThemedText>
          <View style={styles.menuContainer}>
            {menuItems.map(({ screen, text, icon }) => (
              <TouchableOpacity
                key={screen}
                onPress={() => handleNavigation(screen)}
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: colors.secondary,
                    borderColor: colors.border,
                    shadowColor: colors.shadow,
                  },
                ]}
              >
                <View style={styles.menuItemContent}>
                  <ThemedText style={styles.icon}>{icon}</ThemedText>
                  <ThemedText style={styles.menuText}>{text}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ThemedBackground>
>>>>>>> c6d60465d0664b4c609ab22529f86e913a53ceff
  );
};

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 226,
    paddingBottom: 226,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    fontFamily: "Pixelify Sans, sans-serif",
=======
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  card: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7289DA',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 15,
  },
  studentInfo: {
    marginBottom: 15,
    alignItems: 'center',
  },
  studentText: {
>>>>>>> c6d60465d0664b4c609ab22529f86e913a53ceff
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 1.4,
  },
<<<<<<< HEAD
  headerContainer: {
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },
  buttonContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 21,
    width: 184,
    maxWidth: "100%",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 12,
    paddingBottom: 12,
  },
  buttonText: {
    textAlign: "center",
=======
  selectionText: {
    fontSize: 18,
    marginBottom: 15,
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  menuText: {
    fontSize: 18,
>>>>>>> c6d60465d0664b4c609ab22529f86e913a53ceff
  },
});

export default Home;