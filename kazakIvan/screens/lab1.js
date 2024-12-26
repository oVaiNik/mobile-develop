import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from 'react-native-svg';

// Компонент для отображения точки
const Dot = ({ position, visible }) => {
  return (
    <View
      style={[
        styles.dot,
        position,
        { opacity: visible ? 1 : 0 }, // Управление видимостью точки
      ]}
    />
  );
};

const BackArrow = () => {
  return (
    <View style={styles.arrowContainer}>
      <Svg width={35} height={35} viewBox="0 0 35 35" fill="none">
        <Path
          d="M22.6552 5.12604L10.2812 17.5L22.6552 29.874L24.7188 27.8119L14.4054 17.5L24.7188 7.18812L22.6552 5.12604Z"
          fill="black"
        />
      </Svg>
    </View>
  );
};

export default function Lab1() {
  const [randomNumber, setRandomNumber] = useState(1);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    setRandomNumber(number);
  };

  // Карта позиций точек
  const dotPositions = [
    { top: "25%", left: "25%", transform: [{ translateX: -20 }, { translateY: -20 }] }, // Верхняя левая точка
    { top: "50%", left: "25%", transform: [{ translateX: -20 }, { translateY: -20 }] }, // Левая точка
    { bottom: "25%", left: "25%", transform: [{ translateX: -20 }, { translateY: 20 }] }, // Нижняя левая точка
    { top: "50%", left: "50%", transform: [{ translateX: -20 }, { translateY: -20 }] }, // Центральная точка
    { top: "25%", right: "25%", transform: [{ translateX: 20 }, { translateY: -20 }] }, // Верхняя правая точка
    { top: "50%", right: "25%", transform: [{ translateX: 20 }, { translateY: -20 }] }, // Правая точка
    { bottom: "25%", right: "25%", transform: [{ translateX: 20 }, { translateY: 20 }] }, // Нижняя правая точка
  ];

  // Карта видимости точек для каждого числа
  const dotVisibilityMap = {
    1: [0, 0, 0, 1, 0, 0, 0],
    2: [1, 0, 0, 0, 0, 0, 1],
    3: [1, 0, 0, 1, 0, 0, 1],
    4: [1, 0, 1, 0, 1, 0, 1],
    5: [1, 0, 1, 1, 1, 0, 1],
    6: [1, 1, 1, 0, 1, 1, 1],
  };

  return (
    <View style={styles.container}>
      <BackArrow style={styles.arrowContainer}/>
      <View style={styles.container2}>
        <Text style={styles.numberText}>{randomNumber}</Text>
        <View style={styles.dice}>
          {dotPositions.map((position, index) => (
            <Dot
              key={index}
              position={position}
              visible={dotVisibilityMap[randomNumber][index]} // Видимость точки
            />
          ))}
        </View>
        <TouchableOpacity onPress={generateRandomNumber} style={styles.rollButton}>
          <Text style={styles.buttonText}>Roll</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowContainer: {
    marginTop: 60,
    marginLeft: 19,
  },
  container: {
    flex: 1,
    backgroundColor: "#F2E8D5",
  },
  container2: {
    alignItems: "center",
  },
  numberText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 61,
  },
  dice: {
    marginTop: 36, 
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#DAAD86", // Цвет куба
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative", // Для позиционирования точек
  },
  dot: {
    width: 40,
    height: 40,
    backgroundColor: "#8C6F53", // Цвет точек (контрастный цвет)
    borderRadius: 20,
    position: "absolute", // Абсолютное позиционирование точки
  },
  rollButton: {
    width: 250,
    height: 70,
    flexShrink: 0,
    backgroundColor: "#B28451",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 165,
  },
  buttonText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 50,
    alignSelf: "center",
  },
});