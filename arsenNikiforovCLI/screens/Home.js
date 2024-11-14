// Home.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from '../ThemeContext';

const { width, height } = Dimensions.get('window');

function Home({ navigation }) {
  const { colors } = useContext(ThemeContext);

  const handleNavigation = path => {
    navigation.navigate(path);
  };

  const menuItems = [
    { path: 'Lab1', text: 'Bubble Game', icon: '🎮' },
    { path: 'Lab2', text: 'NASA API', icon: '🛸' },
    { path: 'Lab3', text: 'Space Calculator', icon: '🧮' },
    { path: 'Lab4', text: 'Redux Theme', icon: '⚗️' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.secondary, borderColor: colors.primary }]}>
          <Text style={[styles.title, { color: colors.primary }]}>CyberLabs 2077</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>Лабораторные работы</Text>

          <View style={styles.studentInfo}>
            <Text style={[styles.studentText, { color: colors.text }]}>Студент: Никифоров Арсен</Text>
            <Text style={[styles.studentText, { color: colors.text }]}>Группа: ФИИТ-21</Text>
          </View>

          <Text style={[styles.selectionText, { color: colors.text }]}>Выберите экран:</Text>

          <View style={styles.menuContainer}>
            {menuItems.map(({ path, text, icon }) => (
              <TouchableOpacity
                key={path}
                onPress={() => handleNavigation(path)}
                style={[styles.menuItem, { backgroundColor: colors.secondary, borderColor: colors.primary }]}
              >
                <View style={styles.menuItemContent}>
                  <Text style={[styles.icon, { color: colors.primary }]}>{icon}</Text>
                  <Text style={[styles.menuText, { color: colors.text }]}>{text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1.5,
    width: '100%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 15,
  },
  studentInfo: {
    marginBottom: 15,
    alignItems: 'center',
  },
  studentText: {
    fontSize: 18,
    marginBottom: 2,
  },
  selectionText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 22,
    marginRight: 12,
  },
  menuText: {
    fontSize: 18,
  },
});

export default Home;