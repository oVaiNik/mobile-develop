import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { ThemeContext } from '../ThemeContext';

const { width } = Dimensions.get('window');

const Lab2 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
          <Image source={{ uri: data.url }} style={styles.image} />
          <Text style={[styles.description, { color: colors.text }]}>
            {data.explanation}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: "Pixelify Sans, sans-serif",
  },
  image: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "Pixelify Sans, sans-serif",
  },
});

export default Lab2;