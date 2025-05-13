import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // Handle null or undefined colorScheme by defaulting to 'light'
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {

          backgroundColor: Colors[theme].background,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10, // Evită suprapunerea
          height: Platform.OS === 'ios' ? 80 : 60, // Ajustează înălțimea
        },
        tabBarShowLabel: false, // Opțional, dacă vrei doar iconițe
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Acasă',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="LevelSelector"

        options={{
          title: 'Levels',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PlatformerGame"
        options={{
          title: 'Level 1',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="code-working" size={size} color={color} />
          ),
          href: null, // Hide from tab bar but keep accessible via navigation
        }}
      />
    </Tabs>
  );
}
