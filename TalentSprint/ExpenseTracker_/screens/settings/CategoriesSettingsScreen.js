// CategoriesSettingsScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { useSettingsContext } from "../../contexts/SettingsContext";

function CategoriesSettingsScreen({ navigation }) {
  const { settings, updateCategories } = useSettingsContext();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(settings.categories);

  useEffect(() => {
    setCategories(settings.categories);
  }, [settings.categories]);

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      return;
    }

    updateCategories(newCategory.trim(), "add");
    setNewCategory("");
  };

  const handleRemoveCategory = (category) => {
    updateCategories(category, "remove");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories Settings</Text>
      
      <View style={styles.addCategory}>
        <TextInput
          style={styles.input}
          placeholder="New Category"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <Button title="Add" onPress={handleAddCategory} />
      </View>

      <Text style={styles.categoriesLabel}>Categories:</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => handleRemoveCategory(item)} />
          </View>
        )}
        keyExtractor={(item) => item}
      />
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
  addCategory: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  categoriesLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default CategoriesSettingsScreen;
