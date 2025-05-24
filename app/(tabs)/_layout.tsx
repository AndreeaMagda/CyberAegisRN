import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#6C63FF',
            borderTopWidth: 0,
            elevation: 0,
            height: Platform.OS === 'ios' ? 100 : 80,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom + 20 : 24,
            paddingTop: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarItemStyle: {
            paddingTop: 0,
            marginTop: -4,
          },
          tabBarIconStyle: {
            marginBottom: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 20 : 12,
          },
          tabBarButton: (props) => {
            const { children, onPress, accessibilityState } = props;
            const isSelected = accessibilityState?.selected;

            return (
              <View style={styles.tabButton}>
                <View
                  style={[
                    styles.tabButtonContent,
                    isSelected && styles.selectedTab,
                  ]}
                >
                  <TouchableOpacity onPress={onPress} style={styles.touchable}>
                    {children}
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}
      >
        <Tabs.Screen
          name="../SubjectsScreen"
          options={{
            title: 'Subjects',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'book' : 'book-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="PlatformerGame"
          options={{
            title: 'Game',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'game-controller' : 'game-controller-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="LevelSelector"
          options={{
            title: 'Levels',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="LessonsScreen"
          options={{
            title: 'Lessons',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'book' : 'book-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
  },
  tabButtonContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  touchable: {
    alignItems: 'center',
  },
});
