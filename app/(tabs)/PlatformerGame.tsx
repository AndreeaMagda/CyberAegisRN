import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Vibration,
  Animated,
} from 'react-native';
import { platformerGameStyles } from '../styles/platformerGameStyle';
import NetworkCables from '../../components/platfomerComponents/networkCables';
import ServerLeft from '@/components/platfomerComponents/serverLeft';
import TutorialOverlay from '@/components/platfomerComponents/tutorialOverlay';
// import LottieView from 'lottie-react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Calculate available height (accounting for tab bar)
const TAB_BAR_HEIGHT = 49; // Standard tab bar height
const AVAILABLE_HEIGHT =
  height - TAB_BAR_HEIGHT - (StatusBar.currentHeight || 0);

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'Ce trebuie să faci când primești un mesaj de la un străin?',
    options: [
      'Deschid mesajul',
      'Spun unui adult',
      'Răspund imediat',
      'Dau click pe link',
    ],
    correctAnswer: 1,
  },
  {
    question: 'Care este o parolă bună?',
    options: ['123456', 'numele meu', 'Fl0@re!Alb@stră', 'parola'],
    correctAnswer: 2,
  },
  {
    question: 'Ce faci când folosești internetul?',
    options: [
      'Dau informații personale',
      'Vorbesc doar cu prieteni',
      'Descărc orice joc',
      'Deschid toate emailurile',
    ],
    correctAnswer: 1,
  },
  {
    question: 'Cum protejezi tableta sau telefonul?',
    options: [
      'O las oriunde',
      'Folosesc o parolă',
      'O împrumut oricui',
      'Nu am grijă de ea',
    ],
    correctAnswer: 1,
  },
];

const PlatformerGame: React.FC = () => {
  const [solvedComputers, setSolvedComputers] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [securityLevel, setSecurityLevel] = useState('Low');
  const [showTutorial, setShowTutorial] = useState(false);
  const [engineerPosition, setEngineerPosition] = useState({
    left: 40,
    top: 150,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hackerAttack, setHackerAttack] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  const [malwareThreats, setMalwareThreats] = useState<
    { x: number; y: number; eliminated: boolean; type: string }[]
  >([
    { x: 80, y: 150, eliminated: false, type: 'virus' },
    { x: 180, y: 280, eliminated: false, type: 'trojan' },
    { x: 250, y: 180, eliminated: false, type: 'ransomware' },
    { x: 40, y: 320, eliminated: false, type: 'worm' },
    { x: 120, y: 220, eliminated: false, type: 'virus' },
    { x: 220, y: 120, eliminated: false, type: 'trojan' },
  ]);
  const [score, setScore] = useState(0);
  const [movementDirection, setMovementDirection] = useState<string | null>(
    null
  );
  const [correctAnswersInARow, setCorrectAnswersInARow] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [progressAnimation] = useState(new Animated.Value(0));

  // Security tips in Romanian
  const securityTips = [
    'Nu da niciodată parola ta altcuiva!',
    'Spune unui adult dacă vezi ceva ciudat online.',
    'Nu deschide emailuri de la persoane necunoscute.',
    'Folosește parole diferite pentru conturi diferite.',
    'Nu da informații personale pe internet.',
    'Ai grijă ce linkuri deschizi!',
  ];

  // Add movement speed and boundaries
  const MOVEMENT_SPEED = 10;
  const BOUNDARY = {
    minX: 0,
    maxX: width - 50, // Adjust based on engineer width
    minY: 0,
    maxY: AVAILABLE_HEIGHT - 100, // Adjust based on engineer height
  };

  // Animation timing
  useEffect(() => {
    // Simulate more frequent hacker attacks
    const attackInterval = setInterval(() => {
      if (Math.random() > 0.5 && !solvedComputers.every((solved) => solved)) {
        setHackerAttack(true);
      }
    }, 8000);

    return () => {
      clearInterval(attackInterval);
    };
  }, [solvedComputers]);

  // Add continuous movement when holding down arrow keys
  useEffect(() => {
    if (!movementDirection) return;

    const moveInterval = setInterval(() => {
      moveEngineer(movementDirection as 'up' | 'down' | 'left' | 'right');
    }, 100);

    return () => clearInterval(moveInterval);
  }, [movementDirection]);

  // Check for malware elimination with improved feedback
  useEffect(() => {
    const checkMalwareElimination = () => {
      const updatedMalware = [...malwareThreats];
      let updated = false;
      let newScore = score;

      malwareThreats.forEach((threat, index) => {
        if (!threat.eliminated) {
          const distance = Math.sqrt(
            Math.pow(engineerPosition.left - threat.x, 2) +
              Math.pow(engineerPosition.top - threat.y, 2)
          );

          if (distance < 30) {
            updatedMalware[index].eliminated = true;
            updated = true;
            newScore += 15;
            Vibration.vibrate(100); // Feedback for elimination

            // Show random security tip
            const randomTip =
              securityTips[Math.floor(Math.random() * securityTips.length)];
            setCurrentTip(randomTip);
            setShowTip(true);
            setTimeout(() => setShowTip(false), 3000);

            // Animate progress bar
            const newProgress = Math.min(100, gameProgress + 8);
            Animated.timing(progressAnimation, {
              toValue: newProgress / 100,
              duration: 500,
              useNativeDriver: false,
            }).start();
            setGameProgress(newProgress);
          }
        }
      });

      if (updated) {
        setMalwareThreats(updatedMalware);
        setScore(newScore);
      }
    };

    checkMalwareElimination();
  }, [engineerPosition]);

  const handleComputerPress = (index: number) => {
    if (!solvedComputers[index]) {
      setActiveQuiz(index);
      setShowModal(true);
      // Move engineer to the computer
      const positions = [
        { left: 40, top: 100 },
        { left: 200, top: 100 },
        { left: 40, top: 250 },
        { left: 200, top: 250 },
      ];
      setEngineerPosition(positions[index]);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (activeQuiz !== null) {
      // Make sure we don't go out of bounds with the quiz questions
      const questionIndex = activeQuiz % quizQuestions.length;
      const question = quizQuestions[questionIndex];

      if (answerIndex === question.correctAnswer) {
        const newSolvedComputers = [...solvedComputers];
        newSolvedComputers[activeQuiz] = true;
        setSolvedComputers(newSolvedComputers);

        // Increment correct answers counter
        setCorrectAnswersInARow((prev) => prev + 1);

        // Check if we should stop the hacker attack (2 correct answers in a row)
        if (correctAnswersInARow + 1 >= 2) {
          setHackerAttack(false);
          setCorrectAnswersInARow(0);
        }

        // Update security level and progress
        const solvedCount = newSolvedComputers.filter(
          (solved) => solved
        ).length;
        if (solvedCount === newSolvedComputers.length) {
          setSecurityLevel('High');
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);

          // Animate to 100%
          Animated.timing(progressAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          setGameProgress(100);
        } else if (solvedCount > 0) {
          setSecurityLevel('Medium');

          // Increase progress significantly for solving a computer
          const newProgress = Math.min(100, gameProgress + 15);
          Animated.timing(progressAnimation, {
            toValue: newProgress / 100,
            duration: 500,
            useNativeDriver: false,
          }).start();
          setGameProgress(newProgress);
        }

        // Increase score for correct answer
        setScore((prev) => prev + 25);

        // Show positive feedback
        setCurrentTip('Excelent! Ai rezolvat provocarea!');
        setShowTip(true);
        setTimeout(() => setShowTip(false), 3000);
      } else {
        // Wrong answer feedback
        Vibration.vibrate(200);
        setCorrectAnswersInARow(0);

        // Show hint
        setCurrentTip('Încearcă din nou! Gândește-te la securitate.');
        setShowTip(true);
        setTimeout(() => setShowTip(false), 3000);
      }
      setShowModal(false);
      setActiveQuiz(null);
    }
  };

  // Add movement handler with press and release functions
  const moveEngineer = (direction: 'up' | 'down' | 'left' | 'right') => {
    setEngineerPosition((current) => {
      let newPosition = { ...current };

      switch (direction) {
        case 'up':
          newPosition.top = Math.max(
            BOUNDARY.minY,
            current.top - MOVEMENT_SPEED
          );
          break;
        case 'down':
          newPosition.top = Math.min(
            BOUNDARY.maxY,
            current.top + MOVEMENT_SPEED
          );
          break;
        case 'left':
          newPosition.left = Math.max(
            BOUNDARY.minX,
            current.left - MOVEMENT_SPEED
          );
          break;
        case 'right':
          newPosition.left = Math.min(
            BOUNDARY.maxX,
            current.left + MOVEMENT_SPEED
          );
          break;
      }

      return newPosition;
    });
  };

  const handleDirectionPress = (
    direction: 'up' | 'down' | 'left' | 'right'
  ) => {
    setMovementDirection(direction);
    moveEngineer(direction);
  };

  const handleDirectionRelease = () => {
    setMovementDirection(null);
  };

  return (
    <SafeAreaView style={platformerGameStyles.container}>
      {/* Score Display */}
      <View style={platformerGameStyles.scoreContainer}>
        <Text style={platformerGameStyles.scoreText}>SCOR: {score}</Text>
      </View>
      {/* Progress Bar - Animated */}
      <View style={platformerGameStyles.progressContainer}>
        <Animated.View
          style={[
            platformerGameStyles.progressBar,
            {
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        <Text style={platformerGameStyles.progressText}>
          {gameProgress}% Securizat
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.labRoom}>
          {/* Lab Background with Grid */}
          <View
            style={[
              platformerGameStyles.labBackground,
              hackerAttack && platformerGameStyles.hackerAttackBackground,
            ]}
          >
            <View style={platformerGameStyles.gridLines}>
              {[...Array(10)].map((_, i) => (
                <View
                  key={`h${i}`}
                  style={[
                    platformerGameStyles.horizontalLine,
                    { top: `${i * 10}%` },
                  ]}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <View
                  key={`v${i}`}
                  style={[
                    platformerGameStyles.verticalLine,
                    { left: `${i * 10}%` },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Security Status Display */}
          <View style={platformerGameStyles.securityStatus}>
            <Text style={platformerGameStyles.securityLabel}>
              NIVEL SECURITATE:
            </Text>
            <View
              style={[
                platformerGameStyles.securityIndicator,
                securityLevel === 'Low' && platformerGameStyles.securityLow,
                securityLevel === 'Medium' &&
                  platformerGameStyles.securityMedium,
                securityLevel === 'High' && platformerGameStyles.securityHigh,
              ]}
            >
              <Text style={platformerGameStyles.securityText}>
                {securityLevel === 'Low'
                  ? 'Scăzut'
                  : securityLevel === 'Medium'
                  ? 'Mediu'
                  : 'Ridicat'}
              </Text>
            </View>
            {hackerAttack && (
              <View style={platformerGameStyles.alertBadge}>
                <Text style={platformerGameStyles.alertText}>
                  ATAC DETECTAT!
                </Text>
              </View>
            )}
          </View>

          {/* Main Content Area */}
          <View style={platformerGameStyles.mainContent}>
            {/* Left Section - Server Racks */}
            <View style={platformerGameStyles.leftSection}>
              {/* srever left */}
              <View>
                <ServerLeft />
              </View>
              {/* Network Cables */}
              <View style={platformerGameStyles.networkCables}>
                <NetworkCables />
              </View>
            </View>

            {/* Center Section - Workstations */}
            <View style={platformerGameStyles.centerSection}>
              <View style={platformerGameStyles.workstationArea}>
                {[0, 1, 2, 3].map((index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      platformerGameStyles.desk,
                      index % 2 === 0
                        ? platformerGameStyles.leftDesk
                        : platformerGameStyles.rightDesk,
                      index < 2
                        ? platformerGameStyles.topRow
                        : platformerGameStyles.bottomRow,
                      !solvedComputers[index] &&
                        platformerGameStyles.interactiveDesk,
                    ]}
                    onPress={() => handleComputerPress(index)}
                  >
                    <View style={platformerGameStyles.monitor}>
                      <View
                        style={[
                          platformerGameStyles.screen,
                          solvedComputers[index] &&
                            platformerGameStyles.solvedScreen,
                          hackerAttack &&
                            !solvedComputers[index] &&
                            platformerGameStyles.hackedScreen,
                        ]}
                      >
                        <View style={platformerGameStyles.screenContent} />
                        <View style={platformerGameStyles.screenContent} />
                        {solvedComputers[index] && (
                          <View style={platformerGameStyles.checkmark}>
                            <Text style={platformerGameStyles.checkmarkText}>
                              ✓
                            </Text>
                          </View>
                        )}
                        {hackerAttack && !solvedComputers[index] && (
                          <Text style={platformerGameStyles.hackerText}>!</Text>
                        )}
                      </View>
                      <View style={platformerGameStyles.monitorStand} />
                    </View>
                    <View style={platformerGameStyles.keyboard}>
                      {[...Array(3)].map((_, j) => (
                        <View
                          key={j}
                          style={platformerGameStyles.keyboardRow}
                        />
                      ))}
                    </View>
                    <View style={platformerGameStyles.mouse} />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Malware Threats with Pulse Animation */}
              {malwareThreats.map(
                (threat, index) =>
                  !threat.eliminated && (
                    <Animated.View
                      key={index}
                      style={[
                        platformerGameStyles.malwareThreat,
                        {
                          left: threat.x,
                          top: threat.y,
                          transform: [
                            {
                              scale: new Animated.Value(1).interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 1.2, 1],
                                extrapolate: 'clamp',
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Text style={platformerGameStyles.malwareIcon}>
                        {threat.type === 'virus'
                          ? '🦠'
                          : threat.type === 'trojan'
                          ? '🐴'
                          : threat.type === 'ransomware'
                          ? '🔒'
                          : '🐛'}
                      </Text>
                    </Animated.View>
                  )
              )}

              {/* Movable Engineer Character */}
              <Animated.View
                style={[
                  platformerGameStyles.staticEngineer,
                  {
                    left: engineerPosition.left,
                    top: engineerPosition.top,
                  },
                ]}
              >
                {/* Chair */}
                <View style={platformerGameStyles.chair}>
                  <View style={platformerGameStyles.chairBack} />
                  <View style={platformerGameStyles.chairSeat} />
                  <View style={platformerGameStyles.chairBase} />
                  <View style={platformerGameStyles.chairWheels}>
                    <View style={platformerGameStyles.wheel} />
                    <View style={platformerGameStyles.wheel} />
                    <View style={platformerGameStyles.wheel} />
                  </View>
                </View>

                {/* Engineer - Sitting position */}
                <View style={platformerGameStyles.engineerBody}>
                  <View style={platformerGameStyles.head}>
                    <View style={platformerGameStyles.hair} />
                    <View style={platformerGameStyles.face}>
                      <View style={platformerGameStyles.glasses} />
                      <View style={platformerGameStyles.smile} />
                    </View>
                  </View>
                  <View
                    style={[
                      platformerGameStyles.body,
                      platformerGameStyles.sittingBody,
                    ]}
                  >
                    <View style={platformerGameStyles.labCoat} />
                    <View style={platformerGameStyles.badge} />
                  </View>
                  <View
                    style={[
                      platformerGameStyles.legs,
                      platformerGameStyles.sittingLegs,
                    ]}
                  >
                    <View
                      style={[
                        platformerGameStyles.leftLeg,
                        platformerGameStyles.sittingLeg,
                      ]}
                    />
                    <View
                      style={[
                        platformerGameStyles.rightLeg,
                        platformerGameStyles.sittingLeg,
                      ]}
                    />
                  </View>
                </View>
              </Animated.View>
            </View>

            {/* Right Section - Security Features */}
            <View style={platformerGameStyles.rightSection}>
              {/* Security Monitors */}
              <View style={platformerGameStyles.securityMonitors}>
                <View style={platformerGameStyles.securityMonitor}>
                  <View style={platformerGameStyles.monitorScreen}>
                    <View style={platformerGameStyles.monitorGraph} />
                  </View>
                </View>
                <View style={platformerGameStyles.securityMonitor}>
                  <View style={platformerGameStyles.monitorScreen}>
                    <View style={platformerGameStyles.monitorData} />
                    <View style={platformerGameStyles.monitorData} />
                    <View style={platformerGameStyles.monitorData} />
                  </View>
                </View>
              </View>

              {/* Security Features */}
              <View style={platformerGameStyles.securityFeatures}>
                <View style={platformerGameStyles.camera}>
                  <View style={platformerGameStyles.cameraLens} />
                  <View style={platformerGameStyles.cameraBody} />
                </View>
                <View style={platformerGameStyles.keypad}>
                  {[...Array(9)].map((_, i) => (
                    <View key={i} style={platformerGameStyles.keypadButton} />
                  ))}
                </View>
              </View>

              {/* Firewall Status */}
              <View style={platformerGameStyles.firewallStatus}>
                <Text style={platformerGameStyles.firewallLabel}>FIREWALL</Text>
                <View
                  style={[
                    platformerGameStyles.firewallIndicator,
                    solvedComputers.every((solved) => solved)
                      ? platformerGameStyles.firewallActive
                      : platformerGameStyles.firewallInactive,
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Bottom Padding to ensure content is above tab bar */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}
      {/* Success Message */}
      {showSuccessMessage && (
        <View style={platformerGameStyles.successOverlay}>
          <View style={platformerGameStyles.successBox}>
            <Text style={platformerGameStyles.successTitle}>
              Securitate Restabilită!
            </Text>
            <Text style={platformerGameStyles.successText}>
              Bravo! Ai securizat toate sistemele din laborator.
            </Text>
            <View style={platformerGameStyles.successIcon}>
              <Text style={platformerGameStyles.successIconText}>✓</Text>
            </View>
          </View>
        </View>
      )}
      {/* Quiz Modal */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={platformerGameStyles.modalOverlay}>
          <View style={platformerGameStyles.modalContent}>
            {activeQuiz !== null && (
              <>
                <Text style={platformerGameStyles.modalTitle}>
                  Provocare de Securitate
                </Text>
                <Text style={platformerGameStyles.questionText}>
                  {quizQuestions[activeQuiz % quizQuestions.length].question}
                </Text>
                {quizQuestions[activeQuiz % quizQuestions.length].options.map(
                  (option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        platformerGameStyles.optionButton,
                        { transform: [{ scale: 1 }] },
                      ]}
                      onPress={() => handleAnswer(index)}
                      activeOpacity={0.7}
                    >
                      <Text style={platformerGameStyles.optionText}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
      {/* Control buttons at the bottom */}.{' '}
      <View style={platformerGameStyles.controls}>
        <View style={platformerGameStyles.controlRow}>
          <TouchableOpacity
            style={platformerGameStyles.controlButton}
            onPressIn={() => handleDirectionPress('up')}
            onPressOut={handleDirectionRelease}
          >
            <Text style={platformerGameStyles.controlButtonText}>↑</Text>
          </TouchableOpacity>
        </View>
        <View style={platformerGameStyles.controlRow}>
          <TouchableOpacity
            style={platformerGameStyles.controlButton}
            onPressIn={() => handleDirectionPress('left')}
            onPressOut={handleDirectionRelease}
          >
            <Text style={platformerGameStyles.controlButtonText}>←</Text>
          </TouchableOpacity>
          <View style={platformerGameStyles.controlButtonSpacer} />
          <TouchableOpacity
            style={platformerGameStyles.controlButton}
            onPressIn={() => handleDirectionPress('right')}
            onPressOut={handleDirectionRelease}
          >
            <Text style={platformerGameStyles.controlButtonText}>→</Text>
          </TouchableOpacity>
        </View>
        <View style={platformerGameStyles.controlRow}>
          <TouchableOpacity
            style={platformerGameStyles.controlButton}
            onPressIn={() => handleDirectionPress('down')}
            onPressOut={handleDirectionRelease}
          >
            <Text style={platformerGameStyles.controlButtonText}>↓</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Game Instructions */}
      <TouchableOpacity
        style={platformerGameStyles.helpButton}
        onPress={() => setShowTutorial(true)}
      >
        <Text style={platformerGameStyles.helpButtonText}>?</Text>
      </TouchableOpacity>
      {/* Security Tip Popup */}
      {showTip && (
        <View style={platformerGameStyles.tipContainer}>
          <View style={platformerGameStyles.tipBox}>
            <Text style={platformerGameStyles.tipText}>{currentTip}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: TAB_BAR_HEIGHT + 20, // Add extra padding at bottom
  },
  labRoom: {
    flex: 1,
    position: 'relative',
    minHeight: AVAILABLE_HEIGHT * 0.9, // Use 90% of available height
  },
  bottomPadding: {
    height: TAB_BAR_HEIGHT + 20, // Extra padding at the bottom
  },
});

export default PlatformerGame;
