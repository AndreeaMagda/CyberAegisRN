import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface ProgressBarProps {
  progress: number;
  progressAnimation: Animated.Value;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  progressAnimation,
}) => {
  return (
    <View style={styles.progressContainer}>
      <Animated.View
        style={[
          platformerGameStyles.progressBar,
          {
            width: progressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
      <Text style={platformerGameStyles.progressText}>
        {progress}% Securizat
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    ...platformerGameStyles.progressContainer,
    position: 'absolute',
    top: 50, // Positioned below the level title
    left: 0,
    right: 0,
    zIndex: 5,
  },
});

export default ProgressBar;
