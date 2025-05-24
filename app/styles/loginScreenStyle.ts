import { StyleSheet } from 'react-native';

const loginScreenStyle = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f7f7fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 32,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#8f6be8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2f2fa',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0ef',
  },
  button: {
    backgroundColor: '#8f6be8',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 18,
    marginTop: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  bottomText: {
    color: '#22223b',
    fontSize: 15,
    marginRight: 4,
  },
  link: {
    color: '#8f6be8',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default loginScreenStyle; 