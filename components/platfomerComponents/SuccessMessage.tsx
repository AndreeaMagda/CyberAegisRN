import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SuccessMessageProps {
  visible: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.successOverlay}>
      <View style={styles.successBox}>
        <Text style={styles.successTitle}>Securitate Restabilită!</Text>
        <Text style={styles.successText}>
          Bravo! Ai securizat toate sistemele din laborator.
        </Text>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✓</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  successBox: {
    backgroundColor: 'rgba(0, 50, 0, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00ff00',
    width: '80%',
    maxWidth: 400,
  },
  successTitle: {
    color: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00ff00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  successIconText: {
    color: '#003300',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default SuccessMessage;
