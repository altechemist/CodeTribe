import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReservationsCard = ({ reservation, onEdit, onDelete }) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.userName}>{reservation.user}</Text>
      <Text style={styles.reservationDetails}>
        {reservation.restaurant} • {reservation.date} • {reservation.time}
      </Text>
      <Text style={styles.guestCount}>Guests: {reservation.guests}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onEdit(reservation.id)}
      >
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(reservation.id)}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reservationDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  guestCount: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default ReservationsCard;
