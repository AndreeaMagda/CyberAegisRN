import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/tabs/LoginScreen";
import SignUpScreen from "./app/tabs/SignUpScreen";
import HomeScreen from "./app/tabs/HomeScreen";
import SubjectsScreen from "./screens/SubjectsScreen";
import ChapterContent from "./screens/ChapterContent";

const Stack = createStackNavigator();

if (Platform.OS === "web" && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) => console.error("Service Worker Registration Failed:", error));
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="Subjects" 
          component={SubjectsScreen}
          options={{
            headerShown: true,
            title: 'Learning Modules',
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
            headerTintColor: '#333',
          }}
        />
        <Stack.Screen 
          name="ChapterContent" 
          component={ChapterContent}
          options={{
            headerShown: true,
            title: 'Chapter Content',
            headerStyle: {
              backgroundColor: '#f5f5f5',
            },
            headerTintColor: '#333',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}