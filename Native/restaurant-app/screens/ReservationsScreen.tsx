// src/screens/ReservationsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReservationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your reservations will appear here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReservationsScreen;
