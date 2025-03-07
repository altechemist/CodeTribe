import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation, setIsLoggedIn, setUser }: any) => {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("pass123");

  // Function to check if user exists in AsyncStorage
  const checkUserExists = async (username: string, password: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      console.log(storedUsers)
      if (storedUsers) {
        const users = JSON.parse(storedUsers);

        // Find the user by username and check password
        const user = users.find(
          (userObj: any) =>
            userObj.username === username && userObj.password === password
        );

        if (user) {
          return true; // User exists and credentials match
        } else {
          return false; // Invalid credentials
        }
      } else {
        return false; // No users found
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  const handleLogin = async () => {
    
    if (!username || !password) {
      Alert.alert("Error", "Please fill out both fields.");
      return;
    }

    const isUserValid = await checkUserExists(username, password);
    if (isUserValid) {
      setIsLoggedIn(true);
      setUser(username); // Set the user for the application
      navigation.navigate("Voice Memos"); // Navigate to voice memos screen
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register"); // Navigate to the registration screen
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 40, // Ensure there's space for keyboard
          backgroundColor: "rgb(243 244 246)",
        }}
        keyboardShouldPersistTaps="handled" // Keeps taps on inputs when keyboard is open
      >
        <Text className="text-3xl text-center mb-6">Welcome Back!</Text>

        <View className="w-full max-w-md bg-white p-6 pt-12 rounded-lg shadow-xl">
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            className="h-12 border border-gray-300 rounded-xl pl-2 mb-4"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            className="h-12 border border-gray-300 rounded-xl pl-2 mb-6"
          />
          <Pressable onPress={handleLogin}>
            <Text className="text-white bg-black rounded-xl py-3 text-center font-bold text-lg">
              Login
            </Text>
          </Pressable>

          <Text className="mt-4 text-center">Don't have an account?</Text>
          <Pressable onPress={handleRegister} className="text-center mt-2">
            <Text className="text-blue-700 text-center">Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
