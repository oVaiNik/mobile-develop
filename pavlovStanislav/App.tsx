import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Lab2 from './src/screens/Lab2'
import Lab3 from './src/screens/Lab3'
import Lab4 from './src/screens/Lab4'

const Tab = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
        <Tab.Screen name="Lab4" component={Lab4} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
