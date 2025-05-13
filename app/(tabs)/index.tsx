import React, { useState } from 'react';
import styles from '../../app/styles/indexStyle';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import DailyReward from '../../components/DailyReward';

export default function HomeScreen() {
  const [showDailyReward, setShowDailyReward] = useState(false);
  const router = useRouter();
  // Mock user data - replace with real data later
  const userData = {
    username: 'CyberHero123',
    xp: 1250,
    currentLesson: 'Network Security Basics',
    lessonProgress: 60,
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleStartGame = () => {
    router.push('/(tabs)/LevelSelector');
  };

  const handleContinueLearning = () => {
    router.push('/(tabs)/subjects');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header with Profile */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CyberAegis</Text>
          <View style={styles.profileSection}>
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{userData.username}</Text>
              <View style={styles.xpContainer}>
                <Text style={styles.xpText}>XP: {userData.xp}</Text>
                <View style={styles.xpBar}>
                  <View
                    style={[
                      styles.xpProgress,
                      { width: `${userData.lessonProgress}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleProfilePress}
              activeOpacity={0.7}
            >
              <Text style={styles.profileButtonText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Lesson Status */}
        <View style={styles.currentLessonCard}>
          <Text style={styles.sectionTitle}>Current Lesson 📚</Text>
          <Text style={styles.lessonTitle}>{userData.currentLesson}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${userData.lessonProgress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {userData.lessonProgress}% Complete
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueLearning}
            activeOpacity={0.7}
          >
            <Text style={styles.continueButtonText}>Continue Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Main Game Buttons */}
        <View style={styles.gameButtonsContainer}>
          <TouchableOpacity
            style={styles.mainGameButton}
            onPress={handleStartGame}
            activeOpacity={0.7}
          >
            <View style={styles.mainGameContent}>
              <Text style={styles.mainGameTitle}>🎮 Platformer Game</Text>
              <Text style={styles.mainGameSubtitle}>Choose Your Level</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.mainGameButton}>
            <View style={styles.mainGameContent}>
              <Text style={styles.mainGameTitle}>🥼 Alex's Lab</Text>
              <Text style={styles.mainGameSubtitle}>
                See the results of Alex's experiments
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>

        {/* Daily Reward Button */}
        <TouchableOpacity
          style={styles.dailyRewardButton}
          onPress={() => setShowDailyReward(true)}
        >
          <Text style={styles.dailyRewardButtonText}>
            🎁 Claim Daily Reward
          </Text>
        </TouchableOpacity>

        <DailyReward
          isVisible={showDailyReward}
          onClose={() => setShowDailyReward(false)}
          onClaimReward={(day, reward) => {
            console.log(`Claimed day ${day} reward: ${reward}`);
            // Here you can implement the actual reward logic
          }}
        />

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <Link href="../minigames/minigames" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Minigames 🎲</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Shop 🛍️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
