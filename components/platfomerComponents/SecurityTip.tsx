import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SecurityTipProps {
  tip: string;
  visible: boolean;
}

const SecurityTip: React.FC<SecurityTipProps> = ({ tip, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.tipContainer}>
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>{tip}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tipContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  tipBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 15,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  tipText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SecurityTip;
