  import React, { useState } from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createStackNavigator } from "@react-navigation/stack";
  import AppNavigator from "./navigation/AppNavigator";
  import LoginScreen from "./screens/LoginScreen";
  import { ExpenseProvider } from "./contexts/ExpenseContext";
  import { SafeAreaProvider } from "react-native-safe-area-context";
  import { SettingsProvider } from "./contexts/SettingsContext";
  import RegisterScreen from "./screens/RegisterScreen";

  const Stack = createStackNavigator();

  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
      <SettingsProvider>
        <ExpenseProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={isLoggedIn ? "AppNavigator" : "LoginScreen"}
              >
                {isLoggedIn ? (
                  <Stack.Screen
                    name="AppNavigator"
                    component={AppNavigator}
                    initialParams={{ setIsLoggedIn}}
                    options={{ headerShown: false }}
                  />
                ) : (
                  <>
                    <Stack.Screen
                      name="LoginScreen"
                      component={LoginScreen}
                      initialParams={{ setIsLoggedIn}}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="RegisterScreen"
                      component={RegisterScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ExpenseProvider>
      </SettingsProvider>
    );
  }

  export default App;
