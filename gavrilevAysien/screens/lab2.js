import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Lab2 = () => {
  const [data, setData] = useState(null); // Данные текущего поста
  const [postId, setPostId] = useState(1); // ID поста для загрузки

  //загрузка поста по ID
  const fetchPost = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const result = await response.json();
      setData(result); // Обновляем данные
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  useEffect(() => {
    fetchPost(postId); // Загружаем начальный пост
  }, [postId]); // Обновляем данные при изменении postId

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Text style={styles.title}>Пост #{data.id}</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{data.title}</Text>
            <Text style={styles.cardBody}>{data.body}</Text>
          </View>
        </>
      ) : (
        <Text>Загрузка данных...</Text>
      )}
      <Button
        title="Загрузить следующий пост"
        onPress={() => setPostId((prevId) => (prevId < 100 ? prevId + 1 : 1))} // Увеличиваем ID поста, циклически
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBody: {
    fontSize: 14,
    color: '#555',
  },
});

export default Lab2;