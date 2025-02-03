import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Provider } from "react-redux"; // Import the Provider
import store from "./redux/store"; // Import the store
import "./global.css";
import { StatusBar } from "expo-status-bar";

const Drawer = createDrawerNavigator();

// The Drawer Navigator wraps the screens that you want in the menu
const DrawerNavigator = () => {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </Provider>
  );
};

// App component
export default function App() {
  return (
    <NavigationContainer>
      {/* Use the DrawerNavigator instead of StackNavigator */}
      <DrawerNavigator />
    </NavigationContainer>
  );
}
