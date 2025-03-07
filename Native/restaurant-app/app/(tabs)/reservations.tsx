import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Modal } from "react-native";
import ReservationsCard from "../../components/ReservationCard";
import ReservationForm from "@/components/ReservationForm";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  Reservation,
  deleteReservation,
  fetchReservations,
  updateReservation,
} from "@/redux/slices/reservationSlice";

const Reservations = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>();

  // State declarations must come first.
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);

  // Fetch reservations when the component mounts
  useEffect(() => {
    console.log("Fetching reservations on mount...");
    dispatch(fetchReservations());
  }, [dispatch]);

  // Reload reservations whenever the form is closed
  useEffect(() => {
    if (!isFormVisible) {
      console.log("Modal closed, reloading reservations...");
      dispatch(fetchReservations());
    }
  }, [isFormVisible, dispatch]);

  // Filter reservations for the logged-in user
  const reservations = useSelector((state: RootState) =>
    state.reservations.reservations.filter(
      (res: Reservation) => res.user_id?._id === user?._id
    )
  );

  // Log when reservations change (for debugging)
  useEffect(() => {
    console.log("Reservations updated:", reservations);
  }, [reservations]);

  // When user clicks Edit on a reservation card:
  const handleEditReservation = (reservationId: string) => {
    const reservation = reservations.find((r) => r._id === reservationId);
    console.log("Editing reservation:", reservation);
    if (reservation) {
      setSelectedReservation(reservation);
      setFormVisible(true);
    }
  };

  // Delete action for a reservation:
  const handleDeleteReservation = (reservationId: string) => {
    Alert.alert("Delete Reservation", "Are you sure you want to delete this reservation?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          console.log("Deleting reservation with id:", reservationId);
          dispatch(deleteReservation(reservationId));
        },
      },
    ]);
  };

  // The onSubmit handler passed to ReservationForm.
  // It receives formData from the form, merges it with the selected reservation's _id,
  // and dispatches updateReservation.
  const handleFormSubmit = useCallback(
    (formData: any) => {
      if (!selectedReservation) return;
      dispatch(updateReservation({ id: selectedReservation._id, data: formData }));
      
      // Hide the form and clear the selected reservation
      setFormVisible(false);
      setSelectedReservation(null);
    },
    [dispatch, selectedReservation]
  );

  // Called when the user cancels editing
  const handleCancelForm = () => {
    console.log("Form cancelled");
    setFormVisible(false);
    setSelectedReservation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          
          <ReservationsCard
            reservation={item}
            onEdit={handleEditReservation}
            onDelete={handleDeleteReservation}
          />
        )}
        ListEmptyComponent={<Text>No reservations yet!</Text>}
      />
      {isFormVisible && selectedReservation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFormVisible}
          onRequestClose={handleCancelForm}
        >
          <View style={styles.modalContainer}>
            <ReservationForm
              reservation={selectedReservation}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
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
