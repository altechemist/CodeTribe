import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Image, type ImageSource } from "expo-image";
import React from "react";
import { Picker } from "@react-native-picker/picker";

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
  label: string;
  selectedImage?: string;
};

export default function EmojiSticker({
  imageSize,
  selectedImage,
  label,
}: Props) {
  const [editableLabel, setEditableLabel] = React.useState(label); // State for the editable label
  const [labelColor, setLabelColor] = React.useState("white"); // State for label color
  const [fontFamily, setFontFamily] = React.useState("System"); // State for font family
  const [fontWeight, setFontWeight] = React.useState("bold"); // State for font weight

  return (
    <View style={styles.container}>
      <Image
        source={selectedImage}
        style={{ width: imageSize, height: imageSize, top: -285, left: 0 }}
      />

      <TextInput
        value={String(editableLabel || "Jane Doe")}
        onChangeText={setEditableLabel}
        style={{
          position: "absolute",
          top: -95,
          left: -40,
          fontSize: 30,
          textAlign: "center",
          color: labelColor,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          textShadowColor: "rgba(0, 0, 0, 0.7)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,
        }}
      />

      {/* Inputs container arranged horizontally */}
      <View style={styles.inputsContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Color</Text>
          <Pressable style={styles.inputButton}>
            <Picker
              selectedValue={labelColor}
              onValueChange={setLabelColor}
              style={styles.picker}
            >
              <Picker.Item label="White" value="white" />
              <Picker.Item label="Red" value="red" />
              <Picker.Item label="Blue" value="blue" />
              <Picker.Item label="Green" value="green" />
              <Picker.Item label="Black" value="black" />
            </Picker>
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Font</Text>
          <Pressable style={styles.inputButton}>
            <Picker
              selectedValue={fontFamily}
              onValueChange={setFontFamily}
              style={styles.picker}
            >
              <Picker.Item label="System" value="System" />
              <Picker.Item label="Arial" value="Arial" />
              <Picker.Item label="Roboto" value="Roboto" />
              <Picker.Item label="Courier New" value="Courier New" />
              <Picker.Item label="Times New Roman" value="Times New Roman" />
            </Picker>
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Weight</Text>
          <Pressable style={styles.inputButton}>
            <Picker
              selectedValue={fontWeight}
              onValueChange={setFontWeight}
              style={styles.picker}
            >
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Bold" value="bold" />
              <Picker.Item label="Light" value="100" />
              <Picker.Item label="Medium" value="500" />
              <Picker.Item label="Heavy" value="900" />
            </Picker>
          </Pressable>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 20,
    left: -15,
    paddingHorizontal: 20,
  },
  inputGroup: {
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  inputButton: {
    borderWidth: 2,
    borderColor: "#ffd33d",
    paddingHorizontal: 5,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  picker: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});
