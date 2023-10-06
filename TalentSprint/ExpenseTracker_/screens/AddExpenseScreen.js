import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { useExpenseContext } from "../contexts/ExpenseContext";
import { Picker } from "@react-native-picker/picker";
import { useSettingsContext } from "../contexts/SettingsContext";

function AddExpenseScreen({ navigation }) {
  const { pushExpense } = useExpenseContext();
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [customCategory, setCustomCategory] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const { settings } = useSettingsContext();

  const [categories, setCategories] = useState(settings.categories);

  useEffect(() => {
    // Load categories from settings when the component mounts
    setCategories(settings.categories);
    console.log(settings.categories, categories);
  }, [settings.categories]);

  const handleAddExpense = () => {
    if (
      !expenseName ||
      !expenseAmount ||
      selectedCategory === "Select Category"
    ) {
      return;
    }

    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleString();

    const newExpense = {
      id: String(Math.random()),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      date: formattedDate,
      category:
        selectedCategory === "Other" ? customCategory : selectedCategory,
    };

    pushExpense(newExpense);

    setExpenseName("");
    setExpenseAmount("");
    setCustomCategory("");
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        value={expenseName}
        onChangeText={setExpenseName}
      />

      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
      />

      <Text style={styles.categoryLabel}>Category:</Text>
      <View style={styles.categoryDropdown}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            if (itemValue === "Other") {
              setCustomCategory("");
            }
          }}
        >
          <Picker.Item label="Select Category" value="Select Category" />
          {categories &&
            categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {selectedCategory === "Other" && (
        <TextInput
          style={styles.input}
          placeholder="Custom Category"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.addButtonLabel}>Add</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Expense Added!</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  categoryDropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "navy",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
    width: 100,
  },
  addButtonLabel: {
    fontSize: 18,
    color: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalText: {
    fontSize: 18,
    color: "black",
  },
});

export default AddExpenseScreen;
