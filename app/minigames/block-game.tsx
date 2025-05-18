import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import blockGameStyles from '../styles/blockGameStyle';

interface Message {
  id: number;
  text: string;
  isPositive: boolean;
  icon: string;
}

const allMessages: Message[] = [
  {
    id: 1,
    text: 'Ești un prieten minunat! 🌟',
    isPositive: true,
    icon: 'heart',
  },
  { id: 2, text: 'Ai părul urât! 😈', isPositive: false, icon: 'thumbs-down' },
  {
    id: 3,
    text: 'Felicitări pentru rezultate! 🎉',
    isPositive: true,
    icon: 'star',
  },
  { id: 4, text: 'Nu ești bun la nimic! 😡', isPositive: false, icon: 'ban' },
  {
    id: 5,
    text: 'Suntem prieteni pentru totdeauna! 💫',
    isPositive: true,
    icon: 'smile',
  },
  {
    id: 6,
    text: 'Nu mai vreau să te văd! 👎',
    isPositive: false,
    icon: 'times',
  },
  {
    id: 7,
    text: 'Ai făcut o treabă excelentă! 🌈',
    isPositive: true,
    icon: 'trophy',
  },
  { id: 8, text: 'Ești un ratat! 💩', isPositive: false, icon: 'frown' },
  {
    id: 9,
    text: 'Mă bucur că te-am cunoscut! 🌺',
    isPositive: true,
    icon: 'flower',
  },
  {
    id: 10,
    text: 'Ești prea prost pentru mine! 🤮',
    isPositive: false,
    icon: 'angry',
  },
  {
    id: 11,
    text: 'Ai fost foarte ajutător! 🙏',
    isPositive: true,
    icon: 'handshake',
  },
  { id: 12, text: 'Nu te mai suport! 😤', isPositive: false, icon: 'fist' },
  {
    id: 13,
    text: 'Ești un model pentru mine! 🎯',
    isPositive: true,
    icon: 'target',
  },
  { id: 14, text: 'Ești un dezamăgire! 😢', isPositive: false, icon: 'sad' },
  {
    id: 15,
    text: 'Ai făcut ziua mea specială! 🎂',
    isPositive: true,
    icon: 'gift',
  },
  {
    id: 16,
    text: 'Nu mai vreau să te cunosc! 🚫',
    isPositive: false,
    icon: 'stop',
  },
  {
    id: 17,
    text: 'Ești un prieten adevărat! 🤝',
    isPositive: true,
    icon: 'handshake',
  },
  { id: 18, text: 'Ești prea slab! 💪', isPositive: false, icon: 'weak' },
  {
    id: 19,
    text: 'Ai fost mereu acolo pentru mine! 💕',
    isPositive: true,
    icon: 'heart',
  },
  {
    id: 20,
    text: 'Nu te mai văd ca prieten! 👋',
    isPositive: false,
    icon: 'bye',
  },
  {
    id: 21,
    text: 'Ești un exemplu de urmat! 🌟',
    isPositive: true,
    icon: 'star',
  },
  {
    id: 22,
    text: 'Ești prea prost pentru mine! 🤦',
    isPositive: false,
    icon: 'facepalm',
  },
  {
    id: 23,
    text: 'Ai făcut o diferență în viața mea! ✨',
    isPositive: true,
    icon: 'sparkles',
  },
  {
    id: 24,
    text: 'Nu mai vreau să te văd! 🚪',
    isPositive: false,
    icon: 'door',
  },
  {
    id: 25,
    text: 'Ești un prieten special! 💫',
    isPositive: true,
    icon: 'special',
  },
  {
    id: 26,
    text: 'Ești prea slab pentru mine! 💪',
    isPositive: false,
    icon: 'weak',
  },
  {
    id: 27,
    text: 'Ai făcut ziua mea mai bună! 🌈',
    isPositive: true,
    icon: 'rainbow',
  },
  {
    id: 28,
    text: 'Nu mai vreau să te cunosc! 🚫',
    isPositive: false,
    icon: 'stop',
  },
  {
    id: 29,
    text: 'Ești un prieten adevărat! 🤝',
    isPositive: true,
    icon: 'handshake',
  },
  {
    id: 30,
    text: 'Ești prea slab pentru mine! 💪',
    isPositive: false,
    icon: 'weak',
  },
];

export default function BlockGame() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (!gameOver) {
      startNewGame();
    }
  }, [level]);

  useEffect(() => {
    let timer: number;
    if (timeLeft > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const startNewGame = () => {
    // Select 6 random messages from the pool of 30
    const shuffled = [...allMessages].sort(() => 0.5 - Math.random());
    setMessages(shuffled.slice(0, 6));
    setCurrentMessageIndex(0);
    setTimeLeft(5);
    Animated.spring(slideAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleTimeUp = () => {
    setGameOver(true);
  };

  const handleAction = (isBlock: boolean) => {
    const currentMessage = messages[currentMessageIndex];
    if (currentMessage && isBlock === !currentMessage.isPositive) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
      if (currentMessageIndex < 5) {
        setCurrentMessageIndex(currentMessageIndex + 1);
        setTimeLeft(5);
      } else {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      if (!gameOver && currentMessageIndex < 5) {
        setTimeLeft(5);
        Animated.spring(slideAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setCorrectAnswers(0);
    startNewGame();
  };

  const getFeedback = () => {
    if (correctAnswers === 6)
      return 'Perfect! Ai făcut toate alegerile corecte! 🏆';
    if (correctAnswers >= 4)
      return `Foarte bine! Ai făcut ${correctAnswers} din 6 alegeri corecte! 🌟`;
    if (correctAnswers >= 2)
      return `Bun! Ai făcut ${correctAnswers} din 6 alegeri corecte! 👍`;
    return `Mai ai de învățat! Ai făcut doar ${correctAnswers} din 6 alegeri corecte. 📚`;
  };

  return (
    <SafeAreaView style={blockGameStyles.safeArea}>
      <View style={blockGameStyles.container}>
        <Text style={blockGameStyles.title}>Blochează și Protejează</Text>
        <Text style={blockGameStyles.subtitle}>
          Protejează-ți prietenii de mesajele negative!
        </Text>

        <View style={blockGameStyles.levelContainer}>
          <Text style={blockGameStyles.levelText}>Nivel {level}</Text>
        </View>

        <View style={blockGameStyles.timerContainer}>
          <FontAwesome name="clock-o" size={24} color="#8BA5B0" />
          <Text style={blockGameStyles.timerText}>{timeLeft}s</Text>
        </View>

        <View style={blockGameStyles.scoreContainer}>
          <FontAwesome name="star" size={24} color="#8BA5B0" />
          <Text style={blockGameStyles.scoreText}>{score}</Text>
        </View>

        <View style={blockGameStyles.progressContainer}>
          <Text style={blockGameStyles.progressText}>
            {currentMessageIndex + 1}/6
          </Text>
        </View>

        <View style={blockGameStyles.gameContainer}>
          {messages[currentMessageIndex] && (
            <Animated.View
              style={[
                blockGameStyles.messageCard,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <FontAwesome
                name={messages[currentMessageIndex].icon as any}
                size={40}
                color="#8BA5B0"
              />
              <Text style={blockGameStyles.messageText}>
                {messages[currentMessageIndex].text}
              </Text>
              <View style={blockGameStyles.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    blockGameStyles.actionButton,
                    { backgroundColor: '#FF4444' },
                  ]}
                  onPress={() => handleAction(true)}
                >
                  <FontAwesome name="ban" size={24} color="#FFFFFF" />
                  <Text style={blockGameStyles.buttonText}>Blochează</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    blockGameStyles.actionButton,
                    { backgroundColor: '#4CAF50' },
                  ]}
                  onPress={() => handleAction(false)}
                >
                  <FontAwesome name="heart" size={24} color="#FFFFFF" />
                  <Text style={blockGameStyles.buttonText}>
                    Răspunde frumos
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </View>

        {gameOver && (
          <View style={blockGameStyles.gameOverContainer}>
            <View style={blockGameStyles.gameOverCard}>
              <FontAwesome
                name={correctAnswers === 6 ? 'trophy' : 'times-circle'}
                size={50}
                color={correctAnswers === 6 ? '#4CAF50' : '#8BA5B0'}
              />
              <Text style={blockGameStyles.gameOverTitle}>
                {correctAnswers === 6 ? 'Felicitări!' : 'Game Over!'}
              </Text>
              <Text style={blockGameStyles.gameOverText}>
                Scorul tău final: {score}
              </Text>
              <Text style={blockGameStyles.feedbackText}>{getFeedback()}</Text>
              <TouchableOpacity
                style={blockGameStyles.retryButton}
                onPress={resetGame}
              >
                <Text style={blockGameStyles.retryButtonText}>
                  Joacă din nou
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
