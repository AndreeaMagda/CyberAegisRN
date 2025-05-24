import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import signUpScreenStyle from './styles/signUpScreenStyle';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <View style={signUpScreenStyle.bg}>
      <View style={signUpScreenStyle.card}>
        <Text style={signUpScreenStyle.title}>Creează cont</Text>
        <TextInput
          style={signUpScreenStyle.input}
          placeholder="Email sau nume de utilizator"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={signUpScreenStyle.input}
          placeholder="Parolă"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={signUpScreenStyle.input}
          placeholder="Confirmă parola"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
        <TouchableOpacity style={signUpScreenStyle.button}>
          <Text style={signUpScreenStyle.buttonText}>Creează cont</Text>
        </TouchableOpacity>
        <Text style={signUpScreenStyle.or}>sau creează cont cu</Text>
        <View style={signUpScreenStyle.socialRow}>
          <TouchableOpacity style={signUpScreenStyle.social}><Text style={signUpScreenStyle.socialIcon}>G</Text></TouchableOpacity>
          <TouchableOpacity style={signUpScreenStyle.social}><Text style={signUpScreenStyle.socialIcon}></Text></TouchableOpacity>
          <TouchableOpacity style={signUpScreenStyle.social}><Text style={signUpScreenStyle.socialIcon}>f</Text></TouchableOpacity>
        </View>
        <View style={signUpScreenStyle.bottomRow}>
          <Text style={signUpScreenStyle.bottomText}>Ai deja cont?</Text>
          <TouchableOpacity onPress={() => router.replace('/LoginScreen')}>
            <Text style={signUpScreenStyle.link}>Loghează-te aici</Text>
          </TouchableOpacity >
        </View>
      </View>
    </View>
  );
} 