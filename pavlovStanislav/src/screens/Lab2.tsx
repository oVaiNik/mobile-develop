import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import BoldText from '../components/customs/text/BoldText'
import Tooltip from '../components/customs/Tooltip'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    borderRadius: 50,
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
})

const Lab2: React.FC = () => {
  const [darkTheme] = useState('#000')
  const [lightTheme] = useState('#FFF')
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkThemeOn(!isDarkThemeOn)
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkThemeOn ? darkTheme : lightTheme},
      ]}>
      <Tooltip />
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isDarkThemeOn ? darkTheme : lightTheme,
            borderColor: isDarkThemeOn ? lightTheme : darkTheme,
          },
        ]}
        onPress={toggleDarkMode}>
        <BoldText style={{color: isDarkThemeOn ? lightTheme : darkTheme}}>
          Click on me
        </BoldText>
      </TouchableOpacity>
    </View>
  )
}

export default Lab2
