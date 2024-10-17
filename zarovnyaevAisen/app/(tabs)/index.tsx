import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const colors: string[] = ["black", "red", "blue", "green", "yellow", "purple"];
const colorsText: string[] = [
  "Цвет квадрата черный",
  "Цвет квадрата красный",
  "Цвет квадрата синий",
  "Цвет квадрата зелёный",
  "Цвет квадрата жёлтый",
  "Цвет квадрата фиолетовый",
];
export default function HomeScreen() {
  const [colorIndex, setColorIndex] = useState(0); // Меняет цвет
  const [colorChangeCount, setColorChangeCount] = useState(0); // Счётчик кликов на квадрат
  const [displayText, setDisplayText] = useState(colorsText[0]); // Говорит какого цвета квадрат
  return (
    <SafeAreaView style={{ flex: 1, display: "flex" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Привет мир</Text>

        <Text style={{ marginTop: 20 }}>{displayText}</Text>
        <View
          style={{
            backgroundColor: colors[colorIndex],
            width: 100,
            height: 100,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setColorIndex((colorIndex + 1) % colors.length); // Меняет цвет
            setColorChangeCount(colorChangeCount + 1); // Счётчик
            //setDisplayText((displayText + 1) % 3);
            setDisplayText(colorsText[(colorIndex + 1) % colors.length]); // Текст цвета
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Не нажимай!</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20 }}>
          {" "}
          Цвет поменялся: {colorChangeCount} раз{" "}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
