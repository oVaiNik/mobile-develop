import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/lab1"; // Импорт вашего нового экрана
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Загрузка шрифтов
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Roboto-Medium": require("./assets/fonts/SFProText-Medium.ttf"),
        "Roboto-Bold": require("./assets/fonts/SFProText-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Убирает верхнюю панель
          tabBarStyle: { display: "none" }, // Убирает нижнюю панель
        }}
      >
        <Tab.Screen
          name="Lab 1"
          component={Lab1} // Подключение Lab1 как одного из экранов
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#000000",
  },
  icon: {
    width: 42,
    height: 42,
    marginBottom: 9,
    marginTop: 9,
  },
  headerTab: {
    backgroundColor: "#CFE2F9",
    height: 100,
  },
  tabBar: {
    height: 60,
    backgroundColor: "#CFE2F9",
    paddingTop: 6,
    paddingBottom: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#000000",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});