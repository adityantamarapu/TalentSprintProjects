import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useExpenseContext } from "../contexts/ExpenseContext";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

const StatsScreen = () => {
  const { expenses } = useExpenseContext();

  console.log(expenses);

  const currentYear = new Date().getFullYear(); // Get the current year

  const [selectedYear, setSelectedYear] = useState(currentYear); // Set the default to the current year
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // Filter expenses by the selected year whenever it changes
  useEffect(() => {
    const filtered = expenses.filter((expense) => {
      const expenseYear = moment(expense.date, "MM/DD/YYYY, HH:mm:ss").year();
      return expenseYear === selectedYear;
    });
    setFilteredExpenses(filtered);
  }, [selectedYear, expenses]);

  // Calculate total expenses for the selected year
  const totalExpenses = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Calculate expense categories and their amounts for the selected year
  const expenseCategories = filteredExpenses.reduce((categories, expense) => {
    const categoryIndex = categories.findIndex(
      (category) => category.category === expense.category
    );
    if (categoryIndex !== -1) {
      categories[categoryIndex].amount += expense.amount;
    } else {
      categories.push({ category: expense.category, amount: expense.amount });
    }
    return categories;
  }, []);

  // Calculate monthly spending trends for the selected year
  const monthlyTrends = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  filteredExpenses.forEach((expense) => {
    const date = moment(expense.date, "MM/DD/YYYY, HH:mm:ss"); // Parse the date string
    const monthIndex = date.month(); // Get the month index
    monthlyTrends.datasets[0].data[monthIndex] += expense.amount;
  });

  // Pie chart data for expense categories
  const pieChartData = expenseCategories.map((item) => ({
    name: item.category,
    amount: item.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Statistics</Text>

      {/* Year Filter */}
      <Picker
        selectedValue={selectedYear}
        onValueChange={(year) => setSelectedYear(year)}
        style={styles.yearPicker}
      >
        {/* Populate the picker with available years */}
        {Array.from(
          new Set(
            expenses.map((expense) =>
              moment(expense.date, "MM/DD/YYYY, HH:mm:ss").year()
            )
          )
        ).map((year) => (
          <Picker.Item key={year} label={year.toString()} value={year} />
        ))}
      </Picker>

      {selectedYear && ( // Only display when a year is selected
        <>
          {/* Total Expenses for the selected year */}
          <View style={styles.statCard}>
            <Text>Total Expenses for {selectedYear}</Text>
            <Text>${totalExpenses.toFixed(2)}</Text>
          </View>

          {/* Expense Categories for the selected year (Pie Chart) */}
          <View style={styles.chartContainer}>
            <Text>Expense Categories for {selectedYear}</Text>
            <PieChart
              data={pieChartData}
              width={300}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* Monthly Spending Trends for the selected year (Line Chart) */}
          <View style={styles.chartContainer}>
            <Text>Monthly Spending Trends for {selectedYear}</Text>
            <LineChart
              data={monthlyTrends}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              }}
              bezier
              style={{ marginVertical: 8 }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  yearPicker: {
    height: 50,
    width: 150,
    marginBottom: 16,
  },
});

export default StatsScreen;
