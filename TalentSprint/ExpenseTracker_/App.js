import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";

// Sample initial expenses data
const initialExpenses = [
  {
    amount: 10000,
    category: "Utilities",
    date: "02/10/2023, 13:00:12",
    name: "Rent",
  },
  {
    amount: 4890,
    category: "Utilities",
    date: "03/01/2022, 13:00:12",
    name: "Bike Emi",
  },
];

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider initialExpenses={initialExpenses}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
