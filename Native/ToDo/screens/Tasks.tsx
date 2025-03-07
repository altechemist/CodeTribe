import React, { useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import ListSection from "../components/ListSection";
import { getTasks } from "../store/taskSlice";
import { useSelector } from "react-redux";

export const Tasks = () => {
  const { tasks, loading, error, success } = useSelector((state) => state.tasks);


  // Fetch tasks from API
  const fetchTasks = async () => {
    // Your API call goes here
    getTasks();
  };


  // Handle loading tasks
  if (loading) {
    return (
      <View className="flex justify-center items-center h-full">
        <ActivityIndicator size="large" color={MD2Colors.blue500} />
      </View>
    );
  }

  return (
    <View className="flex p-2 bg-white mt-8">
      {/* Search Bar */}
      <View className="mb-4 mt-4 sticky-top-0 shadow">
        <SearchBar />
      </View>

      {/* Display a task */}
      <ScrollView className="flex p-1" showsVerticalScrollIndicator={false}>
        <ListSection />
      </ScrollView>
    </View>
  );
};
