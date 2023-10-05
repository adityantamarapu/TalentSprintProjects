import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSettingsContext } from "../contexts/SettingsContext"; // Import the useSettingsContext hook
import { Picker } from "@react-native-picker/picker";

const CurrencySettingsScreen = () => {
  const { settings, updateSettings } = useSettingsContext(); // Use the settings context

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Settings</Text>
      <Text>Select your preferred currency:</Text>

      <Picker
        selectedValue={settings.currency} // Use the saved currency settings
        onValueChange={(currency) => {
          // Update the currency settings and save them to AsyncStorage
          updateSettings({ ...settings, currency });
        }}
      >
        <Picker.Item
          label={`USD - US Dollar ($)`}
          value="$"
        />
        <Picker.Item
          label={`EUR - Euro (€)`}
          value="€"
        />
        <Picker.Item
          label={`JPY - Japanese Yen (¥)`}
          value="¥"
        />
      </Picker>
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
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default CurrencySettingsScreen;
