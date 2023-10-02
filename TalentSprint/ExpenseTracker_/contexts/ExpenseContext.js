import React, { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children, initialExpenses }) => { // Accept initialExpenses prop
  const [expenses, setExpenses] = useState(initialExpenses); // Initialize expenses with initialExpenses

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
