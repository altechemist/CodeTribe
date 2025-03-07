import * as React from "react";
import { View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

const SearchBar = () => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View>
      <Searchbar
        placeholder="Search"
        style={{ backgroundColor: theme.colors.primary, color: 'white'}}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
};

export default SearchBar;
