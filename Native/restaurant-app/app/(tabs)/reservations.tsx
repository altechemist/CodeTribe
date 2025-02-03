// app/tabs/reservations.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Modal, TouchableOpacity } from "react-native";
import ReservationsCard from "../../components/ReservationCard";
import ReservationForm from "@/components/ReservationForm";

const Reservations = () => {
  const [reservations, setReservations] = useState([
    {
      id: "1",
      user: "John Doe",
      restaurant: "Pasta Palace",
      date: "2025-01-20",
      time: "7:00 PM",
      guests: 2,
    },
    {
      id: "2",
      user: "Jane Smith",
      restaurant: "Sushi Spot",
      date: "2025-01-22",
      time: "6:30 PM",
      guests: 4,
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleEditReservation = (reservationId) => {
    const reservation = reservations.find((r) => r.id === reservationId);
    setSelectedReservation(reservation);
    setFormVisible(true);
  };

  const handleDeleteReservation = (reservationId) => {
    Alert.alert(
      "Delete Reservation",
      "Are you sure you want to delete this reservation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setReservations((prev) =>
              prev.filter((reservation) => reservation.id !== reservationId)
            );
          },
        },
      ]
    );
  };

  const handleSaveReservation = (updatedReservation) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === updatedReservation.id ? updatedReservation : reservation
      )
    );
    setFormVisible(false);
    setSelectedReservation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReservationsCard
            reservation={item}
            onEdit={handleEditReservation}
            onDelete={handleDeleteReservation}
          />
        )}
        ListEmptyComponent={<Text>No reservations yet!</Text>}
      />
      {isFormVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFormVisible}
          onRequestClose={() => setFormVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ReservationForm
              reservation={selectedReservation}
              onSave={handleSaveReservation}
              onCancel={() => setFormVisible(false)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
});

export default Reservations;
