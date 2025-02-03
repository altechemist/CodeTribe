import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

const FloatingButton: React.FC<ButtonProps> = ({ title, onPress, color = 'tomato' }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute', // Makes it a floating element
    bottom: 16, // Distance from the bottom edge
    right: 16, // Distance from the right edge
    backgroundColor: 'blue', // Background color for the button
    padding: 14, // Padding for the button content
    borderRadius: 50, // Circular appearance
    alignItems: 'center', // Center align text/icon horizontally
    justifyContent: 'center', // Center align text/icon vertically
    elevation: 5, // Adds shadow effect on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default FloatingButton;
