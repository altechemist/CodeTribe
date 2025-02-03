import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/users/register`, {
        name,
        email,
        password,
      });

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Signup failed.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Sign Up" />
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Back to Login" onPress={() => router.replace('/login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  secondaryButton: {
    marginTop: 16,
    backgroundColor: '#ccc',
  },
});

export default Signup;
