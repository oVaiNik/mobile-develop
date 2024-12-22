import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from 'react-redux';
import { store } from './store';
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";
import Lab3 from "./screens/Lab3";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab1" component={Lab1} />
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}