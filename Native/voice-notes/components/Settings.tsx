import React, { useState, useEffect } from "react";
import { View, Text, Switch, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  // State for managing settings
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [fontColor, setFontColor] = useState<string>("#000000");
  const [feedback, setFeedback] = useState<string>("");

  // Load saved settings on initial render
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await AsyncStorage.getItem("settings");
        if (settings) {
          const parsedSettings = JSON.parse(settings);
          setDarkMode(parsedSettings.darkMode);
          setBackgroundColor(parsedSettings.backgroundColor);
          setFontColor(parsedSettings.fontColor);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to AsyncStorage
  const saveSettings = async () => {
    try {
      const settings = {
        darkMode,
        backgroundColor,
        fontColor,
      };
      await AsyncStorage.setItem("settings", JSON.stringify(settings));
      Alert.alert("Settings Saved", "Your settings have been saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      Alert.alert("Feedback Submitted", "Thank you for your feedback!");
      setFeedback(""); // Clear feedback after submission
    } else {
      Alert.alert("Feedback", "Please enter your feedback before submitting.");
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">

      {/* Dark Mode Toggle */}
      <View className="flex-row items-center mb-4">
        <Text className="text-lg flex-1 text-black">Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => setDarkMode(value)}
        />
      </View>

      {/* Feedback Section */}
      <View className="flex-row items-start mb-4">
        <Text className="text-lg flex-1 text-black">Your Feedback</Text>
        
      </View>
      <TextInput
          className="border-2 rounded-lg p-3 h-40 flex-2 text-white"
          value={feedback}
          onChangeText={setFeedback}
          multiline
          placeholder="Write your feedback..."
          placeholderTextColor="#888"
        />

      {/* Submit Feedback Button */}
      <TouchableOpacity
        className="mt-4 p-4 rounded-lg justify-center items-center bg-black"
        onPress={handleFeedbackSubmit}
      >
        <Text className="text-white font-bold text-lg">Submit Feedback</Text>
      </TouchableOpacity>

      {/* Save Settings Button 
      <TouchableOpacity
        className="mt-4 p-4 rounded-lg justify-center items-center bg-black"
        onPress={saveSettings}
      >
        <Text className="text-white font-bold text-lg">Save Settings</Text>
      </TouchableOpacity>
      */}
    </View>
  );
};

export default Settings;
