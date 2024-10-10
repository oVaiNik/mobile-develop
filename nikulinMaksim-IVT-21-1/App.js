import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const colors = ["red", "green", "blue"]
  const [colorIndex, setColorIndex] = useState(0)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={() => {
          setColorIndex((colorIndex + 1) % 3)
        }}>
          <View style={{height: 100, width: 100, backgroundColor: colors[colorIndex]}}></View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  boxContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
