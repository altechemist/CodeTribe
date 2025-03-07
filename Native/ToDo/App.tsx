import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

// Import Redux and React-Redux dependencies
import { Provider } from "react-redux";
import { store } from "./store/store";

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import "./global.css";
import { Tasks } from "./screens/Tasks";
import FloatingButton from "./components/FAB";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
    text: "orange",
  },
};

export default function App() {
  //const { user, loading, error}
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <View className="flex-1">
          <StatusBar style="auto" />

          <Tasks />
          
        </View>
        <View className="mb-4 mt-4 sticky-bottom-0 shadow">
          <FloatingButton />
        </View>
      </PaperProvider>
    </Provider>
  );
}
