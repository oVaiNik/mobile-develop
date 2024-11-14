import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Импорт изображения
import SamuraiImage from '../assets/samurai.png';

function Home({navigation}) {
  const {colors} = useTheme();
  const theme = useSelector(state => state.theme);

  const handleNavigation = path => {
    navigation.navigate(path);
  };

  const menuItems = [
    {path: 'Lab1', text: 'Bubble Game', icon: '🎮'},
    {path: 'Lab2', text: 'NASA API', icon: '🛸'},
    {path: 'Lab3', text: 'Space Calculator', icon: '🧮'},
    {path: 'Lab4', text: 'Redux Theme', icon: '⚗️'},
  ];

  return (
    <ImageBackground source={SamuraiImage} style={styles.background}>
      <LinearGradient
        colors={
          theme === 'light'
            ? ['#ffffff', '#f0f0f0', '#e0e0e0']
            : ['#0f0c29', '#302b63', '#24243e']
        }
        style={styles.container}>
        <View style={styles.content}>
          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  theme === 'light'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(0, 0, 0, 0.8)',
                borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
              },
            ]}>
            <Text
              style={[
                styles.title,
                {
                  color: theme === 'light' ? '#4a90e2' : '#00FFFF',
                  textShadowColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
                },
              ]}>
              CyberLabs 2077
            </Text>

            <Text
              style={[
                styles.subtitle,
                {color: theme === 'light' ? '#333' : '#fff'},
              ]}>
              Лабораторные работы
            </Text>

            <View style={styles.studentInfo}>
              <Text
                style={[
                  styles.studentText,
                  {color: theme === 'light' ? '#4a90e2' : '#00FFFF'},
                ]}>
                Студент: Никифоров Арсен
              </Text>
              <Text
                style={[
                  styles.studentText,
                  {color: theme === 'light' ? '#4a90e2' : '#00FFFF'},
                ]}>
                Группа: ФИИТ-21
              </Text>
            </View>

            <Text
              style={[
                styles.selectionText,
                {color: theme === 'light' ? '#333' : '#fff'},
              ]}>
              Выберите экран:
            </Text>

            <View style={styles.menuContainer}>
              {menuItems.map(({path, text, icon}) => (
                <TouchableOpacity
                  key={path}
                  onPress={() => handleNavigation(path)}
                  style={[
                    styles.menuItem,
                    {
                      backgroundColor:
                        theme === 'light'
                          ? 'rgba(74, 144, 226, 0.15)'
                          : 'rgba(0, 255, 255, 0.15)',
                      borderColor: theme === 'light' ? '#4a90e2' : '#00FFFF',
                    },
                  ]}>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.icon}>{icon}</Text>
                    <Text
                      style={[
                        styles.menuText,
                        {color: theme === 'light' ? '#4a90e2' : '#00FFFF'},
                      ]}>
                      {text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 3,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'CyberFont',
    textAlign: 'center',
    marginBottom: 10,
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  studentInfo: {
    marginBottom: 10,
    alignItems: 'center',
  },
  studentText: {
    fontSize: 18,
  },
  selectionText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 20,
    width: '100%',
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginRight: 15,
  },
  menuText: {
    fontSize: 20,
  },
});

export default Home;
