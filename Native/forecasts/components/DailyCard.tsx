import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  TextInput,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Text } from "./Themed";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function DailyCard({ path }: { path: string }) {
  const [city, setCity] = useState("Kimberley");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState<boolean>(true);
  const [useLocation, setUseLocation] = useState<boolean>(true);

  let currentDate = new Date().toLocaleString();

  const colorScheme = useColorScheme();

  const handleCityChange = (text: string) => {
    setCity(text);
  };

  // Get user's location
  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationPermissionGranted(false);
      alert("Permission to access location was denied");
      return;
    }
    setLocationPermissionGranted(true);
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location.coords.latitude, location.coords.longitude);
  }

  // Fetch weather data based on location or city
  const fetchWeatherData = async (type?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      let response;
      if (useLocation && location) {
        // Use current location for weather fetch
        response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=83a92bfaa1d2f62fbdad97759023c5e4&units=metric`
        );

        if (type === "manual") {
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=83a92bfaa1d2f62fbdad97759023c5e4&units=metric`
          );
        }
      } else {
        // Use manual city input for weather fetch
        response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=83a92bfaa1d2f62fbdad97759023c5e4&units=metric`
        );
      }

      const data = await response.json();
      if (response.ok) {
        setWeather(data.list);
        console.log(data.list);
      } else {
        setError(data.message || "Failed to fetch weather data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle use location
  const handleUseLocation = () => {
    if (useLocation && locationPermissionGranted) {
      getLocation();
      setUseLocation(true); // trigger location-based fetching if enabled
    }
  };

  const getWeatherIcon = (icon: string) => {
    if (!weather) return null;
    //const weatherCondition = weather.weather[0].icon;
    return (
      <Image
        style={styles.stretch}
        source={{
          uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
        }}
      />
    );
  };

  const textColor = colorScheme === "dark" ? "black" : "white";

  // Effect hook to fetch weather data on startup
  useEffect(() => {
    // If using location and permission granted, fetch location and weather data
    if (useLocation && locationPermissionGranted && !location) {
      getLocation(); // Only fetch location if it hasn't been fetched yet
    } else if (location) {
      // If location is available, fetch weather data
      fetchWeatherData();
    } else if (!useLocation) {
      // If not using location, fetch weather based on city
      fetchWeatherData();
    }
  }, [useLocation, locationPermissionGranted, location]); // Trigger on location or useLocation change

  // Convert date
  const getTime = (dateStr: string) => {
    //const dateStr = "2024-11-21 12:00:00";

    // Create a new Date object from the string
    const date = new Date(dateStr);

    // Extract the abbreviated day of the week (e.g., "Thu", "Fri")
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Extract the time in 24-hour format (e.g., "12:00")
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return `${dayOfWeek}, ${time}`;

    // Format the output
    //console.log(`Day: ${dayOfWeek}`); // Output: Day: Thu (if date is "2024-11-21")
    //console.log(`Time: ${time}`); // Output: Time: 12:00
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={[styles.errorText, { color: textColor }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      {/* City Input and Fetch Button */}
      <View style={styles.searchContainer}>
        {/* Location Button (on the left inside the input) */}
        <TouchableOpacity
          onPress={() => handleUseLocation()}
          style={styles.iconLeft}
        >
          <Ionicons
            name="location-sharp"
            size={20}
            style={{
              marginVertical: 5,
            }}
          />
        </TouchableOpacity>

        {/* City Input (Centered Text) */}
        <TextInput
          placeholder="Enter city"
          value={city}
          onChangeText={handleCityChange}
          style={styles.input}
          placeholderTextColor="#aaa" // Optional, for better placeholder appearance
        />

        {/* Search Button (on the right inside the input) */}
        <TouchableOpacity
          onPress={() => fetchWeatherData("manual")}
          style={styles.iconRight}
        >
          <Ionicons
            name="search"
            size={20}
            style={{
              marginVertical: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Loading and Error States */}
      {isLoading && (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={[styles.errorText, { color: textColor }]}>
            Loading...
          </Text>
        </View>
      )}
      {error && !isLoading && (
        <View style={styles.centeredContainer}>
          <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>
        </View>
      )}
     
      {weather && (
        <View style={styles.container}>
          {/* Horizontal Scroll View for Weather Info */}
          <ScrollView horizontal={true} style={styles.scrollView}>
            {weather.slice(0, 10).map((forecast, index) => {
              return (
                <View key={index} style={styles.dialyForecast}>
                  {/* Weather Icon */}
                  <SafeAreaView style={styles.imageContainer}>
                      {getWeatherIcon(forecast.weather[0].icon)}
                    </SafeAreaView>

                  {/* Temperature */}
                  <Text style={[styles.temperature, { color: textColor }]}>
                    {Math.round(forecast.main.temp)}°
                  </Text>

                  {/* City */}
                  <Text style={[styles.city, { color: textColor }]}>
                    {forecast.name}
                  </Text>

                  {/* Time */}
                  <Text style={[styles.dateTime, { color: textColor }]}>
                    {getTime(forecast.dt_txt)}
                  </Text>

                  {/* Description */}
                  <Text style={[styles.description, { color: textColor }]}>
                    {forecast.weather[0]?.main || "No description"}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
 
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
    backgroundColor: "lightgray",
  },

  iconLeft: {
    position: "absolute",
    left: 10,
  },

  iconRight: {
    position: "absolute",
    right: 10,
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 35,
    marginRight: 50,
  },

  rightContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    justifyContent: "center",
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dialyForecast: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    padding: 5,
    backgroundColor: "lightgray",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginLeft: 10,
    marginBottom: 10,
  },
  stretch: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  temperature: {
    fontSize: 20,
    marginBottom: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 1,
  },
  city: {
    fontSize: 16,
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    marginBottom: 8,
  },
  imageContainer: {
    marginVertical: 5,
  },
  inputContainer: {
    padding: 16,
    borderColor: "#2c2c2c",
  },

  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});
