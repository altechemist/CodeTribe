import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

// Function to render the star rating
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons  key={`full-${i}`} name="star" size={18} color="gold" />);
  }

  // Add half star if necessary
  if (halfStar) {
    stars.push(<Ionicons  key="half" name="star-half" size={18} color="gold" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Ionicons key={`empty-${i}`} name="star" size={20} color="white" />);
  }

  return stars;
};

interface Restaurant {
  image: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  address: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text>{restaurant.cuisine}</Text>
        
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviews}>
            {renderStars(restaurant.rating)} ({restaurant.reviews} reviews)
          </Text>
        </View>

        <Text style={styles.rating}>{restaurant.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 125,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "tomato",
  },
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RestaurantCard;
