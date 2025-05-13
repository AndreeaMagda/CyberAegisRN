import React, { useState, useEffect } from 'react';
import passwordGameStyles from '../styles/password-gameStyle';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';

interface Rule {
  id: number;
  description: string;
  validator: (password: string, userName?: string) => boolean;
  points: number;
}

const passwordRules: Rule[] = [
  {
    id: 1,
    description: 'Parola trebuie să aibă cel puțin 8 caractere',
    validator: (password) => password.length >= 8,
    points: 10,
  },
  {
    id: 2,
    description: 'Parola trebuie să conțină cel puțin o literă mare',
    validator: (password) => /[A-Z]/.test(password),
    points: 15,
  },
  {
    id: 3,
    description: 'Parola trebuie să conțină cel puțin o literă mică',
    validator: (password) => /[a-z]/.test(password),
    points: 15,
  },
  {
    id: 4,
    description: 'Parola trebuie să conțină cel puțin un număr',
    validator: (password) => /[0-9]/.test(password),
    points: 20,
  },
  {
    id: 5,
    description:
      'Parola trebuie să conțină cel puțin un caracter special (!@#$%^&*)',
    validator: (password) => /[!@#$%^&*]/.test(password),
    points: 25,
  },
  {
    id: 6,
    description: 'Parola nu poate conține numele tău',
    validator: (password, userName) =>
      userName
        ? !password.toLowerCase().includes(userName.toLowerCase())
        : true,
    points: 15,
  },
  {
    id: 7,
    description: 'Parola nu poate conține secvențe comune (123, abc)',
    validator: (password) => !/(123|abc|password|qwerty)/i.test(password),
    points: 20,
  },
  {
    id: 8,
    description:
      'Parola nu poate avea caractere repetate de 3 sau mai multe ori',
    validator: (password) => !/(.)\1{2,}/.test(password),
    points: 20,
  },
];

export default function PasswordGame() {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [strength] = useState(new Animated.Value(0));
  const drawerAnimation = useState(new Animated.Value(0))[0];

  const handlePasswordFocus = () => {
    if (!userName.trim()) {
      Alert.alert(
        'Nume lipsă',
        'Te rog să-ți introduci numele înainte de a crea o parolă.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!password) {
      setScore(0);
      return;
    }

    const totalPoints = passwordRules.reduce(
      (acc, rule) => acc + rule.points,
      0
    );
    const currentPoints = passwordRules.reduce(
      (acc, rule) =>
        acc + (rule.validator(password, userName) ? rule.points : 0),
      0
    );

    const strengthPercentage = (currentPoints / totalPoints) * 100;

    Animated.timing(strength, {
      toValue: strengthPercentage,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setScore(currentPoints);
  }, [password, userName]);

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: showSuggestions ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showSuggestions]);

  const getStrengthColor = () => {
    const currentValue = (strength as any)._value;
    if (currentValue < 30) return '#FF4444';
    if (currentValue < 60) return '#FFA000';
    if (currentValue < 80) return '#FFEB3B';
    return '#4CAF50';
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const copyPassword = async () => {
    if (password) {
      try {
        await Clipboard.setStringAsync(password);
        Alert.alert('Succes!', 'Parola a fost copiată în clipboard!');
      } catch (error) {
        Alert.alert('Eroare', 'Nu am putut copia parola în clipboard.');
      }
    }
  };

  const failedRules = passwordRules.filter(
    (rule) => !rule.validator(password, userName)
  );

  return (
    <View style={passwordGameStyles.container}>
      <View style={passwordGameStyles.card}>
        <Text style={passwordGameStyles.title}>Jocul Parolei Sigure</Text>

        <View style={passwordGameStyles.inputContainer}>
          <Text style={passwordGameStyles.label}>Numele tău:</Text>
          <TextInput
            style={passwordGameStyles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Introdu numele tău"
            placeholderTextColor="#6B8590"
          />
        </View>

        <View style={passwordGameStyles.inputContainer}>
          <Text style={passwordGameStyles.label}>Parola ta:</Text>
          <View style={passwordGameStyles.passwordInputContainer}>
            <TextInput
              style={[
                passwordGameStyles.input,
                passwordGameStyles.passwordInput,
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="Creează o parolă puternică"
              placeholderTextColor="#6B8590"
              secureTextEntry={!showPassword}
              onFocus={() => {
                if (!handlePasswordFocus()) {
                  return;
                }
              }}
            />
            <TouchableOpacity
              style={passwordGameStyles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <FontAwesome
                name={showPassword ? 'eye' : 'eye-slash'}
                size={24}
                color="#6B8590"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={passwordGameStyles.strengthContainer}>
          <Animated.View
            style={[
              passwordGameStyles.strengthBar,
              {
                width: strength.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getStrengthColor(),
              },
            ]}
          />
        </View>

        <Text style={passwordGameStyles.scoreText}>
          Scor: {score} /{' '}
          {passwordRules.reduce((acc, rule) => acc + rule.points, 0)}
        </Text>

        <TouchableOpacity
          style={passwordGameStyles.suggestionButton}
          onPress={toggleSuggestions}
        >
          <Text style={passwordGameStyles.suggestionButtonText}>
            {failedRules.length} sugestii rămase
          </Text>
          <FontAwesome
            name={showSuggestions ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#6B8590"
            style={passwordGameStyles.suggestionArrow}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            passwordGameStyles.suggestionsContainer,
            {
              maxHeight: drawerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 300],
              }),
              opacity: drawerAnimation,
              marginBottom: drawerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 16],
              }),
            },
          ]}
        >
          <ScrollView>
            {failedRules.map((rule) => (
              <View key={rule.id} style={passwordGameStyles.ruleItem}>
                <FontAwesome name="times-circle" size={24} color="#FF4444" />
                <Text style={passwordGameStyles.ruleText}>
                  {rule.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {score ===
          passwordRules.reduce((acc, rule) => acc + rule.points, 0) && (
          <TouchableOpacity
            style={passwordGameStyles.copyButton}
            onPress={copyPassword}
          >
            <Text style={passwordGameStyles.copyButtonText}>
              Copiază Parola
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
