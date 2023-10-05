import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import StatsScreen from "../screens/StatsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            display: "flex",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ expenses: [] }} // Set the initialParams for the Home screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{
            tabBarLabel: "Add Expense",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarLabel: "Stats",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="chart-line"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default AppNavigator;
