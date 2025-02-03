import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([
    { id: '1', name: 'Pasta Palace', cuisine: 'Italian', location: '123 Main St' },
    { id: '2', name: 'Sushi World', cuisine: 'Japanese', location: '456 Elm St' },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Restaurant', 'Are you sure you want to delete this restaurant?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardSubText}>{item.cuisine}</Text>
              <Text style={styles.cardSubText}>{item.location}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Restaurants;
