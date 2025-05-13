import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LevelTitleProps {
  title: string;
}

const LevelTitle: React.FC<LevelTitleProps> = ({ title }) => {
  return (
    <View style={styles.levelTitleContainer}>
      <Text style={styles.levelTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  levelTitleContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
});

export default LevelTitle;
