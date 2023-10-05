import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();
const initialExpenses = [];

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  // Accept initialExpenses prop
  const [expenses, setExpenses] = useState(); // Initialize expenses with initialExpenses

  // Load expenses from AsyncStorage on component mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem("expenses");
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        } else {
          // If there are no stored expenses, use the initialExpenses constant
          setExpenses(initialExpenses);
        }
      } catch (error) {
        console.error("Error loading expenses from AsyncStorage:", error);
      }
    };
    loadExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
