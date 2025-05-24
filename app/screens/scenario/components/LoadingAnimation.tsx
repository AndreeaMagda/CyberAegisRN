import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from '../styles/style';

export default function LoadingAnimation() {
  return (
    <View style={styles.center}>
      <LottieView
        source={require('../assets/loading-animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}