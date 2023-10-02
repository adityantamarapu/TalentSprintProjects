import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { useExpenseContext } from '../contexts/ExpenseContext';

const ExpenseSearchScreen = () => {
  const { expenses } = useExpenseContext();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle expense search
  const handleExpenseSearch = (text) => {
    setSearchText(text);
    const filteredExpenses = expenses.filter((expense) =>
      expense.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredExpenses);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Search</Text>

      {/* Expense search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Expenses"
        onChangeText={handleExpenseSearch}
        value={searchText}
      />

      {/* Display search results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.name}</Text>
            <Text>${item.amount}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});

export default ExpenseSearchScreen;
