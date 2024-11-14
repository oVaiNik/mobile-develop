import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import ThemedBackground from '../components/ThemedBackground';
import {TitleText, InfoText} from '../components/ThemedText';

const SavedImage = () => {
  const route = useRoute();
  const {data} = route.params;

  if (!data) {
    return (
      <ThemedBackground style={styles.container}>
        <TitleText style={styles.errorText}>
          Нет сохраненных данных изображения.
        </TitleText>
      </ThemedBackground>
    );
  }

  return (
    <ThemedBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TitleText style={styles.title}>{data.title}</TitleText>
        {data.media_type === 'image' ? (
          <Image source={{uri: data.url}} style={styles.image} />
        ) : (
          <View style={styles.videoContainer}>
            <InfoText style={styles.videoText}>
              Видео не поддерживается.
            </InfoText>
          </View>
        )}
        <InfoText style={styles.dateText}>Дата: {data.date}</InfoText>
        <InfoText style={styles.explanationText}>{data.explanation}</InfoText>
      </ScrollView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  videoContainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 10,
  },
  videoText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  errorText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default SavedImage;
