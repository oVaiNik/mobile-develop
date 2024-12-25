import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import store from "./redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Лабораторная 1" component={Lab1} />
          <Tab.Screen name="Лабораторная 2" component={Lab2} />
          <Tab.Screen name="Лабораторная 3" component={Lab3} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
