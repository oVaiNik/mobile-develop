import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Initial Project</Text>
    </View>
  )
}

export default App
