import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import TextItem from '../../components/TextItem'; // A reusable component for displaying text rows
import Button from '../../components/Button'; // Reusable Button component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { RootState, AppDispatch } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Clear token or session data
      router.replace('/login'); // Navigate back to the login screen
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Your Profile" />
      <TextItem label="Name" value={user?.name || 'John Doe' }/>
      <TextItem label="Email" value={user?.email || 'email@domain.com' } />
      <Button title="My Reservations" onPress={() => router.replace('/reservations')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default Profile;
