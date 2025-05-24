import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/style';

export default function ScenarioCard({ scenario }: { scenario: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.scenarioText}>{scenario}</Text>
    </View>
  );
}