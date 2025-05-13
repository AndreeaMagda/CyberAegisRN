import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <View style={styles.scoreContainer}>
      <Text style={platformerGameStyles.scoreText}>SCOR: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    ...platformerGameStyles.scoreContainer,
    position: 'absolute',
    top: 130,
    right: 10,

    zIndex: 10,
  },
});

export default ScoreDisplay;
