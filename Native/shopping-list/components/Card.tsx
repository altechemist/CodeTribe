import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Card = ({ item, onDelete, onEdit, onToggleDone }) => {
  const [checked, setChecked] = useState(item.completed);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onToggleDone(item.id, !checked);
  };

  return (
    <SafeAreaView className="bg-white shadow-sm mb-4 rounded-xl">
      <View className="flex-row justify-between items-center py-1 px-3 rounded-xl">
        {/* Item details */}
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {item?.name}
            </Text>
            <Text className="text-lg font-semibold text-gray-900">
              {item?.id}
            </Text>
            <Text className="text-sm text-gray-600">Qty: {item?.quantity}</Text>
            <Text className="text-sm text-gray-600">
              Price: ${item?.price}
            </Text>
            <Text className="text-sm text-gray-600">
              Category: {item?.category}
            </Text>
            <Text className="text-sm text-gray-600">
              Description: {item?.description}
            </Text>
          </View>
          {/* Checkbox */}
        </View>
        {/* Actions (Edit and Delete buttons) */}
        <View className="flex-row justify-end mt-2">
          {/* Edit Button */}
          <TouchableOpacity onPress={() => onEdit(item)} className="mr-4">
            <MaterialIcons name="edit" size={24} color="blue" />
          </TouchableOpacity>
          {/* Delete Button */}
          <TouchableOpacity onPress={() => onDelete(item?.id)}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Card;
