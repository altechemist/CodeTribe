import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";

import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";

import "./global.css";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Create Stack Navigator for Auth screens

function AuthStack({ setIsLoggedIn, setUser }: any) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false}} // Hide header for Login screen
      >
        {(props) => (
          <Login {...props} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }} // Hide header for Register screen
      >
        {(props) => (
          <Register
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track the login state
  const [user, setUser] = useState([]); // Track logged in user

  useEffect(() => {
    const checkLoginStatus = () => {
      // Simulate user login status check
      setIsLoggedIn(false); // Change this based on your logic
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Voice Memos"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F3F4F6', // Default background color for headers
          },
          headerTintColor: '#fff', // Default text color for the header
        }}
      >
        {/* Conditional screens */}
        <Drawer.Screen
          name="Voice Memos"
          component={isLoggedIn ? () => <Home user={user} /> : () => <AuthStack setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
          options={{
            headerStyle: {
              backgroundColor: '#F3F4F6',
            },
            headerTintColor: '#000',
          }}
          
        />
        {isLoggedIn && (
          <>
            <Drawer.Screen
              name="Profile"
              children={() => <Profile user={user} />}
              options={{
                headerStyle: {
                  backgroundColor: '#F3F4F6',
                },
                headerTintColor: '#000',
              }}
            />
            <Drawer.Screen
              name="Settings"
              children={() => <Settings user={user} />}
              options={{
                headerStyle: {
                  backgroundColor: '#F3F4F6',
                },
                headerTintColor: '#000',
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
