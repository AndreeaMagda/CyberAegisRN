import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface HelpButtonProps {
  onPress: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.helpButton} onPress={onPress}>
      <Text style={styles.helpButtonText}>?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 100, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  helpButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HelpButton;
