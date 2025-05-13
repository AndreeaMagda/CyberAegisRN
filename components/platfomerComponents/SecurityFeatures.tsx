import React from 'react';
import { View, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

const SecurityFeatures: React.FC = () => {
  return (
    <View style={platformerGameStyles.securityFeatures}>
      <View style={platformerGameStyles.camera}>
        <View style={platformerGameStyles.cameraLens} />
        <View style={platformerGameStyles.cameraBody} />
      </View>
      <View style={platformerGameStyles.keypad}>
        {[...Array(9)].map((_, i) => (
          <View key={i} style={platformerGameStyles.keypadButton} />
        ))}
      </View>
    </View>
  );
};

export default SecurityFeatures;
