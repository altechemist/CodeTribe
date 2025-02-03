import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

interface DashboardProps {
  navigation: NavigationProp<any>;
}

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  // Sample analytics data
  const analyticsData = [
    { id: '1', label: 'Peak Hours', value: '7:00 PM - 9:00 PM' },
    { id: '2', label: 'Most Reserved Day', value: 'Friday' },
    { id: '3', label: 'Total Reservations This Week', value: '145' },
    { id: '4', label: 'Top Performing Restaurant', value: 'Italian Bistro' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Analytics</Text>
      <View style={styles.analyticsSection}>
        <FlatList
          data={analyticsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsLabel}>{item.label}</Text>
              <Text style={styles.analyticsValue}>{item.value}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'tomato',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  analyticsSection: {
    marginTop: 32,
  },
  analyticsTitle: {
    color: 'tomato',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  analyticsCard: {
   flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  analyticsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  analyticsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
    marginTop: 4,
  },
});

export default Dashboard;
