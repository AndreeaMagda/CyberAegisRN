import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import introScreenStyle from './styles/introScreenStyle';
import { useRouter } from 'expo-router';

// Defineste optiunile pentru mascota (nume culoare si calea imaginii)
const mascotOptions = [
  { name: 'Blue', image: require('../assets/images/Aegi.png'), color: '#00b0ff' },
  { name: 'Pink', image: require('../assets/images/Aegi_Pink.png'), color: '#ff4081' },
  { name: 'Light Blue', image: require('../assets/images/Aegi_BabyBlue.png'), color: '#81d4fa' },
  { name: 'Purple', image: require('../assets/images/Aegi_Purple.png'), color: '#7e57c2' },
  { name: 'Green', image: require('../assets/images/Aegi_Green.png'), color: '#66bb6a' },
  { name: 'Red', image: require('../assets/images/Aegi_Red.png'), color: '#ef5350' },
  { name: 'Cream', image: require('../assets/images/Aegi_Crem.png'), color: '#fff176' },
];

export default function IntroScreen() {
  const router = useRouter();
  // Seteaza mascota initiala (default e cea albastra)
  const [currentMascot, setCurrentMascot] = useState(mascotOptions[0]);

  // Preincarca toate imaginile mascotei la montarea componentei
  useEffect(() => {
    mascotOptions.forEach(opt => {
      Image.prefetch(opt.image.uri);
    });
  }, []);

  // Functie pentru a schimba mascota (fara salvare in stocare)
  const selectMascot = (mascotOption: typeof mascotOptions[0]) => {
    setCurrentMascot(mascotOption);
  };

  return (
    <View style={introScreenStyle.container}>
      <Text style={introScreenStyle.title}>Bine ai Venit!</Text>
      <Text style={introScreenStyle.subtitle}>Autentifică-te pentru a continua învățarea.</Text>

      {/* Imaginea mascotei - se schimba dinamic */}
      <Image source={currentMascot.image} style={introScreenStyle.octopusImage} resizeMode="contain" />

      {/* Paleta de culori */} 
      <View style={introScreenStyle.colorPalette}>
        {mascotOptions.map((opt) => (
          <TouchableOpacity
            key={opt.name}
            style={[introScreenStyle.colorSwatch, { backgroundColor: opt.color }]} 
            onPress={() => selectMascot(opt)}
          />
        ))}
      </View>

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