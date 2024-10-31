import React from 'react'
import Lab1 from './src/screens/Lab1'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
