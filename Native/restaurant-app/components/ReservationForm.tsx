import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReservationForm = ({ reservation, onSubmit, onCancel }) => {
  const [user, setUser] = useState(reservation ? reservation.user : "");
  const [restaurant, setRestaurant] = useState(reservation ? reservation.restaurant : "");
  const [date, setDate] = useState(reservation ? new Date(reservation.date) : new Date());
  const [time, setTime] = useState(reservation ? new Date(`${reservation.date}T${reservation.time}`) : new Date());
  const [guests, setGuests] = useState(reservation ? reservation.guests : "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSubmit = () => {
    if (!user || !restaurant || !date || !time || !guests) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
    onSubmit({
      id: reservation?.id || Date.now().toString(),
      user,
      restaurant,
      date: date.toISOString().split("T")[0],
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      guests: Number(guests),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{reservation ? "Edit Reservation" : "Add Reservation"}</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurant}
        onChangeText={setRestaurant}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        value={guests.toString()}
        onChangeText={setGuests}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReservationForm;
