import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface NavigationControlsProps {
  onBackPress: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onBackPress,
}) => {
  return (
    <View style={styles.backView}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Text style={styles.backButtonText}>← Back to Levels</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backView: {
    position: 'absolute',
    top: 150,
    left: 10,
    zIndex: 10,
    padding: 8,
  },
});

export default NavigationControls;
