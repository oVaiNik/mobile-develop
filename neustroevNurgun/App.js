import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Lab1 from './screens/lab1';
import Lab2 from './screens/lab2';
import Lab3 from './screens/lab3';

const Tab = createBottomTabNavigator();

export default function App() {
  return <>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Лаб. работа 1" component={Lab1} />
        <Tab.Screen name="Лаб. работа 2" component={Lab2} />
        <Tab.Screen name="Лаб. работа 3" component={Lab3} />
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
  </>;
}
