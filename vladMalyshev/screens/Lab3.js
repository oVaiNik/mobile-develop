import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";

const Lab3 = () => {
  const [filterText, setFilterText] = useState("");
  const [newName, setNewName] = useState("");
  const [names, setNames] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
    "Ivy",
    "Jack",
  ]);

  const filteredNames = useMemo(() => {
    return names.filter((name) =>
      name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, names]);

  const addName = () => {
    if (newName.trim()) {
      setNames([...names, newName.trim()]);
      setNewName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Фильтр имен</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите имя для фильтрации"
        onChangeText={setFilterText}
      />
      <TextInput
        style={styles.input}
        placeholder="Введите новое имя"
        value={newName}
        onChangeText={setNewName}
      />
      <Button title="Добавить имя" onPress={addName} />
      <FlatList
        data={filteredNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Фоновый цвет для всего контейнера
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold", // Жирный шрифт для заголовка
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5, // Закругленные углы для полей ввода
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc", // Цвет границы элемента списка
    borderRadius: 5, // Закругленные углы для элемента списка
    backgroundColor: "#fff", // Белый фон для элемента списка
    marginBottom: 10, // Отступ между элементами списка
    shadowColor: "#000", // Тень для элемента списка
    shadowOffset: { width: 0, height: 1 }, // Смещение тени
    shadowOpacity: 0.2, // Прозрачность тени
    shadowRadius: 1.5, // Радиус размытия тени
    elevation: 2, // Эффект тени для Android
  },
  item: {
    fontSize: 18,
  },
});

export default Lab3;
