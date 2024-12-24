import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Lab1 = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Вы кликнули {count} раз(а)</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text style={{ marginTop: 10 }}>Нажми на меня</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
});

export default Lab1;
