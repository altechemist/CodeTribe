import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Restaurant } from "@/redux/slices/restaurantSlice";

// Function to render the star rating
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons key={`full-${i}`} name="star" size={18} color="gold" />);
  }

  // Add half star if necessary
  if (halfStar) {
    stars.push(<Ionicons key="half" name="star-half" size={18} color="gold" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Ionicons key={`empty-${i}`} name="star" size={18} color="#e0e0e0" />);
  }

  return stars;
};

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (restaurantId: string) => void;
  onEdit: (restaurantId: string) => void; // Function for editing the restaurant
  onDelete: (restaurantId: string) => void; // Function for deleting the restaurant
  user?: { role: string }; // User's role (admin or not)
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress, onEdit, onDelete, user }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text>{restaurant.cuisine}</Text>
        
        <View style={styles.reviewsContainer}>
          {renderStars(restaurant.rating)}
          <Text style={styles.reviews}> ({restaurant.reviews} reviews)</Text>
        </View>

        <Text style={styles.rating}>{restaurant.address}</Text>

        {/* Show admin actions if user is admin */}
        {user?.role === 'admin' && (
          <View style={styles.adminActions}>
            <TouchableOpacity onPress={() => onEdit(restaurant._id)} style={styles.editButton}>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(restaurant._id)}  style={styles.deleteButton}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
          
        )}

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "tomato",
  },
  adminActions: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "tomato",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 8,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default RestaurantCard;
