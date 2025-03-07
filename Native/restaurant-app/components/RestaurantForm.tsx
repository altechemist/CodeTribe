import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Picker } from "@react-native-picker/picker"; // Import Picker component

const RestaurantForm = ({ restaurantData, onSubmit, onCancel }) => {
  // Form states
  const [name, setName] = useState(restaurantData ? restaurantData.name : "");
  const [description, setDescription] = useState(
    restaurantData ? restaurantData.description : ""
  );
  const [address, setAddress] = useState(
    restaurantData ? restaurantData.address : ""
  );
  const [cuisine, setCuisine] = useState(
    restaurantData ? restaurantData.cuisine : ""
  );
  const [image, setImage] = useState(restaurantData ? restaurantData.image : "");
  const [menuItems, setMenuItems] = useState(restaurantData ? restaurantData.menuItems : []);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  const { loading, error } = useSelector((state: RootState) => state.restaurants);

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !description || !address || !cuisine || !menuItems.length) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const formData = {
      name,
      description,
      address,
      cuisine,
      image,
      menuItems,
    };

    if (restaurantData?._id) {
      // Update restaurant if _id is present
      formData._id = restaurantData._id;
    }

    onSubmit(formData); // Pass the form data to the parent
  };

  // Add a new menu item
  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.description || !newMenuItem.price) {
      Alert.alert("Validation Error", "Menu item must have name, description, and price.");
      return;
    }

    setMenuItems([...menuItems, newMenuItem]);
    setNewMenuItem({ name: "", description: "", price: "" }); // Clear the form
  };

  // Render menu items list
  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <View key={index} style={styles.menuItem}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{`$${item.price}`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {restaurantData ? "Edit Restaurant" : "Add Restaurant"}
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Name, Description, Address, Cuisine Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Cuisine"
        value={cuisine}
        onChangeText={setCuisine}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      {/* Menu Items Section */}
      <View style={styles.menuContainer}>
        <Text style={styles.label}>Menu Items</Text>

        {/* New Menu Item Fields */}
        <TextInput
          style={styles.input}
          placeholder="Menu Item Name"
          value={newMenuItem.name}
          onChangeText={(text) => setNewMenuItem({ ...newMenuItem, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Menu Item Description"
          value={newMenuItem.description}
          onChangeText={(text) => setNewMenuItem({ ...newMenuItem, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Menu Item Price"
          value={newMenuItem.price}
          onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: text })}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddMenuItem}>
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>

        {renderMenuItems()}
      </View>

      {/* Loading Indicator and Buttons */}
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8,
  },
});

export default RestaurantForm;
