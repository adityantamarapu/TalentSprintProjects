import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSettingsContext } from '../../contexts/SettingsContext'; // Import the useSettingsContext hook

function ThemeSettingsScreen({ navigation }) {
  const { settings, updateSettings } = useSettingsContext(); // Access the settings and updateSettings function

  // Function to toggle the theme
  const toggleTheme = () => {
    // Toggle between 'light' and 'dark'
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';

    // Update the theme setting and save it
    updateSettings({ ...settings, theme: newTheme });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={[styles.themeText, { color: '#000'}]}>Use dark theme</Text>
        <Switch
          trackColor={{ false: '#3498db', true: '#f1c40f' }}
          thumbColor={'#f1c40f'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={settings.theme === 'dark'} // Set the value based on the current theme
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start', // Start from the top
  },
  topRow: {
    flexDirection: 'row', // Arrange text and switch in a row
    alignItems: 'center', // Align items horizontally
    justifyContent: 'space-between', // Add space between items
    width: '100%', // Occupy full width
    marginTop: 16, // Add some top margin
  },
  themeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThemeSettingsScreen;
