import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileRow}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/children/10.jpg',
                }}
                style={styles.profileImage}
              />
              <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Salut, Maya!</Text>
                <Text style={styles.subtitleText}>
                  Explorator al Siguranței Online
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-sharp" size={24} color="#6C63FF" />
            </TouchableOpacity>
          </View>
          {/* Progress Card */}
          <View style={styles.progressCard}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={22}
                  color="#6C63FF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.progressTitle}>Progress</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '60%' }]} />
                <Text style={styles.progressPercent}>60%</Text>
              </View>
              <Text style={styles.progressLevel}>Level 3 • Safety Star</Text>
            </View>
            <View style={styles.badgeSection}>
              <Ionicons name="medal" size={32} color="#1DD1A1" />
              <Text style={styles.badgeLabel}>Badge</Text>
            </View>
          </View>
          {/* Current Lesson Card */}
          <View style={styles.lessonCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lessonLabel}>CURRENT LESSON</Text>
              <Text style={styles.lessonTitle}>How to Spot a Scam</Text>
              <Text style={styles.lessonSubtitle}>
                Find out what makes messages suspicious and how to stay safe.
              </Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => router.push('/subjects')}
              >
                <Ionicons
                  name="play"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
            <Ionicons
              name="search"
              size={32}
              color="#8A8DDF"
              style={styles.lessonSearchIcon}
            />
          </View>
          {/* Platformer Game Card */}
          <View style={styles.gameCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.gameLabel}>PLATFORMER GAME</Text>
              <Text style={styles.gameTitle}>Cyber Quest</Text>
              <Text style={styles.gameSubtitle}>
                Jump, run & learn online safety!
              </Text>
            </View>
            <View style={styles.gameImageWrapper}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-vector/autumn-nature-landscape-scene_1308-62601.jpg?w=200&q=80',
                }}
                style={styles.gameImage}
              />
              <View style={styles.gamepadIconWrapper}>
                <Ionicons name="game-controller" size={22} color="#fff" />
              </View>
            </View>
          </View>
          {/* Quick Actions Row */}
          <View style={styles.quickActionsRow}>
            <View style={styles.quickActionCard}>
              <Ionicons
                name="game-controller"
                size={32}
                color="#10B981"
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionLabel}>Minigames</Text>
            </View>
            <View style={styles.quickActionCard}>
              <Ionicons
                name="bag-handle"
                size={32}
                color="#6C63FF"
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionLabel}>Online Shop</Text>
            </View>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/subjects')}
            >
              <Ionicons
                name="book"
                size={32}
                color="#6C63FF"
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionLabel}>Lessons</Text>
            </TouchableOpacity>
          </View>
          {/* New design will go here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafbfc',
  },
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginRight: 14,
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  subtitleText: {
    fontSize: 15,
    color: '#6C63FF',
    marginTop: 2,
  },
  settingsButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  settingsIcon: {
    fontSize: 22,
    color: '#6C63FF',
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#EEF0FB',
    borderRadius: 6,
    marginVertical: 4,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6C63FF',
    borderRadius: 6,
    height: 12,
    zIndex: 1,
  },
  progressPercent: {
    position: 'absolute',
    right: 8,
    top: -18,
    fontSize: 15,
    color: '#6C63FF',
    fontWeight: 'bold',
    zIndex: 2,
  },
  progressLevel: {
    fontSize: 14,
    color: '#8A8D9F',
    marginTop: 8,
  },
  badgeSection: {
    alignItems: 'center',
    marginLeft: 18,
  },
  badgeLabel: {
    fontSize: 15,
    color: '#1DD1A1',
    fontWeight: 'bold',
    marginTop: 4,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F4F7FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  lessonLabel: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  lessonTitle: {
    color: '#4F46E5',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  lessonSubtitle: {
    color: '#6C63FF',
    fontSize: 15,
    marginBottom: 16,
    maxWidth: 250,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lessonSearchIcon: {
    marginLeft: 18,
    marginTop: 8,
    opacity: 0.5,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  gameLabel: {
    color: '#1DD1A1',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  gameTitle: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  gameSubtitle: {
    color: '#4B5563',
    fontSize: 15,
    marginBottom: 4,
    maxWidth: 220,
  },
  gameImageWrapper: {
    position: 'relative',
    marginLeft: 18,
  },
  gameImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  gamepadIconWrapper: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#1DD1A1',
    borderRadius: 16,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 22,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
});
