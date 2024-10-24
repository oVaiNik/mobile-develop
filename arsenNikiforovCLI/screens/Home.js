import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const { colors } = useTheme();

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  const menuItems = [
    { path: 'Lab1', text: 'Bubble Game', icon: '🎮' },
    { path: 'Lab2', text: 'NASA API', icon: '🛸' },
    { path: 'Lab3', text: 'Space calculator', icon: '🧮' },
    { path: 'Lab4', text: 'Redux Theme', icon: '⚗️' }
  ];

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={[styles.title, { color: colors.text }]}>CyberLabs 2077</Text>
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
                style={styles.menuItem}
              >
                <View style={styles.menuItemContent}>
                  <Text style={styles.icon}>{icon}</Text>
                  <Text style={[styles.menuText, { color: colors.text }]}>{text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    borderWidth: 1,
    shadowColor: 'cyan',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'cyan',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  studentInfo: {
    marginBottom: 10,
    alignItems: 'center',
  },
  studentText: {
    fontSize: 18,
    color: 'cyan',
  },
  selectionText: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 20,
    width: '100%',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 10,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    color: 'cyan',
  },
  glowEffect: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: 'cyan',
    opacity: 0,
    zIndex: -1,
  },
});

export default Home;
