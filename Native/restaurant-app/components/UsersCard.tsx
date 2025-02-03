import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <View style={styles.userCard}>
      <View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userRole}>Role: {user.role}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(user.id)}
        >
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(user.id)}
        >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  userRole: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginTop: 8,
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default UserCard;
