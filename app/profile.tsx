import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ProfileScreen = () => {
  // Mock user data - replace with real data later
  const userData = {
    username: 'CyberHero123',
    xp: 1250,
    completedLessons: [
      {
        id: '1',
        title: 'Parolele - Supereroii care ne protejează conturile!',
      },
      {
        id: '2',
        title: 'Reclamele False – Capcanele din Internet!',
      },
      {
        id: '3',
        title: 'Datele Personale – Comorile Tale Secrete!',
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>CH</Text>
            </View>
          </View>
          <Text style={styles.username}>{userData.username}</Text>
          <View style={styles.xpContainer}>
            <Text style={styles.xpText}>XP: {userData.xp}</Text>
            <View style={styles.xpBar}>
              <View style={[styles.xpProgress, { width: '60%' }]} />
            </View>
          </View>
        </View>

        {/* Completed Lessons Section */}
        <View style={styles.lessonsContainer}>
          <Text style={styles.sectionTitle}>Lectii completate</Text>
          {userData.completedLessons.map((lesson) => (
            <View key={lesson.id} style={styles.lessonCard}>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>

              </View>
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2c3e50',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileImageText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  xpContainer: {
    width: '80%',
    alignItems: 'center',
  },
  xpText: {
    color: '#ecf0f1',
    fontSize: 18,
    marginBottom: 5,
  },
  xpBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 4,
  },
  lessonsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginLeft: 5,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  lessonDate: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  completedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 