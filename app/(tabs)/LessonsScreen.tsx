import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  bgColor: string;
  badgeColor: string;
  chapters: {
    id: string;
    title: string;
    description: string;
  }[];
}

const sampleModules: Module[] = [
  {
    id: '1',
    title: 'Capitolul I',
    subtitle: 'Noțiuni de bază',
    description:
      'Învață conceptele de bază necesare pentru a înțelege tematica generală.',
    icon: '📖',
    bgColor: '#ede6fa',
    badgeColor: '#d1c4e9',
    chapters: [
      {
        id: '1-1',
        title: 'Lecția 1: Ce este securitatea cibernetică?',
        description: 'Înțelege noțiunile fundamentale despre siguranța online.',
      },
      {
        id: '1-2',
        title: 'Lecția 2: Cum ne protejăm calculatorul?',
        description:
          'Sfaturi practice pentru a-ți menține dispozitivul în siguranță.',
      },
      {
        id: '1-3',
        title: 'Lecția 3: De ce nu dăm parola nimănui?',
        description: 'Află importanța păstrării parolelor în siguranță.',
      },
      {
        id: '1-4',
        title: 'Lecția 4: Ce este o parolă bună?',
        description: 'Cum creezi o parolă puternică și ușor de reținut.',
      },
      {
        id: '1-5',
        title: 'Lecția 5: Cum recunoaștem un mesaj ciudat?',
        description: 'Semnale care indică mesaje suspecte sau periculoase.',
      },
      {
        id: '1-6',
        title: 'Lecția 6: De ce nu deschidem fișiere necunoscute?',
        description: 'Pericolele ascunse în atașamentele necunoscute.',
      },
      {
        id: '1-7',
        title: 'Lecția 7: Ce este un antivirus?',
        description: 'Rolul programelor antivirus și cum te protejează.',
      },
      {
        id: '1-8',
        title: 'Lecția 8: Joc: Ghiceste pericolul online!',
        description: 'Un joc interactiv pentru identificarea amenințărilor.',
      },
    ],
  },
  {
    id: '2',
    title: 'Capitolul II',
    subtitle: 'Contextul actual',
    description:
      'Explorează contextul actual al siguranței online și provocările moderne.',
    icon: '🌐',
    bgColor: '#c7c6fa',
    badgeColor: '#b3b3e6',
    chapters: [
      {
        id: '2-1',
        title: 'Lecția 1: Ce este internetul?',
        description:
          'Descoperă cum funcționează internetul și cum ne conectează pe toți.',
      },
      {
        id: '2-2',
        title: 'Lecția 2: Cum folosim internetul în siguranță?',
        description:
          'Învață regulile de bază pentru o experiență sigură online.',
      },
      {
        id: '2-3',
        title: 'Lecția 3: De ce este important să fim atenți online?',
        description:
          'Înțelege riscurile și responsabilitățile în mediul online.',
      },
      {
        id: '2-4',
        title: 'Lecția 4: Ce este o aplicație?',
        description:
          'Află ce sunt aplicațiile și cum să le folosești în siguranță.',
      },
      {
        id: '2-5',
        title: 'Lecția 5: Ce este o rețea?',
        description: 'Descoperă cum funcționează rețelele de calculatoare.',
      },
      {
        id: '2-6',
        title: 'Lecția 6: Cine sunt oamenii răi online?',
        description:
          'Învață să recunoști și să te ferești de pericolele online.',
      },
      {
        id: '2-7',
        title: 'Lecția 7: Cum ne pot ajuta părinții să fim protejați?',
        description:
          'Importanța supravegherii și ajutorului părintesc în mediul online.',
      },
      {
        id: '2-8',
        title: 'Lecția 8: Poveste: Aventurile lui Andrei pe internet',
        description: 'O poveste educativă despre siguranța online.',
      },
    ],
  },
];

const lessonProgressData: Record<
  string,
  { progress: number; status: string; statusColor: string; icon: string }
> = {
  '1-1': {
    progress: 60,
    status: 'In Progress',
    statusColor: '#C6F6D5',
    icon: '🔒',
  },
  '1-2': {
    progress: 30,
    status: 'Started',
    statusColor: '#E9D8FD',
    icon: '💻',
  },
  '1-3': {
    progress: 85,
    status: 'Almost Done',
    statusColor: '#D6BCFA',
    icon: '🔑',
  },
  '1-4': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '🔐',
  },
  '1-5': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '✉️',
  },
  '1-6': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '📁',
  },
  '1-7': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '🦠',
  },
  '1-8': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '🎮',
  },
  '2-1': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '🌐',
  },
  '2-2': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '🛡️',
  },
  '2-3': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '👀',
  },
  '2-4': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '📱',
  },
  '2-5': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '🔗',
  },
  '2-6': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '👤',
  },
  '2-7': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '👨‍👩‍👧‍👦',
  },
  '2-8': {
    progress: 0,
    status: 'Not Started',
    statusColor: '#EDF2F7',
    icon: '📖',
  },
};

export default function SubjectsScreen() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sampleModules.map((module) => (
          <View key={module.id} style={styles.moduleContainer}>
            <TouchableOpacity
              style={[styles.moduleButton, { backgroundColor: module.bgColor }]}
              onPress={() => toggleModule(module.id)}
            >
              <View
                style={[
                  styles.moduleBadge,
                  { backgroundColor: module.badgeColor },
                ]}
              >
                <Text style={styles.moduleBadgeText}>MODULE</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
                  <Text style={styles.moduleDescription}>
                    {module.description}
                  </Text>
                </View>
                <Text style={styles.moduleIcon}>{module.icon}</Text>
              </View>
            </TouchableOpacity>

            {expandedModule === module.id && (
              <View style={styles.chaptersContainer}>
                {module.chapters.map((chapter) => {
                  const lessonData = lessonProgressData[chapter.id] || {
                    progress: 0,
                    status: 'Not Started',
                    statusColor: '#EDF2F7',
                    icon: '📘',
                  };
                  return (
                    <Link
                      key={chapter.id}
                      href={{
                        pathname: '/lessonsComponent/ChapterContent',
                        params: {
                          id: chapter.id,
                          title: chapter.title,
                          description: chapter.description,
                        },
                      }}
                      asChild
                    >
                      <TouchableOpacity style={styles.lessonCard}>
                        <View style={styles.iconContainer}>
                          <Text style={styles.lessonIcon}>
                            {lessonData.icon}
                          </Text>
                        </View>
                        <View style={styles.lessonInfo}>
                          <Text style={styles.lessonTitle}>
                            {chapter.title}
                          </Text>
                          <Text style={styles.lessonDescription}>
                            {chapter.description}
                          </Text>
                          <Text style={styles.lessonProgress}>
                            {lessonData.progress}% Complete
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: lessonData.statusColor },
                          ]}
                        >
                          <Text style={styles.statusText}>
                            {lessonData.status}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  );
                })}
              </View>
            )}
          </View>
        ))}
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
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Space for tab bar
  },
  moduleContainer: {
    marginBottom: 16,
  },
  moduleButton: {
    width: '100%',
    maxWidth: 380,
    minHeight: 200,
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 32,
    padding: 28,
    shadowColor: '#b3b3e6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
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
  chaptersContainer: {
    marginLeft: 16,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lessonIcon: {
    fontSize: 24,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  lessonDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  lessonProgress: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#6B46C1',
    fontWeight: 'bold',
  },
});
