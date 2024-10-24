import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from '../store/store';


// Начальное состояние
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Редюсер для управления состоянием
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'FETCH_FAILURE':
      return { data: null, loading: false, error: action.payload };
    default:
      throw new Error();
  }
};

// Пользовательский хук для получения данных из NASA APOD API
const useAPOD = (date) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
      );
      const result = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};

const Lab2 = ({ navigation }) => {
  const [date, setDate] = useState(null);
  const { data, loading, error } = useAPOD(date);
  const [savedData, setSavedData] = useState(null);
  
  // Redux hooks
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const loadRandomAPOD = useCallback(() => {
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
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
    <ImageBackground
      source={require('../assets/space.jpg')}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => navigation.navigate('Lab1')}
        >
          <Text style={styles.switchButtonText}>Lab1</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : error ? (
          <Text style={styles.errorText}>Ошибка: {error}</Text>
        ) : memoizedData ? (
          <>
            <Text style={styles.titleText}>{memoizedData.title || 'Название недоступно'}</Text>
            {memoizedData.media_type === 'image' ? (
              <Image
                source={{ uri: memoizedData.url }}
                style={styles.image}
              />
            ) : (
              <View style={styles.videoContainer}>
                <Text style={styles.videoText}>Видео не поддерживается</Text>
              </View>
            )}
            <Text style={styles.dateText}>Дата: {memoizedData.date}</Text>
            <Text style={styles.explanationText}>{memoizedData.explanation}</Text>
          </>
        ) : (
          <Text style={styles.errorText}>Данные не загружены</Text>
        )}
        
        {/* Redux Counter Section */}
        <View style={styles.reduxContainer}>
          <Text style={styles.reduxText}>Redux Counter: {counter}</Text>
          <TouchableOpacity 
            style={styles.reduxButton} 
            onPress={() => dispatch(incrementCounter())}
          >
            <Text style={styles.reduxButtonText}>Increment Counter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.reduxButton} 
            onPress={() => dispatch(decrementCounter())}
          >
            <Text style={styles.reduxButtonText}>Decrement Counter</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={loadRandomAPOD}>
          <Text style={styles.buttonText}>Загрузить другое изображение</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.globalButton} onPress={updateSavedData}>
          <Text style={styles.globalButtonText}>Сохранить в избранное</Text>
        </TouchableOpacity>

        {savedData && (
          <View style={styles.savedDataContainer}>
            <Text style={styles.savedDataTitle}>Сохраненное изображение:</Text>
            <Text style={styles.savedDataText}>{savedData.title}</Text>
            <Text style={styles.savedDataText}>Дата: {savedData.date}</Text>
            <TouchableOpacity 
              style={styles.viewSavedButton}
              onPress={() => navigation.navigate('SavedImage', { data: savedData })}
            >
              <Text style={styles.viewSavedButtonText}>Просмотреть</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
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
  switchButton: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 5,
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  dateText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  explanationText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  errorText: {
    color: '#f00',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  globalButton: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  globalButtonText: {
    color: '#fff',
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
    color: '#fff',
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savedDataText: {
    color: '#ccc',
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
    color: '#fff',
    fontSize: 14,
  },
  reduxContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  reduxText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  reduxButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  reduxButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Lab2;