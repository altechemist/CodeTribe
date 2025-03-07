import * as React from "react";
import { View, Text } from "react-native";
import { useTheme, FAB, Button, TextInput, IconButton, MD3Colors } from "react-native-paper";
import { addTask } from "../store/taskSlice";
import { useDispatch } from "react-redux";

const FloatingButton = () => {
  const theme = useTheme();
  const [isAdding, setIsAdding] = React.useState(false);
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const dispatch = useDispatch(); // Use the dispatch function from the Redux store

  const handleAddTask = () => {
    dispatch(addTask(name, content))
    setIsAdding(false);
    setName("");
    setContent("");
    setSuccessMessage("Task added successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <View className="flex-1 justify-center items-center sticky-top-0">
      {/* FAB to toggle the isAdding state */}
      <FAB
        icon="plus"
        style={{
          backgroundColor: theme.colors.primary,
          position: "absolute",
          right: 15,
          bottom: 15,
          
        }}
        onPress={() => setIsAdding(true)} // Update state to true when pressed
      />

      {/* Conditionally render input field and submit button */}
      {isAdding && (
        <View className="flex p-4 w-4/5 bg-white rounded-lg shadow-lg" style={{
            position: "absolute",
            right: 35,
            bottom: 95,
          }}>
          <IconButton
            icon="close"
            iconColor={MD3Colors.error50}
            style={{left: 220, }}
            size={20}
            onPress={() => console.log("Pressed")}
          />

          <TextInput
            label="Enter Task Name"
            style={{ backgroundColor: "2c2c2c", marginBottom: 10}}
            value={name}
            onChangeText={(name) => setName(name)}
          />
           <TextInput
            label="Enter Task Description"
            style={{ backgroundColor: "2c2c2c", marginBottom: 10}}
            value={content}
            onChangeText={(content) => setContent(content)}
          />
          <Button
            icon="plus"
            style={{
              backgroundColor: theme.colors.primary,
              marginVertical: 10,
              alignItems: "center",
            }}
            mode="contained"
            onPress={handleAddTask}
            disabled={!name} // Disable the button if text is empty
          >
            Add Task
          </Button>
        </View>
      )}

      {/* Show success message after task is added */}
      {successMessage && (
        <Text className="mt-4 text-green-500 text-lg">{successMessage}</Text>
      )}
    </View>
  );
};

export default FloatingButton;
