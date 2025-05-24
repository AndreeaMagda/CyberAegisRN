import { StyleSheet } from 'react-native';

const introScreenStyle = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#c7b6fa', alignItems: 'center', justifyContent: 'center', padding: 32 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#22223b', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 20, color: '#22223b', marginBottom: 32, textAlign: 'center' },
  octopusImage: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: { backgroundColor: '#8f6be8', paddingVertical: 16, paddingHorizontal: 48, borderRadius: 16, marginTop: 12, shadowColor: '#8f6be8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  skipButton: { marginTop: 18, paddingVertical: 10, paddingHorizontal: 32, borderRadius: 12, backgroundColor: 'transparent' },
  skipText: { color: '#8f6be8', fontSize: 17, fontWeight: 'bold', textDecorationLine: 'underline' },
});

export default introScreenStyle; 