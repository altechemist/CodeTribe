import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Reservation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !phone || !guests || !date || !time) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Reservation Confirmed',
      `Thank you, ${name}! Your table for ${guests} guest(s) has been reserved on ${date} at ${time}.`
    );

    // Clear form
    setName('');
    setEmail('');
    setPhone('');
    setGuests('');
    setDate('');
    setTime('');
    setSpecialRequests('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Reservation</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
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
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Special Requests (Optional)"
        value={specialRequests}
        onChangeText={setSpecialRequests}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book Table</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: 'top', // For Android to align text at the top
  },
  button: {
    backgroundColor: 'tomato',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reservation;
