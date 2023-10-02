import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Import your theme context

function ThemeSelectionScreen({ navigation }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#000' }]}>
      <View style={styles.topRow}>
        <Text style={[styles.themeText, { color: theme === 'light' ? '#000' : '#fff' }]}>Use dark theme</Text>
        <Switch
          trackColor={{ false: '#3498db', true: '#f1c40f' }}
          thumbColor={theme === 'light' ? '#f1c40f' : '#3498db'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={theme === 'dark'} // Set the value based on the current theme
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

export default ThemeSelectionScreen;
