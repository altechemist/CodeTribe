import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import ReservationsCard from "../../components/ReservationCard";
import ReservationForm from "../../components/ReservationForm";
import FloatingButton from "@/components/FloatingButton";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const ManageReservations = () => {

  const { reservations, loading, error } = useSelector((state: RootState) => state.reservations);
  const { user } = useSelector((state: RootState) => state.users);

 // If the restaurant has multiple admins, check if the user is one of them
 const restaurantReservations = reservations.filter((reservation) =>
  reservation?.restaurant_id?.admin === user?._id
);



  console.log("reservations: ", restaurantReservations);
  console.log(user?._id)

  const [editingReservation, setEditingReservation] = useState<{ id: string; user: string; restaurant: string; date: string; time: string; guests: number; } | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleAddReservation = () => {
    setEditingReservation(null);
    setFormVisible(true);
  };

  const handleEditReservation = (reservationId: string) => {
    const reservationToEdit = reservations.find((res) => res.id === reservationId);
    setEditingReservation(reservationToEdit || null);
    setFormVisible(true);
  };

  const handleDeleteReservation = (reservationId: string) => {
    setReservations((prev) =>
      prev.filter((res) => res.id !== reservationId)
    );
  };

  const handleFormSubmit = (reservation: { id: string; user: string; restaurant: string; date: string; time: string; guests: number; }) => {
    if (editingReservation) {
      // Update reservation
      setReservations((prev) =>
        prev.map((res) => (res.id === reservation.id ? { ...res, ...reservation } : res))
      );
    } else {
      // Add new reservation
      setReservations((prev) => [...prev, reservation]);
    }
    setFormVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Reservations</Text>

      {isFormVisible ? (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isFormVisible}
        onRequestClose={() => setFormVisible(false)}
      >
        <View style={styles.modalContainer}>
        <ReservationForm
            reservation={editingReservation}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormVisible(false)}
          />
        </View>
      </Modal>
      ) : (
        <>
          <FlatList
            data={restaurantReservations}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ReservationsCard
                reservation={item}
                onEdit={handleEditReservation}
                onDelete={handleDeleteReservation}
                user={user}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No reservations found. Add some data!
              </Text>
            }
          />
          <TouchableOpacity>
            <FloatingButton title="+ Add Reservation" onPress={handleAddReservation} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
});

export default ManageReservations;
