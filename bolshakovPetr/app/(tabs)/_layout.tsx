import { Tabs } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerStyle: {
            backgroundColor: '#2A4758',
            height: 59,
          },
          tabBarStyle: {
              height: 70,
              borderRadius: 50,
              backgroundColor: '#2A4758',
              margin: 14,
              marginBottom: 30,
          }

        }}

      >
        <Tabs.Screen
          name="lab1"
          options={{
            title: "Lab1",
            tabBarIcon: ({ size }) => (
              <Entypo name="lab-flask" size={size} color={'#DCEEFA'} />
            ),

          }}
        />
        <Tabs.Screen
          name="lab2"
          options={{
            title: "Lab2",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="lab-flask" size={size} color={color} />
            ),
          }}
            style = {{ color: '#DCEEFA'}}
        />
        <Tabs.Screen
          name="lab3"
          options={{
            title: "Lab3",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="lab-flask" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
