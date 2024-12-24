import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";


const colors: string[] = ["black", "red", "blue", "green", "yellow", "purple"];
const colorsText: string[] = [
  "Черный",
  "Красный",
  "Синий",
  "Зелёный",
  "Жёлтый",
  "Фиолетовый",
];

export default function Lab1() {
  const [colorIndex, setColorIndex] = useState(0);
  const [boxSize, setBoxSize] = useState(150);

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: colors[colorIndex],
            width: boxSize,
            height: boxSize,
            borderRadius: 8
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setColorIndex((colorIndex + 1) % colors.length);
          }}
          style={styles.button}
        >
          <Text style={styles.btnText}>Поменять цвет</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setBoxSize(randomInt(100, 150));
          }}
          style={styles.button}
        >
          <Text style={styles.btnText}>Поменять размер</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2A4758",
    borderRadius: 5,
    marginTop: 10,
    height: 30,
    width: 150,
  },
  btnText: {
      fontSize: 12,
      color: "#DCEEFA",
      textAlign: 'center',
      }
});
