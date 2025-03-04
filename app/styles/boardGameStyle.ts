import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E2E',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8BA5B0',
    textAlign: 'center',
    marginBottom: 20,
  },
  boardContainer: {
    flex: 1,
    backgroundColor: '#2A2A3A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  boardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    width: (windowWidth - 70) / 6,
    height: (windowWidth - 70) / 6,
    backgroundColor: '#3A3A4A',
    borderRadius: 8,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellActive: {
    backgroundColor: '#4CAF50',
  },
  cellVisited: {
    backgroundColor: '#FFA500',
  },
  cellText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A3A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  playerCard: {
    backgroundColor: '#3A3A4A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playerScore: {
    color: '#4CAF50',
    fontSize: 18,
  },
  diceContainer: {
    backgroundColor: '#2A2A3A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  diceButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  diceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  challengeCard: {
    backgroundColor: '#2A2A3A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  challengeText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#3A3A4A',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  optionIcon: {
    width: 30,
    height: 30,
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameOverCard: {
    backgroundColor: '#2A2A3A',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  gameOverTitle: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  gameOverText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 