import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
  Share,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [gallery, setGallery] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageName, setImageName] = useState<string>("");

  // Load images from AsyncStorage
  const loadGallery = async () => {
    try {
      const storedImages = await AsyncStorage.getItem("gallery");
      if (storedImages) {
        const parsedImages = JSON.parse(storedImages);
        setGallery(parsedImages);
        console.log("Gallery loaded from AsyncStorage:", parsedImages);
      }
    } catch (error) {
      console.error("Failed to load images from storage", error);
    }
  };

  // Save images to AsyncStorage
  const saveGallery = async (images: string[]) => {
    try {
      await AsyncStorage.setItem("gallery", JSON.stringify(images));
      console.log("Gallery saved to AsyncStorage:", images);
    } catch (error) {
      console.error("Failed to save images to storage", error);
    }
  };

  // Load gallery when the app starts
  useEffect(() => {
    loadGallery();
  }, []);

  // Handle saving image with a custom name
  const handleSaveImageWithName = async () => {
    if (!imageName.trim()) {
      Alert.alert("Error", "Please provide a name for the image.");
      return;
    }

    // Save the image with its name
    const imageWithName = {
      name: imageName + ".jpeg",
      uri: selectedImage,
    };

    try {
      // Get the current gallery data
      const storedGallery = await AsyncStorage.getItem("gallery");
      const parsedGallery = storedGallery ? JSON.parse(storedGallery) : [];

      // Add the new image with its name to the gallery
      const updatedGallery = [...parsedGallery, imageWithName];
      setGallery(updatedGallery);

      // Save the updated gallery
      await saveGallery(updatedGallery);

      // Close the modal
      setModalVisible(false);
      setImageName(""); // Reset name input
    } catch (error) {
      console.error("Failed to save image with name", error);
    }
  };

  // Take a photo using the camera
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    console.log("Camera Result: ", result);
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No image", "No image was captured.");
    }
  };

  // Upload a photo from the gallery
  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Media library access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log("Upload Result: ", result);
    if (!result.canceled && result.assets && result.assets[0].uri) {
      const newGallery = [...gallery, result.assets[0].uri];
      setGallery(newGallery);
      saveGallery(newGallery);
    } else {
      Alert.alert("No image", "No image was selected.");
    }
  };

  // Render each image in the gallery
  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => handleOpenImage(item)}>
          <Ionicons name="information" size={15} style={styles.infoIcon} />
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  };

  // Open image in full-screen mode
  const handleOpenImage = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  // Handle deletion of image from storage
  const handleDelete = (imageUri: string) => {
    const updatedGallery = gallery.filter((uri) => uri !== imageUri);
    setGallery(updatedGallery);
    saveGallery(updatedGallery);
    Alert.alert("Image deleted", "The selected image has been deleted.");

    // Close modal
    handleCloseImage();
  };

  // Handle sharing image
  const handleShare = (imageUri: string) => {
    Alert.alert("Share", "Share the selected image with others?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Share",
        onPress: () => {
          // Open the sharing options for the selected image
          Share.share({
            title: "Image from My Gallery",
            message: selectedImage,
            url: selectedImage,
          });
        },
      },
    ]);
  };

  // Handle favorites
  const handleFavorites = (imageUri: string) => {
    Alert.alert("Favorite", "Add the selected image to your favorites?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Favorite",
        onPress: () => {
          // Add the image to your favorites
          // (You can use a favorite storage library like AsyncStorage or Redux)
        },
      },
    ]);
  };

  // Handle switching images
  const handlePreviousImage = () => {
    const currentIndex = gallery.findIndex((uri) => uri === selectedImage);
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setSelectedImage(gallery[previousIndex]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = gallery.findIndex((uri) => uri === selectedImage);
    const nextIndex = currentIndex + 1;
    if (nextIndex < gallery.length) {
      setSelectedImage(gallery[nextIndex]);
    }
  };

  const fullScreenView = selectedImage && (
    <View style={styles.fullScreenContainer}>
      {/* Close button */}
      <TouchableOpacity onPress={handleCloseImage} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>

      {/* Next Previous Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          onPress={() => handlePreviousImage()}
          className="bg-blue"
        >
          <Ionicons name="caret-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNextImage()}>
          <Ionicons name="caret-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />

      {/* Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="heart" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="pencil" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare(selectedImage)}>
          <MaterialIcons name="share" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(selectedImage)}>
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Full-screen view when an image is selected */}
      {fullScreenView}

      {/* Gallery */}
      {!selectedImage && (
        <FlatList
          data={gallery}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
          contentContainerStyle={styles.galleryContainer}
        />
      )}

      {/* Action buttons for camera and upload */}
      {!selectedImage && (
        <View className="flex-row gap-8 bg-slate-50 border justify-center bottom-0 w-auto rounded-xl py-4 px-4 absolute">
          <TouchableOpacity onPress={handleTakePhoto}>
            <Ionicons name="camera" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUploadPhoto}>
            <Ionicons name="cloud-upload" size={30} />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for saving image with name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center align-middle"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="flex bg-slate-50 p-12 w-1/3 rounded-xl absolute ">
            <View className="flex-row gap-8 mb-4 justify-between">
              <Text className="text-2xl">Edit Image</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="justify-center ms-12 w-8 rounded-full"
              >
                <Ionicons name="close" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Enter image name"
              value={imageName}
              onChangeText={setImageName}
            />
            <Button title="Save" onPress={handleSaveImageWithName} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  galleryContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 80,
    height: 80,
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    padding: 5,
    color: "white",
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1000,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    position: "absolute",
    bottom: 40,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    padding: 10,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 666,
    position: "absolute",
    bottom: 490,
    zIndex: 1000,
    borderRadius: 10,
    padding: 10,
  },
  bottomActionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    position: "absolute",
    bottom: 40,
  },

  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
