import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Lab1 from "./Screens/Lab1";
import Lab2 from "./Screens/Lab2";
import Lab3 from "./Screens/Lab3";
import Lab4 from "./Screens/Lab4";
import Lab4_2 from "./Screens/Lab4_2";
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
          <Tab.Screen name="Задачи" component={Lab4} />
          <Tab.Screen name="Завершённые задачи" component={Lab4_2} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
