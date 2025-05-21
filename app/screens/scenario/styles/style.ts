import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scenarioText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  safeButton: {
    backgroundColor: '#4cd137',
    padding: 14,
    borderRadius: 12,
    width: '40%',
  },
  unsafeButton: {
    backgroundColor: '#e84118',
    padding: 14,
    borderRadius: 12,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  result: {
    alignItems: 'center',
    marginTop: 20,
  },
  correctText: {
    fontSize: 22,
    color: 'green',
    marginBottom: 10,
  },
  incorrectText: {
    fontSize: 22,
    color: 'red',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#0984e3',
    padding: 14,
    borderRadius: 12,
    width: '60%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
});

export default styles;