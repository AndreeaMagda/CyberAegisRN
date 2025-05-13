import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

const levels = [
  {
    id: 1,
    title: 'Level 1: Cyber Security Basics',
    description: 'Learn the fundamentals of cyber security',
    difficulty: 'Easy',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Level 2: Password Protection',
    description: 'Master the art of creating secure passwords',
    difficulty: 'Medium',
    unlocked: false,
  },
  {
    id: 3,
    title: 'Level 3: Network Defense',
    description: 'Protect your network from cyber attacks',
    difficulty: 'Hard',
    unlocked: false,
  },
  {
    id: 4,
    title: 'Level 4: Advanced Security',
    description: 'Advanced cyber security challenges',
    difficulty: 'Expert',
    unlocked: false,
  },
];

export default function LevelSelector() {
  const router = useRouter();

  const handleLevelSelect = (levelId: number) => {
    if (levelId === 1) {
      router.push('/(tabs)/PlatformerGame');
    } else {
      // For locked levels, you might want to show a message
      console.log('This level is locked!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select Level</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.levelsContainer}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[styles.levelCard, !level.unlocked && styles.lockedLevel]}
              onPress={() => handleLevelSelect(level.id)}
              disabled={!level.unlocked}
            >
              <View style={styles.levelContent}>
                <Text style={styles.levelTitle}>{level.title}</Text>
                <Text style={styles.levelDescription}>{level.description}</Text>
                <View style={styles.levelFooter}>
                  <Text
                    style={[
                      styles.difficultyBadge,
                      styles[
                        level.difficulty.toLowerCase() as keyof typeof styles
                      ],
                    ]}
                  >
                    {level.difficulty}
                  </Text>
                  {!level.unlocked && (
                    <Text style={styles.lockedText}>🔒 Locked</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  levelsContainer: {
    padding: 16,
  },
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  lockedLevel: {
    opacity: 0.7,
  },
  levelContent: {
    padding: 16,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  levelDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  levelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: 'bold',
  },
  easy: {
    backgroundColor: '#2ecc71',
    color: 'white',
  },
  medium: {
    backgroundColor: '#f1c40f',
    color: 'white',
  },
  hard: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  expert: {
    backgroundColor: '#8e44ad',
    color: 'white',
  },
  lockedText: {
    fontSize: 14,
    color: '#95a5a6',
  },
});
