import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      console.log(`${apiUrl}/users/login`);
      const response = await axios.post(
        `${apiUrl}/users/login`,
        { email, password }, // Sending the email and password as body
        { headers: { 'Content-Type': 'application/json' } } // Axios sets this automatically, but it's good to be explicit
      );

      // If the response is successful, handle the data
      const data = response.data;
      await AsyncStorage.setItem('token', data.token);

      // Navigate based on user role
      if (data.role === 'admin') {
        router.push('/(admin)/dashboard');
      } else {
        router.push('/(tabs)/home');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Login" />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.push('/signup')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 16,
  },
});

export default Login;
