import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeSelectionScreen from './ThemeSelectionScreen'; // Import your ThemeSelectionScreen

const Stack = createStackNavigator();

function SettingsScreen({ navigation }) {
  // Handle functions for various settings can be added here

  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsContent} options={{headerShown: false}}/>
      <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
    </Stack.Navigator>
  );
}

function SettingsContent({ navigation }) {
  
  // Handle the "App Theme and Appearance" button press
  const handleThemeButtonPress = () => {
    navigation.navigate('ThemeSelection'); // Navigate to the ThemeSelectionScreen
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      {/* Currency Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Currency Settings</Text>
      </TouchableOpacity>

      {/* Notification Preferences */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Notification Preferences</Text>
      </TouchableOpacity>

      {/* Categories Management */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Categories Management</Text>
      </TouchableOpacity>

      {/* Privacy and Security */}
      <TouchableOpacity style={styles.settingItem} >
        <Text>Privacy and Security</Text>
      </TouchableOpacity>

      {/* App Theme and Appearance */}
      <TouchableOpacity style={styles.settingItem} onPress={handleThemeButtonPress}>
        <Text>App Theme and Appearance</Text>
      </TouchableOpacity>

      {/* Language Preferences */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Language Preferences</Text>
      </TouchableOpacity>

      {/* About and Help */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>About and Help</Text>
      </TouchableOpacity>

      {/* Logout and Account Deletion */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Logout</Text>
      </TouchableOpacity>

      {/* Automatic Backup Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Automatic Backup Settings</Text>
      </TouchableOpacity>

      {/* Clear Data */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Clear Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  settingItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
});

export default SettingsScreen;
