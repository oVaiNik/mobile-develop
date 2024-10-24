import ThemedBackground from '../components/ThemedBackground';
import { ThemedText, ScoreText, InfoText, TitleText } from '../components/ThemedText';
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {...state, loading: true, error: null};
    case 'FETCH_SUCCESS':
      return {data: action.payload, loading: false, error: null};
    case 'FETCH_FAILURE':
      return {data: null, loading: false, error: action.payload};
    default:
      throw new Error();
  }
};

const useAPOD = date => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({type: 'FETCH_INIT'});
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`,
      );
      const result = await response.json();
      dispatch({type: 'FETCH_SUCCESS', payload: result});
    } catch (error) {
      dispatch({type: 'FETCH_FAILURE', payload: error.message});
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};

const Lab2 = ({navigation}) => {
  const [date, setDate] = useState(null);
  const {data, loading, error} = useAPOD(date);
  const [savedData, setSavedData] = useState(null);

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const loadRandomAPOD = useCallback(() => {
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365),
    )
      .toISOString()
      .slice(0, 10);
    setDate(randomDate);
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    loadRandomAPOD();
  }, [loadRandomAPOD]);

  const updateSavedData = useCallback(() => {
    if (data) {
      setSavedData(data);
      Alert.alert('Успешно', 'Изображение сохранено в избранное!');
    }
  }, [data]);

  return (
    <ThemedBackground
      source={require('../assets/space.jpg')}
      style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={loadRandomAPOD}>
          <ThemedText style={styles.buttonText}>Загрузить другое изображение</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : error ? (
          <ThemedText style={styles.errorText}>Ошибка: {error}</ThemedText>
        ) : memoizedData ? (
          <>
            <TitleText style={styles.titleText}>
              {memoizedData.title || 'Название недоступно'}
            </TitleText>
            {memoizedData.media_type === 'image' ? (
              <Image source={{uri: memoizedData.url}} style={styles.image} />
            ) : (
              <View style={styles.videoContainer}>
                <ThemedText style={styles.videoText}>Видео не поддерживается</ThemedText>
              </View>
            )}
            <InfoText style={styles.dateText}>Дата: {memoizedData.date}</InfoText>
            <InfoText style={styles.explanationText}>
              {memoizedData.explanation}
            </InfoText>
          </>
        ) : (
          <ThemedText style={styles.errorText}>Данные не загружены</ThemedText>
        )}

        <TouchableOpacity style={styles.globalButton} onPress={updateSavedData}>
          <ThemedText style={styles.globalButtonText}>Сохранить в избранное</ThemedText>
        </TouchableOpacity>

        {savedData && (
          <View style={styles.savedDataContainer}>
            <TitleText style={styles.savedDataTitle}>Сохраненное изображение:</TitleText>
            <InfoText style={styles.savedDataText}>{savedData.title}</InfoText>
            <InfoText style={styles.savedDataText}>Дата: {savedData.date}</InfoText>
            <TouchableOpacity
              style={styles.viewSavedButton}
              onPress={() =>
                navigation.navigate('SavedImage', {data: savedData})
              }>
              <ThemedText style={styles.viewSavedButtonText}>Просмотреть</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ThemedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginTop: 40,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
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
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  globalButton: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  globalButtonText: {
    fontSize: 16,
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
  savedDataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  savedDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedDataText: {
    fontSize: 14,
    marginBottom: 5,
  },
  viewSavedButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewSavedButtonText: {
    fontSize: 14,
  },
});

export default Lab2;
