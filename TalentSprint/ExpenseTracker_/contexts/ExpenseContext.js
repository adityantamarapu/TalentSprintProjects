import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExpenseContext = createContext();
const initialExpenses = [];

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem("expenses");
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        } else {
          setExpenses(initialExpenses);
        }
      } catch (error) {
        console.error("Error loading expenses from AsyncStorage:", error);
      }
    };
    loadExpenses();
  }, []);

  const clearExpenses = async () => {
    try {
      await AsyncStorage.removeItem("expenses");
      setExpenses(initialExpenses);
    } catch (error) {
      console.error("Error clearing expenses from AsyncStorage:", error);
    }
  };

  const pushExpense = async (expense) => {
    try {
      // Update the local state
      setExpenses((prevExpenses) => [...prevExpenses, expense]);

      // Update the AsyncStorage
      const updatedExpenses = [...expenses, expense];
      await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error("Error saving expense to AsyncStorage:", error);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, clearExpenses, pushExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
