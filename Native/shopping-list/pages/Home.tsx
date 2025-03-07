import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addItemToList,
  deleteItemFromList,
  updateItemInList,
  toggleItemCompletion,
} from "../redux/shoppingListSlice";
import PopUpModal from "../components/Modal";
import Card from "../components/Card"; // Importing the Card component

const Home = () => {
  const dispatch = useDispatch();
  const email = "user@example.com"; // Replace with actual user email
  const listName = "default"; // Replace with actual list name
  const items = useSelector(
    (state: RootState) => state.shoppingList[email]?.[listName] || []
  );

  // Debugging: Log items to ensure they are being fetched correctly
  console.log("Items:", items);

  // Handle adding an item
  const handleAddItem = (item) => {
    dispatch(addItemToList({ email, listName, item }));
  };

  // Handle deleting an item
  const handleDeleteItem = (id) => {
    dispatch(deleteItemFromList({ email, listName, itemId: id }));
  };

  // Handle editing an item
  const handleEditItem = (item) => {
    Alert.alert("Edit Item", `Edit the item: ${item.name}`);
    // Implement actual edit logic here
    dispatch(updateItemInList({ email, listName, item }));
  };

  // Handle toggling item done status
  const handleToggleDone = (id, done) => {
    dispatch(toggleItemCompletion({ email, listName, itemId: id }));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-200">
        {/* Display a list of cards */}
        {items.length > 0 ? (
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
        ) : (
          <Text>No items available</Text>
        )}

        {/* Modal for adding items */}
        <PopUpModal onAdd={handleAddItem} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
