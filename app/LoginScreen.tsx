import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import loginScreenStyle from './styles/loginScreenStyle';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={loginScreenStyle.bg}>
      <View style={loginScreenStyle.card}>
        <Text style={loginScreenStyle.title}>Logare</Text>
        <TextInput
          style={loginScreenStyle.input}
          placeholder="Email sau nume de utilizator"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={loginScreenStyle.input}
          placeholder="Parolă"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={loginScreenStyle.button}>
          <Text style={loginScreenStyle.buttonText}>Loghează-te</Text>
        </TouchableOpacity>
        <View style={loginScreenStyle.bottomRow}>
          <Text style={loginScreenStyle.bottomText}>Nu ai cont?</Text>
          <TouchableOpacity onPress={() => router.replace('/SignUpScreen')}>
            <Text style={loginScreenStyle.link}>Creează unul aici</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} 