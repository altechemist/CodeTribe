import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RecordingItem {
  name: string;
  uri: string; // Storing URI instead of Audio.Recording instance
}

type User = {
  email: string;
  username: string;
  password: string;
  voicenotes: RecordingItem[];
};

const Profile = ({ user }: any) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>(user); // User passed from parent
  const [editing, setEditing] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false); // To track upload state

  useEffect(() => {
    loadUserData();
    requestAudioPermissions();
  }, [user]);

  useEffect(() => {
    // Automatically save updated recordings whenever the recordings state changes
    saveRecordings(recordings);
  }, [recordings]);

  const loadUserData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);
        const currentUser = users.find((userObj) => userObj.username === user);
        if (currentUser) {
          setEmail(currentUser.email);
          setPassword(currentUser.password);
          setRecordings(currentUser.voicenotes);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const requestAudioPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access audio was denied");
      }
    } catch (error) {
      console.error("Error requesting audio permissions:", error);
    }
  };

  // Simulate an upload function for backing up all notes
  const backUpAllNotes = () => {
    setIsUploading(true);

    // Simulating a delay (e.g., uploading the files)
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert(
        "Backup Complete",
        `All your voice notes have been successfully backed up!`
      );
    }, 2000); // Simulate a 2-second upload delay
  };

  // Save updated recordings back to AsyncStorage
  const saveRecordings = async (updatedRecordings: RecordingItem[]) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((userObj: any) => {
          if (userObj.username === username) {
            return { ...userObj, voicenotes: updatedRecordings };
          }
          return userObj;
        });
        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      }
    } catch (error) {
      console.error("Error saving recordings:", error);
    }
  };

  const handleSave = async () => {
    const updatedUser = { username, email, password, voicenotes: recordings };

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      let users: User[] = [];
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }

      const userIndex = users.findIndex(
        (userObj) => userObj.username === updatedUser.username
      );
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      } else {
        users.push(updatedUser);
      }

      await AsyncStorage.setItem("users", JSON.stringify(users));
      setEditing(false);
      Alert.alert(
        "Profile Saved",
        "Your profile and voice notes have been saved successfully!"
      );
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <View className="p-5 flex-1">
      <View className="flex flex-row gap-14 p-2">
        {/* Avatar */}
        <Ionicons name="person" size={46} color="gray" className="p-0 w-64" />

        {/* Edit Profile Button */}
        <TouchableOpacity
          onPress={() => (editing ? handleSave() : setEditing(true))}
          className="w-24 flex mb-8 end"
        >
          <Ionicons name={editing ? "save" : "pencil"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="mb-8">
        {editing ? (
          <>
            <Text>Email:</Text>
            <TextInput
              className="border border-gray-400 p-3 rounded-lg mb-4"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
          </>
        ) : (
          <>
            <Text className="text-2xl font-bold w-48 mb-5">{username}</Text>
            <Text>{email}</Text>
          </>
        )}

        {editing ? (
          <>
            <Text>Username:</Text>
            <TextInput
              className="border border-gray-400 p-3 rounded-lg mb-4"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
          </>
        ) : (
          <Text>Current Memos: #</Text>
        )}
      </View>

      {/* Back Up All Notes Button */}
      <TouchableOpacity
        onPress={backUpAllNotes}
        className="mt-6 p-3 bg-black rounded-full flex-row items-center justify-center"
      >
        <Ionicons name="cloud-upload" size={24} color="white" />
        <Text className="ml-2 text-white">Back Up All Notes</Text>
      </TouchableOpacity>

      {isUploading && (
        <View className="mt-4 p-3 bg-yellow-100 rounded-lg flex-row items-center justify-center">
          <Ionicons name="cloud-upload-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600">Uploading...</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;
