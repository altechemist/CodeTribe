import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const getTabIcon = (routeName: string, focused: boolean) => {
  const icons = {
    home: focused ? 'home' : 'home-outline',
    search: focused ? 'search' : 'search-outline',
    reservations: focused ? 'calendar' : 'calendar-outline',
    profile: focused ? 'person' : 'person-outline',
  };
  return icons[routeName] || 'help-circle-outline';
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={getTabIcon(route.name, focused)} size={size} color={color} />
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false, // Hide headers by default
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarLabel: 'Search' }} />
      <Tabs.Screen
        name="reservations"
        options={{ title: 'Reservations', tabBarLabel: 'Reservations' }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tabs>
  );
};

export default TabLayout;
