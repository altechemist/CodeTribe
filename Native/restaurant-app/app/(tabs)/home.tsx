import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../components/SearchBar";
import RestaurantCard from "../../components/RestaurantCard";
import axios from "axios";

const Home = () => {
  const router = useRouter(); // Use useRouter instead of navigation prop
  const [query, setQuery] = useState("");

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

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (text: React.SetStateAction<string>) => {
    setQuery(text);
  };

  const fetchRestaurant = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

 try {
      const response = await axios.get(`${apiUrl}/restaurants/getRestaurants`);
      setRestaurants(response.data)
      console.log(response)

      Alert.alert('Success', 'Restaurants fetched successfully!');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Signup failed.';
      Alert.alert('Error', errorMessage);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, [])
  
  return (
    <View style={styles.container}>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search by name, location, or cuisine..." containerStyle={undefined} inputStyle={undefined}      />
      <Text style={styles.sectionTitle}>Recommended Restaurants</Text>
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => router.push(`/RestaurantDetails?id=${item.id}`)} // Navigate with router.push
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No restaurants found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default Home;
