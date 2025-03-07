import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import TableCard from '../../components/TablesCard';
import TablesForm from '../../components/TablesForm';
import FloatingButton from '@/components/FloatingButton';

const Tables = () => {
  const [Tables, setTables] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleEditUser = (userId) => {
    const userToEdit = Tables.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setFormVisible(true);
  };

  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setTables((prevTables) =>
              prevTables.filter((user) => user.id !== userId)
            ),
        },
      ]
    );
  };

  const handleAddTable = () => {
    setEditingUser(null);
    setFormVisible(true);
  };

  const handleFormSubmit = (user) => {
    if (editingUser) {
      // Update user
      setTables((prevTables) =>
        prevTables.map((u) => (u.id === user.id ? user : u))
      );
    } else {
      // Add new user
      setTables((prevTables) => [...prevTables, user]);
    }
    setFormVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Tables</Text>

      {isFormVisible ? (
          <Modal
          animationType="slide"
          transparent={true}
          visible={isFormVisible}
          onRequestClose={() => setFormVisible(false)}
        >
          <View style={styles.modalContainer}>
          <TablesForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormVisible(false)}
        />
          </View>
        </Modal>
      
      ) : (
        <FlatList
          data={Tables}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TableCard
              user={item}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Tables available.</Text>
          }
        />
      )}

      {!isFormVisible && (
        <TouchableOpacity  >
          <FloatingButton title="+ Add Table" onPress={handleAddTable} />
        </TouchableOpacity>
      )}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
});

export default Tables;
