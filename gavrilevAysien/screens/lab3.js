import React, { useMemo, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput } from 'react-native';

const generateLargeData = () => {
  // Генерируем массив из 10,000 элементов
  return Array.from({ length: 10000 }, (_, index) => ({
    id: index.toString(),
    value: `Элемент #${index + 1}`,
  }));
};

const Lab3 = () => {
  const [search, setSearch] = useState('');

  // Генерируем данные и мемоизируем их, чтобы не пересоздавать массив при каждом рендере
  const largeData = useMemo(() => generateLargeData(), []);

  // Фильтруем данные на основе поиска (также мемоизируем)
  const filteredData = useMemo(() => {
    if (!search.trim()) return largeData;
    return largeData.filter((item) =>
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, largeData]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите текст для поиска..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={20} // Оптимизация рендера
        maxToRenderPerBatch={50} // Ограничиваем рендер за один проход
        removeClippedSubviews // Удаляем элементы вне экрана
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 16,
  },
});

export default Lab3;