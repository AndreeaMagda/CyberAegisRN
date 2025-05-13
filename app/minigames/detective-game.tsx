import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import detectiveGameStyles from '../styles/detectiveGameStyle';

interface Scenario {
  id: number;
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    icon: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    text: 'Ana a primit un mesaj răutăcios de la un coleg. Ce ar trebui să facă?',
    options: [
      {
        text: 'Răspunde cu aceeași monedă și se ceartă',
        isCorrect: false,
        feedback:
          'Răspunsul agresiv poate agrava situația. Este mai bine să păstrezi calmul și să ceri ajutor.',
        icon: 'exclamation-triangle',
      },
      {
        text: 'Ignoră și blochează persoana',
        isCorrect: true,
        feedback:
          'Excelent! Ignorarea și blocarea sunt reacții mature, care te protejează și previn escaladarea situației.',
        icon: 'shield',
      },
      {
        text: 'Face o captură de ecran și spune unui adult',
        isCorrect: true,
        feedback:
          'Foarte bine! Documentarea și raportarea către un adult sunt pași importanți pentru a rezolva situația.',
        icon: 'camera',
      },
    ],
  },
  {
    id: 2,
    text: 'Mihai primește o cerere de prietenie de la un necunoscut. Ce ar trebui să facă?',
    options: [
      {
        text: 'Acceptă cererea pentru că are mulți prieteni în comun',
        isCorrect: false,
        feedback:
          'Numărul de prieteni în comun nu garantează siguranța. Este important să cunoști persoana înainte de a accepta.',
        icon: 'user-plus',
      },
      {
        text: 'Refuză și raportează profilul',
        isCorrect: true,
        feedback:
          'Corect! Este mai sigur să refuzi cereri de la necunoscuți și să raportezi profilul suspect.',
        icon: 'ban',
      },
      {
        text: 'Trimite un mesaj ca să cunoască persoana',
        isCorrect: false,
        feedback:
          'Nu este recomandat să inițiezi conversații cu necunoscuți online.',
        icon: 'comment',
      },
    ],
  },
  {
    id: 3,
    text: 'Elena primește un link de la un prieten care pare suspect. Ce ar trebui să facă?',
    options: [
      {
        text: 'Deschide linkul pentru că vine de la un prieten',
        isCorrect: false,
        feedback:
          'Chiar și linkurile trimise de prieteni pot fi periculoase, dacă le-au fost compromise conturile.',
        icon: 'link',
      },
      {
        text: 'Verifică URL-ul și cere confirmare',
        isCorrect: true,
        feedback:
          'Excelent! Verificarea URL-ului și cererea de confirmare sunt practici sigure.',
        icon: 'check-circle',
      },
      {
        text: 'Trimite mai departe altor prieteni',
        isCorrect: false,
        feedback:
          'Nu trimite niciodată linkuri suspecte mai departe, chiar dacă vin de la prieteni.',
        icon: 'share',
      },
    ],
  },
];
export default function DetectiveGame() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const isCorrect = scenarios[currentScenario].options[optionIndex].isCorrect;
    if (isCorrect) {
      setScore(score + 10);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        // Game over logic here
        setCurrentScenario(0);
        setScore(0);
      }
    });
  };

  return (
    <SafeAreaView style={detectiveGameStyles.safeArea}>
      <View style={detectiveGameStyles.container}>
        <Text style={detectiveGameStyles.title}>Eroul Siguranței Online</Text>
        <Text style={detectiveGameStyles.subtitle}>
          Rezolvă cazurile de siguranță online!
        </Text>

        <View style={detectiveGameStyles.scoreContainer}>
          <Text style={detectiveGameStyles.scoreText}>Scor: {score}</Text>
          <View style={detectiveGameStyles.progressBar}>
            <View
              style={[
                detectiveGameStyles.progressFill,
                { width: `${(currentScenario / scenarios.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={detectiveGameStyles.scenarioCard}>
            <Text style={detectiveGameStyles.scenarioText}>
              {scenarios[currentScenario].text}
            </Text>
            <View style={detectiveGameStyles.optionsContainer}>
              {scenarios[currentScenario].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    detectiveGameStyles.optionButton,
                    selectedOption === index && {
                      backgroundColor: option.isCorrect ? '#4CAF50' : '#FF4444',
                    },
                  ]}
                  onPress={() => handleOptionSelect(index)}
                  disabled={showFeedback}
                >
                  <Text style={detectiveGameStyles.optionText}>
                    {option.text}
                  </Text>
                  <FontAwesome
                    name={option.icon as any}
                    size={24}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

        {showFeedback && (
          <View style={detectiveGameStyles.feedbackContainer}>
            <View style={detectiveGameStyles.feedbackCard}>
              <FontAwesome
                name={
                  scenarios[currentScenario].options[selectedOption!].isCorrect
                    ? 'check-circle'
                    : 'times-circle'
                }
                size={50}
                color={
                  scenarios[currentScenario].options[selectedOption!].isCorrect
                    ? '#4CAF50'
                    : '#FF4444'
                }
                style={detectiveGameStyles.feedbackIcon}
              />
              <Text style={detectiveGameStyles.feedbackText}>
                {scenarios[currentScenario].options[selectedOption!].feedback}
              </Text>
              <TouchableOpacity
                style={detectiveGameStyles.feedbackButton}
                onPress={handleNext}
              >
                <Text style={detectiveGameStyles.feedbackButtonText}>
                  {currentScenario < scenarios.length - 1
                    ? 'Următorul caz'
                    : 'Joacă din nou'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
