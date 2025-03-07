import React, { useState } from "react";
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation, setIsLoggedIn, setUser }: any) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Function to check if username already exists in AsyncStorage
  const checkIfUserExists = async (username: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        // Check if username already exists in stored users
        return users.some((user: { username: string }) => user.username === username);
      }
      return false; // No users found
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  // Function to save new user data to AsyncStorage
  const saveUserToLocalStorage = async (email: string, username: string, password: string) => {
    try {
      const newUser = { email, username, password, voicenotes: [] }; // Empty voice notes initially
      const storedUsers = await AsyncStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      console.log("User data saved to AsyncStorage");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const userExists = await checkIfUserExists(username);
    if (userExists) {
      Alert.alert("Error", "Username already exists. Please choose another.");
      return;
    }

    // Save the new user profile
    await saveUserToLocalStorage(email, username, password);

    // If registration is successful, update the logged-in state and navigate
    setIsLoggedIn(true);
    setUser(username);
    navigation.navigate("Voice Memos"); // Navigate to the home screen or voice memos screen
  };

  const handleLogin = () => {
    navigation.navigate("Login"); // Navigate to the login screen
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
          backgroundColor: "white",
        }}
        keyboardShouldPersistTaps="handled" // Ensures taps on inputs are handled correctly
      >
        <Text className="text-3xl text-center mb-6">Create Account</Text>

        <View className="w-full max-w-md bg-white p-6 pt-12 rounded-lg shadow-xl">
          {/* Email Input */}
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            className="h-12 border border-gray-300 rounded-xl pl-2 mb-4"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Username Input */}
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            className="h-12 border border-gray-300 rounded-xl pl-2 mb-4"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            className="h-12 border border-gray-300 rounded-xl pl-2 mb-4"
            autoCapitalize="none"
          />

          {/* Confirm Password Input */}
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            className="h-12 border border-gray-300 rounded-xl pl-2 mb-6"
            autoCapitalize="none"
          />

          {/* Register Button */}
          <Pressable onPress={handleRegister}>
            <Text className="text-white bg-black rounded-xl py-3 text-center font-bold text-lg">
              Register
            </Text>
          </Pressable>

          {/* Login Link */}
          <Text className="mt-4 text-center">Already have an account?</Text>
          <Pressable onPress={handleLogin} className="text-center mt-2">
            <Text className="text-blue-700 text-center">Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
