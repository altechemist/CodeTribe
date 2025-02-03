import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, FlatList, View, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PopUpModal from "../components/Modal";
import Card from "../components/Card"; // Importing the Card component

const Home = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", quantity: 2, totalPrice: 5.0, done: false },
    { id: 2, name: "Banana", quantity: 3, totalPrice: 3.0, done: false },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
    { id: 3, name: "Orange", quantity: 4, totalPrice: 6.0, done: true },
  ]);

  // Handle deleting an item
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle editing an item
  const handleEditItem = (item) => {
    Alert.alert("Edit Item", `Edit the item: ${item.name}`);
  };

  // Handle toggling item done status
  const handleToggleDone = (id, done) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: done } : item
      )
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-200">
        {/* Display a list of cards */}
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Card
              item={item}
              onDelete={handleDeleteItem}
              onEdit={handleEditItem}
              onToggleDone={handleToggleDone}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          className="flex w-[90%] mt-5"
        />

        {/* Modal for adding items */}
        <PopUpModal />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
