import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router"; // Import router
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Restaurant } from "@/redux/slices/restaurantSlice";

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams(); // Get restaurant ID from params
  const router = useRouter(); // Initialize the router for navigation
  
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);

  // Find the restaurant by ID
  const restaurant = restaurants.find((restaurant: Restaurant) => restaurant._id === id);

  // Function to generate star icons based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={20} color="gold" />);
    }

    // Add half star if necessary
    if (halfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={20} color="gold" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star" size={20} color="grey" />);
    }

    return stars;
  };

  // Render menu items
  const renderMenu = (menuItems: Array<{ name: string, description: string, price: number }>) => {
    return menuItems.map((item, index) => (
      <View key={index} style={styles.menuItemContainer}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    ));
  };

  return restaurant ? (
    <ScrollView style={styles.container}>
      <Image source={{ uri: restaurant?.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant?.name}</Text>
        <Text style={styles.reviews}>
          {renderStars(restaurant?.rating)} {restaurant?.rating} ({restaurant?.reviews} reviews)
        </Text>
        <View style={styles.row}>
          <Ionicons key="restaurant" name="restaurant" size={20} color="tomato" />
          <Text style={styles.cuisine}>{restaurant?.cuisine}</Text>
        </View>
        <Text style={styles.description}>{restaurant?.description}</Text>
        <View style={styles.row}>
          <Ionicons key="location" name="location" size={20} color="tomato" />
          <Text style={styles.addressText}>{restaurant?.address}</Text>
        </View>
        
        {/* Menu Section */}
        {restaurant?.menuItems && restaurant.menuItems.length > 0 ? (
          <View style={styles.menuSection}>
            <Text style={styles.menuHeader}>Menu</Text>
            {renderMenu(restaurant.menuItems)}
          </View>
        ) : (
          <Text style={styles.noMenuText}>No menu available</Text>
        )}
      </View>
      
      <View style={styles.bookContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/Reservation?id=${restaurant._id}`)} // Pass the restaurant ID for navigation
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text>Restaurant not found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviews: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  cuisine: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuSection: {
    marginTop: 16,
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  menuItemContainer: {
    marginBottom: 16,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
  },
  menuItemPrice: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  noMenuText: {
    fontSize: 16,
    color: "#888",
  },
  bookContainer: {
    padding: 16,
  },
  bookButton: {
    backgroundColor: "tomato",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RestaurantDetails;
