import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const OutlineInput = () => {
  const [text, setText] = React.useState("");

  return (
    <View className="p-4">
      <View className="mb-4">
        <TextInput
          label="Enter Task Name"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <Button
        icon={'plus'}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Add Task
      </Button>
    </View>
  );
};

export default OutlineInput;
