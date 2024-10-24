import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
} from 'react-native';
import WebView from 'react-native-webview';

const GlobalStateContext = createContext();

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
      return {...state, loading: false, error: action.payload};
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
        `https://api.nasa.gov/planetary/apod?api_key=JbkyKjrsNpRByMp1NfUp53gvd4sA1Lkis4A3ZMaT&date=${date}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
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

const VideoPlayer = ({ url }) => {
  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(url);
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}` 
    : url;

  return (
    <View style={styles.videoWrapper}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.video}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const Lab2 = ({ navigation }) => {
  const [date, setDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });

  const { data, loading, error } = useAPOD(date);
  const { globalData, setGlobalData } = useContext(GlobalStateContext);

  const loadRandomAPOD = useCallback(() => {
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365),
    )
      .toISOString()
      .slice(0, 10);
    setDate(randomDate);
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const updateGlobalData = useCallback(() => {
    if (memoizedData) {
      setGlobalData(memoizedData);
      Alert.alert('Успешно', 'Изображение сохранено в избранное!');
    }
  }, [memoizedData, setGlobalData]);

  if (error) {
    console.error('Error in component:', error);
  }

  return (
    <ImageBackground
      source={require('../assets/space.jpg')}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={loadRandomAPOD}>
          <Text style={styles.buttonText}>Загрузить другое изображение</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Загрузка данных...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Ошибка: {error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadRandomAPOD}>
              <Text style={styles.retryButtonText}>Повторить</Text>
            </TouchableOpacity>
          </View>
        ) : memoizedData ? (
          <View style={styles.dataContainer}>
            <Text style={styles.titleText}>
              {memoizedData.title || 'Название недоступно'}
            </Text>
            {memoizedData.media_type === 'image' ? (
              <Image
                source={{ uri: memoizedData.url }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : memoizedData.media_type === 'video' ? (
              <VideoPlayer url={memoizedData.url} />
            ) : (
              <View style={styles.videoContainer}>
                <Text style={styles.videoText}>Формат медиа не поддерживается</Text>
              </View>
            )}
            <Text style={styles.dateText}>Дата: {memoizedData.date}</Text>
            <Text style={styles.explanationText}>
              {memoizedData.explanation}
            </Text>

            <TouchableOpacity
              style={styles.globalButton}
              onPress={updateGlobalData}>
              <Text style={styles.globalButtonText}>Сохранить в избранное</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.errorText}>Данные не загружены</Text>
        )}

        {globalData && (
          <View style={styles.savedDataContainer}>
            <Text style={styles.savedDataTitle}>Сохраненное изображение:</Text>
            <Text style={styles.savedDataText}>{globalData.title}</Text>
            <Text style={styles.savedDataText}>Дата: {globalData.date}</Text>
            <TouchableOpacity
              style={styles.viewSavedButton}
              onPress={() =>
                navigation.navigate('SavedImage', { data: globalData })
              }>
              <Text style={styles.viewSavedButtonText}>Просмотреть</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const GlobalStateProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const Lab2WithProvider = props => (
  <GlobalStateProvider>
    <Lab2 {...props} />
  </GlobalStateProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#fff',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  dataContainer: {
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    color: '#fff',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff6b6b',
  },
  globalButton: {
    backgroundColor: '#32cd32',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  globalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  videoWrapper: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 10,
  },
  videoText: {
    fontSize: 18,
    color: '#fff',
  },
  savedDataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  savedDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  savedDataText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fff',
  },
  viewSavedButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  viewSavedButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Lab2WithProvider;
