import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.header}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default Header;
