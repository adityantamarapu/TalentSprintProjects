import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useExpenseContext } from "../../contexts/ExpenseContext";

function LogoutScreen({ navigation, route }) {
  const { setExpenses } = useExpenseContext();

  const handleLogout = () => {
    
    setExpenses([]);

    // Navigate to the Login screen
    route.params.setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logout</Text>
      <Text style={styles.description}>
        Are you sure you want to log out?
      </Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LogoutScreen;
