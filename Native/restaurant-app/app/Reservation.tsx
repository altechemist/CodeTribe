import { createReservation } from "@/redux/slices/reservationSlice";
import { RootState } from "@/redux/store";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { Restaurant } from "@/redux/slices/restaurantSlice";
import Button from "@/components/Button";

const Reservation = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [selectedSpot, setSelectedSpot] = useState<Date | null>(null);

  const { id } = useLocalSearchParams();
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>();

  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const restaurant = restaurants.find(
    (restaurant: Restaurant) => restaurant._id === id
  );

  // Map available spots
  const availableSpots = restaurant?.availableSlots;

  // Handle spot selection
  const handleSpotSelection = (itemValue: string) => {
    if (itemValue) {
      const newDate = new Date(itemValue);
      setSelectedSpot(newDate);
    } else {
      setSelectedSpot(null);
    }
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    return date
      ? date.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Select a Spot";
  };

  const handleSubmit = async () => {
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !numberOfPeople ||
      !selectedSpot
    ) {
      const errorMessage = "Please fill in all required fields.";
      Platform.OS === "web"
        ? alert(errorMessage)
        : Alert.alert("Error", errorMessage);
      return;
    }

    const reservationData = {
      user_id: user?._id || "",
      restaurant_id: id,
      restaurant_name: restaurant?.name,
      fullName,
      email,
      phoneNumber,
      date: selectedSpot.toISOString().split("T")[0], // YYYY-MM-DD
      time: selectedSpot.toTimeString().split(" ")[0], // HH:MM:SS
      numberOfPeople,
      specialRequests,
    };

    console.log(reservationData);
    await dispatch(createReservation(reservationData));

    const successMessage = `Thank you, ${fullName}! Your table for ${numberOfPeople} guest(s) has been reserved on ${formatDate(
      selectedSpot
    )}.`;
    Platform.OS === "web"
      ? alert(successMessage)
      : Alert.alert("Reservation Confirmed", successMessage);

    // Clear form
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setNumberOfPeople("");
    setSelectedSpot(null);
    setSpecialRequests("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Reservation</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        keyboardType="numeric"
        value={numberOfPeople}
        onChangeText={setNumberOfPeople}
      />

      {/* Dropdown for available spots */}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedSpot?.toISOString()}
          onValueChange={handleSpotSelection}
        >
          <Picker.Item label="Select a Spot" value={null} />
          {availableSpots?.map((spot, index) => (
            <Picker.Item
              key={index}
              label={formatDate(new Date(spot))}
              value={spot}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="Special Requests (Optional)"
        value={specialRequests}
        onChangeText={setSpecialRequests}
        multiline
        numberOfLines={4}
      />

      <Button title="Book Table" onPress={handleSubmit} />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  pickerContainer: {
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default Reservation;
