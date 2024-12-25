import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Lab2 from "./layouts/lab2";
import Lab3 from "./layouts/lab3";
// import Lab4 from "./layouts/lab4";
import { NavigationContainer } from "@react-navigation/native";
const colors = ["black", "red", "yellow"];

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lab2" component={Lab2} />
        <Tab.Screen name="Lab3" component={Lab3} />
        {/* <Tab.Screen name="Lab4" component={Lab4} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
