import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ThemeSelectionScreen from "./ThemeSelectionScreen";
import CurrencySettingsScreen from "./CurrencySettingsScreen";
import IconLinkedIn from "react-native-vector-icons/Entypo";
import IconEmail from "react-native-vector-icons/MaterialIcons";

const Stack = createStackNavigator();

function SettingsScreen({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="SettingsContent"
        component={SettingsContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
      <Stack.Screen
        name="CurrencySettings"
        component={CurrencySettingsScreen}
      />
    </Stack.Navigator>
  );
}

function SettingsContent({ navigation }) {
  const handleThemeButtonPress = () => {
    navigation.navigate("ThemeSelection");
  };

  const handleCurrencyButtonPress = () => {
    navigation.navigate("CurrencySettings");
  };

  // Function to open LinkedIn profile
  const openLinkedInProfile = () => {
    Linking.openURL("https://www.linkedin.com/in/adityan-tamarapu");
  };

  // Function to open Email
  const openEmail = () => {
    Linking.openURL("mailto:tamarapu.adityan@gmail.com");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile Settings */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      {/* Currency Settings */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handleCurrencyButtonPress}
      >
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
      <TouchableOpacity style={styles.settingItem}>
        <Text>Privacy and Security</Text>
      </TouchableOpacity>

      {/* App Theme and Appearance */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handleThemeButtonPress}
      >
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

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Hi, I am Adityan Tamarapu, a 2023 CS graduate who is interested in
          software engineering. I am building this app to learn react-native.
        </Text>

        <View style={styles.iconRow}>
          {/* LinkedIn Icon */}
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={openLinkedInProfile}
          >
            <IconLinkedIn name="linkedin" size={24} color="#0077B5" />
            <Text style={styles.linkText}>LinkedIn</Text>
          </TouchableOpacity>

          <View style={{ width: 16 }} />

          {/* Email Icon */}
          <TouchableOpacity style={styles.linkContainer} onPress={openEmail}>
            <IconEmail name="email" size={24} color="#0077B5" />
            <Text style={styles.linkText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingBottom: 32 }}></View>
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
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  descriptionContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginTop: 16,
  },
  description: {
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  linkText: {
    marginLeft: 8,
  },
});

export default SettingsScreen;
