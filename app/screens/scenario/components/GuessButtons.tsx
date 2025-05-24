import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/style';

export default function GuessButtons({ onGuess }: { onGuess: (guess: boolean) => void }) {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.safeButton} onPress={() => onGuess(true)}>
        <Text style={styles.buttonText}>Safe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unsafeButton} onPress={() => onGuess(false)}>
        <Text style={styles.buttonText}>Unsafe</Text>
      </TouchableOpacity>
    </View>
  );
}