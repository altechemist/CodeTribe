import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import RestaurantCard from "../../components/RestaurantCard"; // Assuming RestaurantCard component exists
import RestaurantForm from "../../components/RestaurantForm"; // Import RestaurantForm component
import FloatingButton from "@/components/FloatingButton";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, addRestaurant, deleteRestaurant, updateRestaurant, Restaurant } from "@/redux/slices/restaurantSlice";

const ManageRestaurants = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);
  const { user } = useSelector((state: RootState) => state.users);

  // Filter restaurants managed by user
  const userRestaurants = restaurants.filter((restaurant) =>
    restaurant.admin?.toLowerCase().includes(user?._id)
  );
  
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleAddRestaurant = () => {
    setEditingRestaurant(null);
    setFormVisible(true);
  };

  const handleEditRestaurant = (restaurantId: string) => {
    const restaurantToEdit = restaurants.find((rest) => rest._id === restaurantId);
    setEditingRestaurant(restaurantToEdit || null);
    setFormVisible(true);
  };

  const handleDeleteRestaurant = (restaurantId: string) => {
    dispatch(deleteRestaurant(restaurantId)); // Dispatch delete action to Redux store
  };

  const handleFormSubmit = (restaurant: Restaurant) => {
    if (editingRestaurant) {
      // Update restaurant
      dispatch(updateRestaurant(restaurant));
    } else {
      // Add new restaurant
      dispatch(addRestaurant(restaurant));
    }
    setFormVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Restaurants</Text>

      {isFormVisible ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFormVisible}
          onRequestClose={() => setFormVisible(false)}
        >
          <View style={styles.modalContainer}>
            <RestaurantForm
              restaurantData={editingRestaurant}
              onSubmit={handleFormSubmit}
              onCancel={() => setFormVisible(false)}
            />
          </View>
        </Modal>
      ) : (
        <>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={userRestaurants}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <RestaurantCard
                  restaurant={item}
                  onEdit={handleEditRestaurant}
                  onDelete={handleDeleteRestaurant}
                  user={user}
                />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No restaurants found. Add some data!
                </Text>
              }
            />
          )}
          
          <TouchableOpacity>
            <FloatingButton title="+ Add Restaurant" onPress={handleAddRestaurant} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
});

export default ManageRestaurants;
