import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import minigamesStyles from '../styles/minigamesStyle';

const games = [
  {
    id: 'detective',
    title: 'Eroul Siguranței Online',
    description: 'Rezolvă cazurile de siguranță online ca un detectiv digital!',
    icon: 'search',
    color: '#4CAF50',
    path: '/minigames/detective-game' as const,
  },
  {
    id: 'block',
    title: 'Blochează și Protejează',
    description:
      'Protejează-ți prietenii de mesajele negative în acest joc de reflexe!',
    icon: 'shield',
    color: '#FFA500',
    path: '/minigames/block-game' as const,
  },
  {
    id: 'board',
    title: 'Aventură în Siguranța Online',
    description:
      'Navighează prin provocările internetului într-un joc de tip board-game!',
    icon: 'gamepad',
    color: '#FF4444',
    path: '/minigames/board-game' as const,
  },
  {
    id: 'chat',
    title: 'Chat în Siguranță',
    description: 'Învață cum să te protejezi în conversațiile online!',
    icon: 'comments',
    color: '#2196F3',
    path: '/minigames/chat-safety-game' as const,
  },
  {
    id: 'password',
    title: 'Jocul Parolelor',
    description:
      'Învață cum să creezi parole puternice și să le păstrezi în siguranță!',
    icon: 'lock',
    color: '#9C27B0',
    path: '/minigames/password-game' as const,
  },
  {
    id: 'ad-detector',
    title: 'Detectorul de Reclame',
    description:
      'Învață să identifici și să eviți reclamele înșelătoare online!',
    icon: 'ban',
    color: '#E91E63',
    path: '/minigames/ad-detector-game' as const,
  },
  {
    id: 'ai-scenario',
    title: 'Learn with AI',
    description:
      'Protejeaza-te online cu AI',
    icon: 'ban',
    color: '#E91E63',
    path: '../screens/scenario/scenario' as const,
  },
];

export default function MinigamesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={minigamesStyles.safeArea}>
      <View style={minigamesStyles.container}>
        <Text style={minigamesStyles.title}>Minigame-uri</Text>
        <Text style={minigamesStyles.subtitle}>
          Învață despre siguranța online prin joc!
        </Text>

        <ScrollView style={minigamesStyles.gamesContainer}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={minigamesStyles.gameCard}
              onPress={() => router.push(game.path)}
            >
              <View
                style={[
                  minigamesStyles.iconContainer,
                  { backgroundColor: game.color },
                ]}
              >
                <FontAwesome
                  name={game.icon as any}
                  size={30}
                  color="#FFFFFF"
                />
              </View>
              <View style={minigamesStyles.gameInfo}>
                <Text style={minigamesStyles.gameTitle}>{game.title}</Text>
                <Text style={minigamesStyles.gameDescription}>
                  {game.description}
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={20} color="#8BA5B0" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
