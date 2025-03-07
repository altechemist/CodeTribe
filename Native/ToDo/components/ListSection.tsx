import * as React from "react";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Card, IconButton, MD3Colors, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, getTasks, updateTask } from "../store/taskSlice";


interface Task {
  createdAt: Date;
  uid: string;
  content: string;
  id: string;
  name: string;
}

const ListSection = () => {
  // Get state from Redux store
  const { tasks, loading, error } = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();

  // Fetch tasks when the component mounts
  useEffect(() => {
    if (!loading && tasks.length === 0) {
      // Only fetch if tasks are not already loaded
      dispatch(getTasks());
    }
  }, [dispatch, loading, tasks.length]); // Only trigger effect when needed



  // Update tasks
  const handleUpdateTask = (id: string) => {
    dispatch(updateTask(id))
  };
  
  // Delete task
  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id))
  };


  console.log(tasks);

  const buttons = (task: Task) => {
    return (
      <View className="flex-row">
        <IconButton
          icon="pencil"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          icon="check"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => handleUpdateTask(task.id)}
        />
        <IconButton
          icon="close"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => handleDeleteTask(task.id)}
        />
      </View>
    );
  };

  return (
    <ScrollView className="p-2 mb-4">
      {tasks.map((task: Task) => (
        <Card className="mt-4">
          <Card.Title
            key={task.id} // Ensure each child has a unique key
            title={<Text variant="titleLarge">{task.name}</Text>}
            subtitle={task.content}
            right={() => buttons(task)}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

export default ListSection;
