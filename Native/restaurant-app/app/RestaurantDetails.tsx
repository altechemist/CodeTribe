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

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams(); // Get restaurant ID from params
  const router = useRouter(); // Initialize the router for navigation
  
const [restaurants, setRestaurants] = useState([
    {
      id: "1",
      name: "Pasta Palace",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Italian",
      rating: 4.5,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
    {
      id: "2",
      name: "Sushi World",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
    {
      id: "3",
      name: "Sushi World",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
    {
      id: "4",
      name: "Sushi World",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
    {
      id: "5",
      name: "Sushi World",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
    {
      id: "6",
      name: "Sushi World",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
    {
      id: "7",
      name: "Sushi World",
      address: "102 Hacker Way",
      distance: 2,
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 142,
      description: "Pasta Palace is a cozy Italian restaurant located in the heart of the city. We serve a wide variety of pasta dishes, from classic spaghetti and meatballs to creamy fettuccine alfredo. Our pasta is made fresh daily, and we use only the finest ingredients to create our signature sauces. Whether you're in the mood for a hearty lasagna or a light and refreshing caprese salad, Pasta Palace has something for everyone. Come in and enjoy a delicious meal in a warm and welcoming atmosphere.",
      image:
        "https://i1.adis.ws/i/canon/pro-sid-ali-food-photography-trends-2_e5830f8b14d841ecab4f62b476497935?$media-collection-full-dt-jpg$",
    },
  ]);

  // Find the restaurant by ID
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);

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
      </View>
      <View style={styles.bookContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push(`/Reservation?id=${restaurant.id}`)} // Pass the restaurant ID for navigation
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
