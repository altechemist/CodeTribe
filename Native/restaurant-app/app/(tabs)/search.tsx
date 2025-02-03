import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../../components/SearchBar'; // Assuming the reusable SearchBar component exists
import Card from '../../components/Card'; // Assuming you have a reusable Card component

const Search = () => {
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulated fetch function
  const fetchRestaurants = async (searchQuery) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: '1', name: 'Italian Bistro', location: 'Downtown', cuisine: 'Italian' },
              { id: '2', name: 'Sushi Place', location: 'Uptown', cuisine: 'Japanese' },
              { id: '3', name: 'Curry House', location: 'Midtown', cuisine: 'Indian' },
            ]),
          1000
        )
      );
      const filtered = response.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRestaurants(filtered);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search input
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) {
        fetchRestaurants(query);
      } else {
        setRestaurants([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Restaurants</Text>
      <SearchBar
        placeholder="Search by name, location, or cuisine..."
        onSearch={setQuery} // Pass setQuery to handle input changes
      />
      {loading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subtitle={`${item.cuisine} • ${item.location}`}
              onPress={() => console.log(`Selected: ${item.name}`)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No results found. Try a different query.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default Search;
