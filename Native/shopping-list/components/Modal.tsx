import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"; // For the close button icon

const PopUpModal = ({ onAdd }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState({
    id: Date.now().toString(), // Generate a unique ID for the product
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    completed: false,
  });

  const handleAddProduct = () => {
    if (
      !product.name ||
      !product.price ||
      !product.quantity ||
      !product.category ||
      !product.description
    ) {
      Alert.alert("All fields are required.");
      return;
    }
    // Handle adding the product logic here (e.g., adding to list)
    console.log("Product added:", product);
    onAdd(product);

    setProduct({
      id: Date.now().toString(), // Generate a new unique ID for the next product
      name: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
      completed: false,
    });

    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        {/* Main Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 justify-center items-center bg-slate bg-opacity-50">
            <View className="bg-white rounded-xl p-6 w-4/5 max-w-md">
              {/* Modal Header */}
              <View className="flex-row justify-between items-center border-b pb-4 mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  Add New Item
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="gray" />
                </TouchableOpacity>
              </View>

              {/* Modal Body (Form) */}
              <View className="space-y-4">
                {/* Product Name */}
                <View>
                  <Text className="text-sm font-medium text-gray-900">
                    Name
                  </Text>
                  <TextInput
                    value={product.name}
                    onChangeText={(text) =>
                      setProduct({ ...product, name: text })
                    }
                    placeholder="Type product name"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900"
                  />
                </View>

                {/* Product Price */}
                <View>
                  <Text className="text-sm font-medium text-gray-900">
                    Price
                  </Text>
                  <TextInput
                    value={product.price}
                    onChangeText={(text) =>
                      setProduct({ ...product, price: text })
                    }
                    placeholder="2999"
                    keyboardType="numeric"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900"
                  />
                </View>

                {/* Product Quantity */}
                <View>
                  <Text className="text-sm font-medium text-gray-900">
                    Quantity
                  </Text>
                  <TextInput
                    value={product.quantity}
                    onChangeText={(text) =>
                      setProduct({ ...product, quantity: text })
                    }
                    placeholder="9"
                    keyboardType="numeric"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900"
                  />
                </View>

                {/* Product Category */}
                <View>
                  <Text className="text-sm font-medium text-gray-900">
                    Category
                  </Text>
                  <TextInput
                    value={product.category}
                    onChangeText={(text) =>
                      setProduct({ ...product, category: text })
                    }
                    placeholder="Select category"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900"
                  />
                </View>

                {/* Product Description */}
                <View>
                  <Text className="text-sm font-medium text-gray-900">
                    Description
                  </Text>
                  <TextInput
                    value={product.description}
                    onChangeText={(text) =>
                      setProduct({ ...product, description: text })
                    }
                    placeholder="Write product description here"
                    multiline
                    numberOfLines={4}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900"
                  />
                </View>
              </View>

              {/* Submit Button */}
              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  onPress={handleAddProduct}
                  className="bg-blue-700 rounded-lg px-6 py-3 w-full mr-2"
                >
                  <Text className="text-white text-center">Add New Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Floating Button to open the modal */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute bottom-5 right bg-blue-500 rounded-full px-7 p-5 shadow-lg"
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PopUpModal;
