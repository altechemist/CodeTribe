import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const getTabIcon = (routeName, focused) => {
  const icons = {
    dashboard: focused ? 'grid' : 'grid-outline',
    restaurants: focused ? 'restaurant' : 'restaurant-outline',
    reserve: focused ? 'calendar' : 'calendar-outline',
    tables: focused ? 'fast-food' : 'fast-food-outline',
  };
  return icons[routeName] || 'help-circle-outline';
};

const AdminTabLayout = () => {
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
        headerShown: false, // Hide headers for all tabs
      })}
    >
      {/* Define each tab screen */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          title: 'Manage Restaurants',
          tabBarLabel: 'Restaurants',
        }}
      />
      <Tabs.Screen
        name="reserve"
        options={{
          title: 'Manage Reservations',
          tabBarLabel: 'Reservations',
        }}
      />
      <Tabs.Screen
        name="tables"
        options={{
          title: 'Manage Tables',
          tabBarLabel: 'Tables',
        }}
      />
    </Tabs>
  );
};

export default AdminTabLayout;
