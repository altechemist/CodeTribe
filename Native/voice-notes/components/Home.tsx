import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
  Linking,
} from "react-native";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";

interface RecordingItem {
  name: string;
  uri: string;
  timestamp: Date;
}

const Home = ({ navigation, user }: any) => {
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingName, setRecordingName] = useState<string>("");
  const [playing, setPlaying] = useState<number>(-1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isDialogVisible, setDialogVisible] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRecording) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  useEffect(() => {
    const checkLoginStatus = () => {
      if (!user) {
        navigation.navigate("Login");
      } else {
        loadUserRecordings();
      }
    };

    checkLoginStatus();
  }, [user, navigation]);

  const loadUserRecordings = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const currentUser = users.find(
          (userObj: any) => userObj.username === user
        );
        if (currentUser && currentUser.voicenotes) {
          const reconstructedRecordings = currentUser.voicenotes.map(
            (voicenote: any) => {
              return { name: voicenote.name, uri: voicenote.uri };
            }
          );
          setRecordings(reconstructedRecordings);
        }
      }
    } catch (error) {
      console.error("Error loading user recordings:", error);
    }
  };

  const saveUserRecordings = async (updatedRecordings: RecordingItem[]) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((userObj: any) => {
          if (userObj.username === user) {
            const updatedVoicenotes = updatedRecordings.map((recording) => ({
              name: recording.name,
              uri: recording.uri,
              timestamp: recording.timestamp,
            }));
            return { ...userObj, voicenotes: updatedVoicenotes };
          }
          return userObj;
        });
        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      }
    } catch (error) {
      console.error("Error saving user recordings:", error);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setIsRecording(false);
      setSeconds(0);
      setDialogVisible(true); // Open dialog to save or discard
    }
  };

  const handleSaveRecording = async () => {
    if (recordingName.trim() !== "" && recording) {
      const uri = await recording.getURI();
      const newRecording: RecordingItem = {
        name: recordingName,
        uri: uri ?? "",
        timestamp: new Date(),
      };
      const updatedRecordings = [...recordings, newRecording];
      setRecordings(updatedRecordings);
      saveUserRecordings(updatedRecordings);
      setRecording(null); // Clear the recording state after save
      setRecordingName("");
      setDialogVisible(false); // Close dialog after save
      setIsRecording(false);
    }
  };

  const handleCancelRecording = () => {
    if (recording) {
      recording.stopAndUnloadAsync();
    }
    setRecording(null); // Reset recording state
    setRecordingName(""); // Clear any name input
    setDialogVisible(false); // Close the dialog
    setIsRecording(false); // Set isRecording to false to allow a new recording
  };

  const handlePlayPause = async (index: number) => {
    if (playing !== index) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordings[index].uri },
        { shouldPlay: true },
        (status) => {
          if (status.isPlaying) {
            Animated.timing(progressAnim, {
              toValue: status.positionMillis / status.durationMillis,
              duration: 500,
              useNativeDriver: false,
            }).start();
          }
          if (status.didJustFinish) {
            setPlaying(-1);
            sound.unloadAsync();
          }
        }
      );
      setSound(sound);
      setPlaying(index);
    } else {
      await sound?.pauseAsync();
      setPlaying(-1);
    }
  };

  const handleShare = async (fileUri: string) => {
    // check sharing is available
    try {
      if ((await Sharing.isAvailableAsync()) == true && fileUri) {
        // Share the file
        await Sharing.shareAsync(fileUri, {
          dialogTitle: 'Share your recording',
          mimeType: 'audio/wav',
          UTI: 'com.apple.mobile.audio',
        });
      } else {
        alert("Sharing is not available on this device.");
      }
    } catch (error) {
      console.error("Error sharing file", error);
    }
  };

  const handleDelete = async (index: number) => {
    const updatedRecordings = [...recordings];
    updatedRecordings.splice(index, 1);
    setRecordings(updatedRecordings);
    saveUserRecordings(updatedRecordings);
  };

const handleShareToDrive = async (fileUri: string) => {
  try {
    if (fileUri) {
      // Construct the Google Drive URL for sharingconst googleDriveUrl = `https://drive.google.com/upload`;
      const googleDriveUrl = `https://drive.google.com/drive/home`;

      // Open the Google Drive upload URL
      const result = await Linking.openURL(googleDriveUrl);
      if (result) {
        console.log('Redirecting to Google Drive');
      }
    } else {
      Alert.alert('Error', 'No file to share');
    }
  } catch (error) {
    console.error("Error opening Google Drive:", error);
    Alert.alert('Error', 'Failed to open Google Drive');
  }
};


  return (
    <View className="flex-1 p-4 bg-gray-100">
      <StatusBar style="auto" />

      {/* Search Bar */}
      <View className="flex-row items-center border-2 rounded-xl mb-4 p-2 bg-gray-100 shadow-xl">
        <TextInput
          className="flex-1 ml-2 text-lg"
          placeholder="Search..."
          value={search}
          onChangeText={handleSearch}
        />
        <Ionicons name="mic" size={15} color="gray" />
      </View>

      {/* Timer Display */}
      {isRecording && (
        <View className="flex justify-center items-center mb-4  p-4 bg-white rounded-xl shadow-xl relative">
          <Text className="text-2xl">New Recording...</Text>
          <Text className="text-3xl text-gray-500">{formatTime(seconds)}</Text>
        </View>
      )}

      {/* Save Recording Modal */}
      {isDialogVisible && (
        <View className="flex justify-center items-center h-62 p-4 bg-white rounded-xl shadow-xl relative">
          <Text className="text-2xl mb-4">Enter Recording Name:</Text>
          <TextInput
            className="border rounded-xl p-3 text-lg w-full mb-4"
            onChangeText={(text) => setRecordingName(text)}
            value={recordingName}
          />
          <View className="flex flex-row gap-1">
            <Pressable
              onPress={handleSaveRecording}
              className="py-3 bg-green-700 rounded-lg flex-1"
            >
              <Text className="text-white text-center">Save</Text>
            </Pressable>
            <Pressable
              onPress={handleCancelRecording}
              className="py-3 bg-red-700 rounded-lg flex-1"
            >
              <Text className="text-white text-center">Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Recordings List */}
      <View className="mt-4">
        {recordings
          .filter((rec) =>
            rec.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((recording, index) => (
            <View
              key={index}
              className="flex-row items-center rounded-xl p-4  mb-2 bg-white shadow-xl"
            >
              <TouchableOpacity
                onPress={() => handlePlayPause(index)}
                className="flex-row items-center space-x-3 flex-1"
              >
                <Ionicons
                  name={
                    playing === index
                      ? "pause-circle-outline"
                      : "play-circle-outline"
                  }
                  size={25}
                  color="gray"
                />
                <Text className="text-xl text-black flex-1 ms-5">
                  {recording.name}
                </Text>
              </TouchableOpacity>

              {/* Progress Bar */}
              {playing === index && (
                <View className="flex-1">
                  <Animated.View
                    style={{
                      height: 5,
                      backgroundColor: "gray",
                      borderRadius: 10,
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      }),
                    }}
                  />
                </View>
              )}

              <Ionicons
                name="trash-outline"
                size={20}
                padding={5}
                color="gray"
                onPress={() => {
                  handleDelete(index);
                }}
              />
              <Ionicons
                name="cloud-upload-outline"
                size={20}
                padding={5}
                color="gray"
                onPress={() => {
                  handleShareToDrive(recording.uri)
                }}
              />
              <Ionicons
                name="share-social-outline"
                size={20}
                padding={5}
                color="gray"
                onPress={() => {
                  handleShare(recording.uri);
                }}
              />
            </View>
          ))}

        {/* No recordings found */}
        {recordings.length === 0 && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl text-gray-500">No recordings found.</Text>
          </View>
        )}
      </View>

      {/* Record Button */}
      {!isDialogVisible && (
        <View className="absolute bottom-20 left-0 right-0 flex justify-center items-center p-10">
          <Pressable
            className="rounded-full bg-red-600 p-4"
            onPress={recording ? stopRecording : startRecording}
          >
            <Text className="text-center">
              {recording ? (
                <Ionicons name="stop" size={60} color="white" />
              ) : (
                <Ionicons name="mic" size={60} color="white" />
              )}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Home;
