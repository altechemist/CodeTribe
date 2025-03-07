import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../components/SearchBar";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import RestaurantCard from "../../components/RestaurantCard";
import { fetchRestaurants } from '@/redux/slices/restaurantSlice';
import { RootState } from "@/redux/store";


const Home = () => {
  const router = useRouter(); // Use useRouter instead of navigation prop
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);
  const { user } = useSelector((state: RootState) => state.users);


  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (text: React.SetStateAction<string>) => {
    setQuery(text);
  };

  
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  
  return (
    <View style={styles.container}>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search by name, location, or cuisine..." containerStyle={undefined} inputStyle={undefined}      />
      <Text style={styles.sectionTitle}>Recommended Restaurants</Text>
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            user={user}
            onPress={() => router.push(`/RestaurantDetails?id=${item._id}`)} // Navigate with router.push
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
