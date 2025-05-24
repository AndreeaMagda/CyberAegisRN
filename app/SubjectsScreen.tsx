import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const modules = [
  {
    id: '1',
    title: 'Capitolul I',
    subtitle: 'Noțiuni de bază',
    description: 'Învață conceptele de bază necesare pentru a înțelege tematica generală.',
    icon: '📖',
    bgColor: '#ede6fa',
    badgeColor: '#d1c4e9',
    lessons: [
      { id: '1-1', title: 'Ce este securitatea cibernetică?' },
      { id: '1-2', title: 'Cum ne protejăm calculatorul?' },
    ],
  },
  {
    id: '2',
    title: 'Capitolul II',
    subtitle: 'Contextul actual',
    description: 'Explorează contextul actual al siguranței online și provocările moderne.',
    icon: '🌐',
    bgColor: '#e6e6fa',
    badgeColor: '#b3b3e6',
    lessons: [
      { id: '2-1', title: 'Ce este internetul?' },
      { id: '2-2', title: 'Cum folosim internetul în siguranță?' },
    ],
  },
];

export default function SubjectsScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      {modules.map((mod) => (
        <View key={mod.id} style={{ marginBottom: 32 }}>
          <TouchableOpacity
            style={[styles.moduleCard, { backgroundColor: mod.bgColor }]}
            onPress={() => setExpanded(expanded === mod.id ? null : mod.id)}
            activeOpacity={0.95}
          >
            <View style={[styles.moduleBadge, { backgroundColor: mod.badgeColor }]}> 
              <Text style={styles.moduleBadgeText}>MODULE</Text>
            </View>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>{mod.title}</Text>
              <Text style={styles.moduleSubtitle}>{mod.subtitle}</Text>
              <Text style={styles.moduleDescription}>{mod.description}</Text>
            </View>
            <Text style={styles.moduleIcon}>{mod.icon}</Text>
          </TouchableOpacity>
          {expanded === mod.id && (
            <View style={styles.lessonsContainer}>
              {mod.lessons.map((lesson) => (
                <View key={lesson.id} style={styles.lessonCard}>
                  <Text style={styles.lessonText}>{lesson.title}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  moduleCard: {
    borderRadius: 40,
    padding: 28,
    width: '100%',
    maxWidth: 380,
    minHeight: 200,
    alignSelf: 'center',
    shadowColor: '#b3b3e6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  moduleBadge: {
    position: 'absolute',
    top: 24,
    left: 32,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 4,
    zIndex: 2,
  },
  moduleBadgeText: {
    color: '#5f4bb6',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  moduleTextContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c225c',
    marginTop: 24,
    marginBottom: 0,
  },
  moduleSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c225c',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 16,
    color: '#3d3d5c',
    marginBottom: 0,
  },
  moduleIcon: {
    fontSize: 56,
    marginLeft: 18,
    color: '#5f4bb6',
    textShadowColor: '#b3b3e6',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 2,
  },
  lessonsContainer: {
    marginTop: 16,
    marginLeft: 24,
  },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#b3b3e6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonText: {
    fontSize: 16,
    color: '#2c225c',
  },
}); 