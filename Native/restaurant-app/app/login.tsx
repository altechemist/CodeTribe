import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUser } from '@/redux/slices/userSlice'; 
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { AppDispatch, RootState } from '@/redux/store'; // Ensure these are correctly imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Access Redux state
  const { loading, error } = useSelector((state: RootState) => state.users);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const user = await dispatch(loginUser({ email, password })).unwrap(); 

      // Save token to AsyncStorage
      await AsyncStorage.setItem('token', user.token);

      // Redirect to dashboard
      router.replace('/home');

      
      // Redirection to admin
      if (user?.user.role === 'admin')
      router.replace('/(admin)/dashboard')

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      Alert.alert('Login Failed', errorMessage);
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

      {/* Display error message instead of using Alert.alert inside JSX */}
      {error && <Text style={styles.errorText}>{error}</Text>} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
