import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useExpenseContext } from '../contexts/ExpenseContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordReentered, setPasswordReentered] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const {url} = useExpenseContext();

  // Validation function to check if password and re-entered password match
  const validatePasswords = () => {
    if (password !== passwordReentered) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => { 

        // Trim trailing whitespaces from the state variables
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        // const trimmedPassword = password.trim();
        // const trimmedPasswordReentered = passwordReentered.trim();
    
        // Update the state variables with the trimmed values
        // setName();
        // setEmail();

    // Clear the previous error message
    setErrorMessage('');

    // Basic password length validation (you can add more)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    // Validate if passwords match
    if (!validatePasswords()) {
      return;
    }

    // Create a user object with name, email, and password
    const user = { name: trimmedName, email: trimmedEmail, password };

    console.log(user);

    try {
      const response = await fetch(url+'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      //console.log(response);

      if (response.ok) {
        // Registration successful, you can navigate to the login screen or perform other actions
        navigation.navigate('LoginScreen'); // Navigate to the Login screen
      } else {
        // Registration failed, handle errors and show error message
        const data = await response.json();
        setErrorMessage(data.error); // Update the error message from the server
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-enter Password"
        secureTextEntry
        value={passwordReentered}
        onChangeText={(text) => setPasswordReentered(text)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      width: 300,
      height: 40,
      borderWidth: 1,
      marginBottom: 16,
      padding: 10,
    },
    registerButton: {
      backgroundColor: 'green',
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    registerText: {
      color: 'white',
    },
    error: {
      color: 'red',
      marginBottom: 16,
    },
  });
  
  export default RegisterScreen;