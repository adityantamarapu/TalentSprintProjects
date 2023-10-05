import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
      <SettingsProvider>
        <ExpenseProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </ExpenseProvider>
      </SettingsProvider>
  );
}

export default App;
