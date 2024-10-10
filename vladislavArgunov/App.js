import { useState } from "react";
import { StyleSheet, TextInput, Button, Text, View } from "react-native";

export default function App() {
  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.defaultStyle}>{number}</Text>
      <Text style={styles.defaultStyle}>Нажимай</Text>
      <View style={styles.defaultStyle}>
        <Button title="на меня" onPress={() => setNumber(number + 1)} />
      </View>
      <View style={styles.defaultStyle}>
        <Button title="не сюда" onPress={() => setNumber(-9999)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultStyle: {
    fontSize: 20,
    marginTop: 20,
  },
});
