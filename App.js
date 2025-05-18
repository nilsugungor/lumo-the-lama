// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SocialSpaceScreen from './screens/SocialSpaceScreen';
import SavedPlacesScreen from './screens/SavedPlacesScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AccountScreen from './screens/AccountScreen';

// Your previous imports
import HabitTrackerScreen from './screens/HabitTrackerScreen';
import ToDoLama from './screens/ToDoLama';

// NEW imports for activities and chatbot
import Activities from './screens/Activities';
import Chatbot from './screens/Chatbot';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SocialSpace" component={SocialSpaceScreen} />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />

        <Stack.Screen name="HabitTracker" component={HabitTrackerScreen} />
        <Stack.Screen name="ToDoLama" component={ToDoLama} />

        {/* Add these new screens */}
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
