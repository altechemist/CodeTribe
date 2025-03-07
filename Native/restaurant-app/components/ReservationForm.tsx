import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Picker } from "@react-native-picker/picker"; // Import Picker component

const ReservationForm = ({ reservation, onSubmit, onCancel }) => {
  // Form states
  const [restaurant, setRestaurant] = useState(
    reservation ? reservation.restaurant_name : ""
  );
  const [date, setDate] = useState(
    reservation ? new Date(reservation.date) : new Date()
  );
  const [time, setTime] = useState(
    reservation
      ? new Date(`${reservation.date}T${reservation.time}`)
      : new Date()
  );
  const [selectedSpot, setSelectedSpot] = useState(""); // For available spot selection
  const [guests, setGuests] = useState(
    reservation ? reservation.numberOfPeople.toString() : ""
  );
  const [specialRequests, setSpecialRequests] = useState(
    reservation ? reservation.specialRequests : ""
  );


  const { loading, error } = useSelector((state: RootState) => state.reservations);

  // Get lists from Redux store
  const restaurantList =
    useSelector((state: RootState) => state.restaurants.restaurants) || [];
  const availableSpots = reservation?.restaurant_id?.availableSlots || [];

  useEffect(() => {
    if (reservation) {
      setRestaurant(reservation.restaurant_name);
      setDate(new Date(reservation.date));
      setTime(new Date(`${reservation.date}T${reservation.time}`));
      setGuests(reservation.numberOfPeople.toString());
      setSpecialRequests(reservation.specialRequests);
    }
  }, [reservation]);

  // Formats a spot (assumed to be an ISO date/time string) to "MM/DD/YYYY HH:MM"
  const formatSpot = (spot) => {
    const d = new Date(spot);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const handleSubmit = () => {
    if (!restaurant || !date || !time || !guests) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const formData = {
      restaurant_name: restaurant,
      date: date.toISOString().split("T")[0], // YYYY-MM-DD
      time: time.toTimeString().slice(0, 5), // HH:MM (first 5 characters, e.g., "14:30")
      numberOfPeople: Number(guests),
      specialRequests,
    };

    if (!reservation._id) {
      Alert.alert("Error", "Reservation ID is missing.");
      return;
    }

    // Dispatch the update reservation action (or call onSubmit if using that prop)
    //dispatch(updateReservation({ id: reservation._id, formData }));
    console.log("form data: ", formData)
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {reservation ? "Edit Reservation" : "Add Reservation"}
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Picker for Restaurant */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Restaurant</Text>
        <Picker
          style={styles.picker}
          selectedValue={restaurant}
          onValueChange={(itemValue) => setRestaurant(itemValue)}
        >
          <Picker.Item label="Select Restaurant" value="" />
          {restaurantList.map((restaurantItem, index) => (
            <Picker.Item
              key={index}
              label={restaurantItem.name}
              value={restaurantItem.name}
            />
          ))}
        </Picker>
      </View>

      {/* Picker for Available Spot */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Available Spot</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedSpot}
          onValueChange={(itemValue) => setSelectedSpot(itemValue)}
        >
          <Picker.Item label="Select Spot" value="" />
          {availableSpots.map((spot, index) => (
            <Picker.Item
              key={index}
              label={formatSpot(spot)}
              value={spot.toString()}
            />
          ))}
        </Picker>
      </View>

      {/* TextInput for Number of Guests (independent from the spot selection) */}
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        value={guests}
        onChangeText={setGuests}
        keyboardType="numeric"
      />

      {/* Special Requests */}
      <TextInput
        style={styles.input}
        placeholder="Special Requests"
        value={specialRequests}
        onChangeText={setSpecialRequests}
      />

      {/* Loading Indicator and Buttons */}
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
});

export default ReservationForm;
