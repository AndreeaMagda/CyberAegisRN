import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import introScreenStyle from './styles/introScreenStyle';
import { useRouter } from 'expo-router';

// Asigură-te că pui imaginea Aegi.jpg în folderul assets/images și ajustezi calea de import dacă este diferită
const aegisImage = require('../assets/images/Aegi.png');

export default function IntroScreen() {
  const router = useRouter();
  return (
    <View style={introScreenStyle.container}>
      <Text style={introScreenStyle.title}>Bine ai Venit!</Text>
      <Text style={introScreenStyle.subtitle}>Autentifică-te pentru a continua învățarea.</Text>
      <Image source={aegisImage} style={introScreenStyle.octopusImage} resizeMode="contain" />
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