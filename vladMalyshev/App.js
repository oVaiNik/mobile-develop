import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./screens/Lab1";
import Lab2 from "./screens/Lab2";
import Lab3 from "./screens/Lab3";
import Lab4 from "./screens/Lab4";
import Lab4View from "./screens/Lab4View";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Лабораторная 1" component={Lab1} />
          <Tab.Screen name="Лабораторная 2" component={Lab2} />
          <Tab.Screen name="Лабораторная 3" component={Lab3} />
          <Tab.Screen name="Лабораторная 4" component={Lab4} />
          <Tab.Screen name="Просмотр задач" component={Lab4View} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}