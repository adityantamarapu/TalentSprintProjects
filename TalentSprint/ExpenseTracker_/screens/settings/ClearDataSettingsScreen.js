// ClearDataScreen.js

import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import { useExpenseContext } from "../../contexts/ExpenseContext";
import { useSettingsContext } from "../../contexts/SettingsContext";

function ClearDataScreen({ navigation }) {
  const { clearExpenses } = useExpenseContext();
  const { clearSettings } = useSettingsContext();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleClearData = async () => {
    // Clear expenses
    clearExpenses();

    // Clear settings and local storage
    clearSettings();

    setModalVisible(false);
    // Optionally, navigate to another screen after clearing data
    // navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clear Data</Text>
      <Text style={styles.description}>
        Are you sure you want to clear all data?
      </Text>
      <Button title="Clear Data" onPress={() => setModalVisible(true)} />

      {/* Confirm Clear Data Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to clear all data?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Clear" onPress={handleClearData} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  description: {
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ClearDataScreen;
