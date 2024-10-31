import React from 'react'
import Lab1 from './src/screens/Lab1'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Lab2 from './src/screens/Lab2'

const Tab = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
