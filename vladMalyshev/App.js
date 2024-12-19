import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Лабораторная 1" component={Lab1} />
        <Tab.Screen name="Лабораторная 2" component={Lab2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
