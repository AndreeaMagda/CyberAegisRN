import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/style';

export default function ResultDisplay({
  correct,
  onNext,
}: {
  correct: boolean;
  onNext: () => void;
}) {
  return (
    <View style={styles.result}>
      <Text style={correct ? styles.correctText : styles.incorrectText}>
        {correct ? '✅ Correct!' : '❌ Incorrect!'}
      </Text>
      {!correct && <Text style={styles.emoji}>😢</Text>}
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.buttonText}>Next Scenario</Text>
      </TouchableOpacity>
    </View>
  );
}