import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import introScreenStyle from './styles/introScreenStyle';
import { useRouter } from 'expo-router';

export default function IntroScreen() {
  const router = useRouter();
  return (
    <View style={introScreenStyle.container}>
      <Text style={introScreenStyle.title}>Bine ai Venit!</Text>
      <Text style={introScreenStyle.subtitle}>Autentifică-te pentru a continua învățarea.</Text>
      <Text style={introScreenStyle.owl}>🦉</Text>
      <TouchableOpacity style={introScreenStyle.button} onPress={() => router.replace('/SignUpScreen')}>
        <Text style={introScreenStyle.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={introScreenStyle.button} onPress={() => router.replace('/LoginScreen')}>
      <Text style={introScreenStyle.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={introScreenStyle.skipButton} onPress={() => router.replace('/(tabs)')}>
        <Text style={introScreenStyle.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
} 