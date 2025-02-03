import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.searchInput, inputStyle]}
        placeholder={placeholder}
        onChangeText={onSearch}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default SearchBar;
