import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Import the AntDesign icons
import { useExpenseContext } from '../contexts/ExpenseContext';
import { useTheme } from '../contexts/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseSearchScreen from '../screens/ExpenseSearchScreen';

const Stack = createStackNavigator();
const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ExpenseSearch" component={ExpenseSearchScreen} />
    </Stack.Navigator>
  );
};

const HomeContent = ({ navigation }) => {
  const { expenses } = useExpenseContext();
  const { theme } = useTheme();

  const navigateToAddExpense = () => {
    navigation.navigate('AddExpense');
  };

  const navigateToExpenseSearch = () => {
    navigation.navigate('ExpenseSearch');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Expense Tracker</Text>
      </View>

      <TouchableOpacity
        style={styles.customButton}
        onPress={navigateToAddExpense}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>Recent Expenses:</Text>
        <TouchableOpacity onPress={navigateToExpenseSearch}>
          <Icon name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeader: {
    fontSize: 18,
    marginTop: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  customButton: {
    zIndex: 1,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'navy',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
