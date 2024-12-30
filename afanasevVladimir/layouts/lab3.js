import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useTheme } from '../ThemeContext';

const Lab2 = () => {
  const { isDarkTheme } = useTheme();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("London");
  const [inputCity, setInputCity] = useState(""); // новое состояние для ввода
  const [apiKey, setApiKey] = useState("e8c3b87a59554acb99190346241912");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!apiKey) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        setWeatherData([response.data]); // сохраняем данные о погоде
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const handleCityChange = () => {
    if (inputCity) {
      setCity(inputCity); // обновляем city только при нажатии на кнопку
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#F5FCFF' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Прогноз погоды</Text>
      <TextInput
        style={[styles.input, { borderColor: isDarkTheme ? '#fff' : '#000', color: isDarkTheme ? '#fff' : '#000' }]}
        placeholder="Введите город"
        placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
        value={inputCity}
        onChangeText={setInputCity} // обновляем состояние inputCity
      />
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isDarkTheme ? '#555' : 'blue' }]} 
        onPress={handleCityChange} // вызываем функцию при нажатии
      >
        <Text style={styles.buttonText}>Узнать погоду</Text>
      </TouchableOpacity>
      <FlatList
        data={weatherData} // используем данные о погоде напрямую
        keyExtractor={(item) => item.location.name} // уникальный ключ по имени локации
        renderItem={({ item }) => (
          <View style={[styles.weatherItem, { backgroundColor: isDarkTheme ? '#444' : '#fff' }]}>
            <Text style={[styles.location, { color: isDarkTheme ? '#fff' : '#000' }]}>{item.location.name}</Text>
            <Text style={[styles.temperature, { color: isDarkTheme ? '#fff' : '#000' }]}>{item.current.temp_c} °C</Text>
            <Text style={[styles.condition, { color: isDarkTheme ? '#fff' : '#000' }]}>{item.current.condition.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weatherItem: {
    padding: 15,
    borderBottomColor: "#ccc",
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 16,
  },
  condition: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Lab3;
