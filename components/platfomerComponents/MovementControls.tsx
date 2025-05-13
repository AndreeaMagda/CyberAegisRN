import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface MovementControlsProps {
  onDirectionPress: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onDirectionRelease: () => void;
}

export default function MovementControls({
  onDirectionPress,
  onDirectionRelease,
}: MovementControlsProps) {
  return (
    <View style={styles.controls}>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => onDirectionPress('up')}
          onPressOut={onDirectionRelease}
        >
          <Text style={styles.controlButtonText}>↑</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => onDirectionPress('left')}
          onPressOut={onDirectionRelease}
        >
          <Text style={styles.controlButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.controlButtonSpacer} />
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => onDirectionPress('right')}
          onPressOut={onDirectionRelease}
        >
          <Text style={styles.controlButtonText}>→</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => onDirectionPress('down')}
          onPressOut={onDirectionRelease}
        >
          <Text style={styles.controlButtonText}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 10,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  controlButtonSpacer: {
    width: 50,
    height: 50,
    margin: 5,
  },
});
