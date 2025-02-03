import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createStackNavigator();

const AdminNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
  </Stack.Navigator>
);

export default AdminNavigator;
