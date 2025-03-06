import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFD7ED',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#003B73',
    padding: 16,
    paddingTop: 48,
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BFD7ED',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: '#0074B7',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#60A3D9',
  },
  profileInfo: {
    flex: 1,
    marginRight: 16,
  },
  username: {
    color: '#BFD7ED',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  xpContainer: {
    flex: 1,
  },
  xpText: {
    color: '#60A3D9',
    fontSize: 14,
    marginBottom: 4,
  },
  xpBar: {
    height: 6,
    backgroundColor: '#003B73',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#60A3D9',
  },
  profileButton: {
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: '#60A3D9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  profileButtonText: {
    fontSize: 20,
  },
  currentLessonCard: {
    backgroundColor: '#0074B7',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#60A3D9',
    elevation: 5,
  },
  gameButtonsContainer: {
    gap: 16,
  },
  lessonTitle: {
    color: '#BFD7ED',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#003B73',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#60A3D9',
  },
  progressText: {
    color: '#BFD7ED',
    fontSize: 14,
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#003B73',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#BFD7ED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainGameButton: {
    backgroundColor: '#0074B7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#60A3D9',
    elevation: 5,
  },
  mainGameContent: {
    alignItems: 'center',
  },
  mainGameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BFD7ED',
    marginBottom: 8,
    textAlign: 'center',
  },
  mainGameSubtitle: {
    fontSize: 16,
    color: '#60A3D9',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BFD7ED',
    marginBottom: 16,
  },
  dailyCheckIn: {
    backgroundColor: '#0074B7',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#60A3D9',
    elevation: 5,
  },
  checkInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  dayNumber: {
    color: '#BFD7ED',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  checkMark: {
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: '#003B73',
    borderWidth: 2,
    borderColor: '#60A3D9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  checkMarkText: {
    color: '#BFD7ED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checked: {
    backgroundColor: '#60A3D9',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0074B7',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#60A3D9',
    elevation: 5,
  },
  actionButtonText: {
    color: '#BFD7ED',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles; 