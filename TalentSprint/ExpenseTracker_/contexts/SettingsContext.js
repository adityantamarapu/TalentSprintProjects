import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsContext = createContext();

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

// Define your default settings here
const defaultSettings = {
  theme: "light",
  currency: '$'
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings); // Initialize with default settings

  // Load saved settings from AsyncStorage on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem("settings");
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        } else {
          // If there are no stored settings, initialize with default settings
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error("Error loading settings from AsyncStorage:", error);
      }
    };
    loadSettings();
  }, []);

  // Function to update settings and save them to AsyncStorage
  const updateSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem("settings", JSON.stringify(newSettings));
    } catch (error) {
      console.error("Error saving settings to AsyncStorage:", error);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
