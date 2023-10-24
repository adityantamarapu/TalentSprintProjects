import React, { createContext, useContext, useState, useEffect } from "react";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const ExpenseContext = createContext();
//const initialExpenses = [];

const url = 'http://10.1.115.107:3000/';

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState();
  const [userName, setUserName] = useState();
  const[userEmail, setUserEmail] = useState();

  // const loadExpenses = async (email) => {
  //   try {
  //     // Call the server endpoint to get the collection object
  //     const response = await fetch(
  //       url+ `load-expenses/${email}`
  //     ); // Replace "expenses" with your collection name
  //     if (response.ok) {
  //       const data = await response.json();
  //       setExpenses(data.expenses);
  //     } else {
  //       console.error("Failed to load expenses from server");
  //     }
  //   } catch (error) {
  //     console.error("Error loading expenses from server:", error);
  //   }
  // };
  const clearExpenses = async () => {
    try {
      // Call the server endpoint to clear expenses

      const response = await fetch(
        url+`clear-expenses/${userEmail}`
      );
      if (response.ok) {
        const data = await response.json();
        setExpenses([]);
      } else {
        console.error("Failed to clear expenses from server");
      }
    } catch (error) {
      console.error("Error clearing expenses from server:", error);
    }
  };

  const pushExpense = async (expense) => {
    try {
      // Call the server endpoint to push a new expense

      console.log(userEmail, expense);      

      const response = await fetch(
        url+`push-expense/${userEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({expense}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
      } else {
        console.error("Failed to push expense to the server");
      }
    } catch (error) {
      console.error("Error pushing expense to the server:", error);
    }
  };

  // useEffect(() => {
  //   const loadExpenses = async () => {
  //     try {
  //       const storedExpenses = await AsyncStorage.getItem("expenses");
  //       if (storedExpenses) {
  //         setExpenses(JSON.parse(storedExpenses));
  //       } else {
  //         setExpenses(initialExpenses);
  //       }
  //     } catch (error) {
  //       console.error("Error loading expenses from AsyncStorage:", error);
  //     }
  //   };
  //   loadExpenses();
  // }, []);

  // const clearExpenses = async () => {
  //   try {
  //     await AsyncStorage.removeItem("expenses");
  //     setExpenses(initialExpenses);
  //   } catch (error) {
  //     console.error("Error clearing expenses from AsyncStorage:", error);
  //   }
  // };

  // const pushExpense = async (expense) => {
  //   try {
  //     // Update the local state
  //     setExpenses((prevExpenses) => [...prevExpenses, expense]);

  //     // Update the AsyncStorage
  //     const updatedExpenses = [...expenses, expense];
  //     await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  //   } catch (error) {
  //     console.error("Error saving expense to AsyncStorage:", error);
  //   }
  // };

  return (
    <ExpenseContext.Provider
      value={{ expenses, setExpenses, clearExpenses, pushExpense, url, userName, setUserName, userEmail, setUserEmail }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
