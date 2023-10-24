import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useExpenseContext } from "../contexts/ExpenseContext";

const LoginScreen = ({ navigation, route }) => {
  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setExpenses, url, userEmail, setUserEmail } = useExpenseContext(); 
  const handleLogin = async () => {
    // Create a user object with email and password

    const user = { userEmail, password };
    const {setIsLoggedIn} = route.params;

    setUserEmail(userEmail.trim());
    setPassword(password.trim());

    // Clear the previous error message
    setErrorMessage("");

    try {
      const response = await fetch(url+"login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Login successful, update expenses, then navigate
        const data = await response.json();
        setExpenses(data.expenses); // Update expenses using setExpenses
        setIsLoggedIn(true);
      } else {
        // Login failed, show error message
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => {
          setUserEmail("");
          setPassword("");
          setErrorMessage("");
          navigation.navigate("RegisterScreen")
        }}
      >
        <Text style={styles.registerText}>Or Register?</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  loginText: {
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  registerLink: {
    marginTop: 16,
  },
  registerText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
