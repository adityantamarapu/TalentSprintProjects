import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsContext = createContext();

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

const defaultSettings = {
  theme: "light",
  currency: "$",
  categories: ["Groceries", "Utilities", "Dinner", "Transportation"],
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem("settings");
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
        console.log(
          "Loaded settings from AsyncStorage:",
          JSON.parse(storedSettings)
        );
      } else {
        // If there are no stored settings, initialize with default settings
        setSettings(defaultSettings);
        // Save default settings to AsyncStorage
        await AsyncStorage.setItem("settings", JSON.stringify(defaultSettings));
        console.log("No settings found. Initialized with default settings.");
      }
    } catch (error) {
      console.error("Error loading settings from AsyncStorage:", error);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem("settings", JSON.stringify(newSettings));
    } catch (error) {
      console.error("Error saving settings to AsyncStorage:", error);
    }
  };

  const clearSettings = async () => {
    try {
      // Clear local storage (AsyncStorage)
      await AsyncStorage.clear();
      console.log("Local storage cleared successfully");
      // load default settings
      loadSettings();
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };

  
  // Function to update categories based on action (add or remove)
  const updateCategories = (category, action) => {
    if (action === "add" && !settings.categories.includes(category)) {
      // Add the category if it doesn't exist
      const newCategories = [...settings.categories, category];
      updateSettings({ ...settings, categories: newCategories });
    } else if (action === "remove" && settings.categories.includes(category)) {
      // Remove the category if it exists
      const newCategories = settings.categories.filter(
        (cat) => cat !== category
      );
      updateSettings({ ...settings, categories: newCategories });
    }
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, clearSettings, updateCategories }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
