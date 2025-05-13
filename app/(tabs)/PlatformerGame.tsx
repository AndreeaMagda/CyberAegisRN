import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Vibration,
  Animated,
  Modal,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { platformerGameStyles } from '../styles/platformerGameStyle';
import NetworkCables from '../../components/platfomerComponents/networkCables';
import ServerLeft from '@/components/platfomerComponents/serverLeft';
import TutorialOverlay from '@/components/platfomerComponents/tutorialOverlay';
import MovementController from '@/components/platfomerComponents/MovementController';
import EngineerCharacter from '@/components/platfomerComponents/EngineerCharacter';
import ComputerWorkstation from '@/components/platfomerComponents/ComputerWorkstation';
import MalwareThreat from '@/components/platfomerComponents/MalwareThreat';
import QuizModal from '@/components/platfomerComponents/QuizModal';
import SecurityStatus from '@/components/platfomerComponents/SecurityStatus';
import ProgressBar from '@/components/platfomerComponents/ProgressBar';
import LevelTitle from '@/components/platfomerComponents/LevelTitle';
import ScoreDisplay from '@/components/platfomerComponents/ScoreDisplay';
import GridBackground from '@/components/platfomerComponents/GridBackground';
import NavigationControls from '@/components/platfomerComponents/NavigationControls';
import SecurityTip from '@/components/platfomerComponents/SecurityTip';
import SuccessMessage from '@/components/platfomerComponents/SuccessMessage';
import HelpButton from '@/components/platfomerComponents/HelpButton';
import RightSection from '@/components/platfomerComponents/RightSection';
import HackerLab from '@/components/platfomerComponents/HackerLab';

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

// All available quiz questions
const allQuizQuestions: QuizQuestion[] = [
  {
    question: 'Ce înseamnă securitatea cibernetică?',
    options: [
      'Să instalezi multe jocuri gratuite',
      'Să te conectezi la orice rețea Wi-Fi',
      'Să te protejezi când folosești internetul',
      'Să postezi poze cu prietenii',
    ],
    correctAnswer: 2,
  },
  {
    question:
      'De ce este important să nu acceptăm prietenii online de la străini?',
    options: [
      'Pentru că pot trimite invitații neinteresante',
      'Pentru că îți pot trimite temele',
      'Pentru că pot fi persoane rău intenționate',
      'Pentru că nu știu să scrie corect',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce comportament nu este potrivit pe internet?',
    options: [
      'Să comentezi frumos la poze',
      'Să postezi lucruri despre alți colegi care i-ar putea supăra',
      'Să ceri ajutorul unui adult',
      'Să folosești emoji-uri',
    ],
    correctAnswer: 1,
  },
  {
    question: 'Ce trebuie să faci dacă primești un mesaj care te sperie?',
    options: [
      'Îl închizi și uiți de el',
      'Îl trimiți colegului tău',
      'Îl postezi pe rețele sociale',
      'Îl arăți imediat unui adult',
    ],
    correctAnswer: 3,
  },
  {
    question:
      'Ce reprezintă datele personale online, cum ar fi poze și parole?',
    options: [
      'Fișiere neimportante',
      'Mesaje automate',
      'Informații valoroase ce trebuie protejate',
      'Glume amuzante pentru prieteni',
    ],
    correctAnswer: 2,
  },
  {
    question:
      'De ce e important să verificăm un site cu un adult dacă pare ciudat?',
    options: [
      'Pentru a-l salva în calculator',
      'Pentru că adulții pot citi mai repede',
      'Pentru a ne asigura că nu e periculos',
      'Pentru a găsi jocuri noi',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Care este rolul unui antivirus?',
    options: [
      'Să decoreze calculatorul',
      'Să blocheze fișiere periculoase și viruși',
      'Să îți creeze teme automat',
      'Să mărească volumul sunetului',
    ],
    correctAnswer: 1,
  },
  {
    question: 'De ce trebuie să faci actualizările calculatorului?',
    options: [
      'Pentru a avea acces la jocuri noi',
      'Pentru a schimba culoarea tastelor',
      'Pentru a menține calculatorul sigur și rapid',
      'Pentru a șterge aplicațiile vechi',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce pericol poate aduce un stick USB necunoscut?',
    options: [
      'Poate conține muzică neplăcută',
      'Poate aduce viruși în calculator',
      'Poate șterge parola Wi-Fi',
      'Poate bloca ecranul',
    ],
    correctAnswer: 1,
  },
  {
    question:
      'Ce trebuie să faci înainte de a instala un joc de pe un site necunoscut?',
    options: [
      'Să-l descarci cât mai repede',
      'Să îl trimiți prietenilor',
      'Să întrebi un adult dacă este sigur',
      'Să-l deschizi și să vezi ce e',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce rol are parola la pornirea calculatorului?',
    options: [
      'Să pornească mai repede',
      'Să asculți muzică mai ușor',
      'Să împiedice accesul altora fără permisiune',
      'Să afișeze un mesaj de bun venit',
    ],
    correctAnswer: 2,
  },
  {
    question: 'De ce NU e bine să amâni actualizările sistemului?',
    options: [
      'Pentru că ocupă spațiu',
      'Pentru că opresc sunetul',
      'Pentru că te expun la riscuri de securitate',
      'Pentru că fac calculatorul mai lent',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce se poate întâmpla dacă cineva îți află parola?',
    options: [
      'Poate posta lucruri în numele tău sau șterge date',
      'Primește teme în locul tău',
      'Îți trimite flori',
      'Îți trimite felicitări',
    ],
    correctAnswer: 0,
  },
  {
    question: 'Cui avem voie să spunem parola?',
    options: [
      'Celui mai bun coleg',
      'Oricui pare prietenos',
      'Doar părinților',
      'Oricărui profesor',
    ],
    correctAnswer: 2,
  },
  {
    question: 'De ce NU trebuie să scriem parola pe bilețele?',
    options: [
      'Pentru că ocupă spațiu',
      'Pentru că le poate găsi altcineva',
      'Pentru că hârtia se poate pierde',
      'Pentru că e prea greu de citit',
    ],
    correctAnswer: 1,
  },
  {
    question:
      'Ce trebuie să faci dacă primești un mesaj în care ți se cere parola?',
    options: [
      'O trimiți rapid',
      'O ignori și nu spui nimănui',
      'O spui părinților și NU o trimiți',
      'O scrii într-un caiet la școală',
    ],
    correctAnswer: 2,
  },
  {
    question:
      'De ce nu e bine să spui parola nici măcar unui prieten apropiat?',
    options: [
      'Pentru că o poate uita',
      'Pentru că ar putea să o spună altcuiva',
      'Pentru că nu are calculator',
      'Pentru că nu știe să o folosească',
    ],
    correctAnswer: 1,
  },
  {
    question:
      'Cum ar trebui să reacționezi dacă cineva pretinde că este administratorul unui joc și cere parola?',
    options: [
      'Să te grăbești să i-o dai',
      'Să verifici pe internet cine este',
      'Să o spui doar dacă ai încredere',
      'Să nu o spui și să anunți un adult',
    ],
    correctAnswer: 3,
  },
  {
    question: 'Cum trebuie să fie o parolă sigură?',
    options: [
      'Scurtă și ușor de scris',
      'Cu litere mari, mici, cifre și simboluri',
      'Doar cu numele tău',
      'Formată din cuvinte simple',
    ],
    correctAnswer: 1,
  },
  {
    question:
      'De ce NU este recomandat să folosești data de naștere în parolă?',
    options: [
      'Pentru că e greu de scris',
      'Pentru că nu are simboluri',
      'Pentru că e ușor de ghicit',
      'Pentru că nu e în engleză',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce exemplu de parolă este considerat slab în lecție?',
    options: ['Pisica!2024', 'Ana!Joc23', '123456', 'Verde8@Copac'],
    correctAnswer: 2,
  },
  {
    question:
      'Ce truc este oferit în lecție pentru a crea o parolă ușor de ținut minte?',
    options: [
      'Să o scrii pe mână',
      'Să alegi un cuvânt preferat',
      'Să folosești o propoziție cunoscută',
      'Să o înregistrezi audio',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Cât de des este recomandat să schimbi parola?',
    options: [
      'La fiecare 2-3 luni',
      'O dată pe an',
      'Doar dacă o uiți',
      'Niciodată',
    ],
    correctAnswer: 0,
  },
  {
    question: 'De ce este important ca parola să aibă și simboluri speciale?',
    options: [
      'Pentru că arată mai bine',
      'Pentru că simbolurile o fac mai greu de spart',
      'Pentru că nu sunt recunoscute de roboți',
      'Pentru că ajută la sunet',
    ],
    correctAnswer: 1,
  },
  {
    question:
      'Ce metodă poate fi folosită pentru a verifica dacă o parolă este sigură?',
    options: [
      'Să o întrebi pe colega ta',
      'Să vezi dacă o ține minte fratele tău',
      'Să folosești un generator de parole sau un adult',
      'Să o scrii pe telefon',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce NU este o parolă bună?',
    options: ['Ana2024Joc!', 'Pisica123', '@VerdeMic2023', 'AjR@2024!'],
    correctAnswer: 1,
  },
  {
    question: 'Care este un avantaj al schimbării regulate a parolei?',
    options: [
      'Nu mai trebuie să o ții minte',
      'Poți folosi cuvinte mai scurte',
      'Eviți ca cineva să o folosească pe termen lung',
      'Parola rămâne aceeași, dar mai frumoasă',
    ],
    correctAnswer: 2,
  },
  {
    question: 'Ce caracteristică are o parolă memorabilă dar sigură?',
    options: [
      'Este creată dintr-o frază ușor de reținut',
      'Este scurtă',
      'Are doar cifre',
      'Este scrisă în caiet',
    ],
    correctAnswer: 0,
  },
  {
    question: 'Ce combinație este cel mai des recomandată într-o parolă?',
    options: [
      'Cifre + litere mari',
      'Doar simboluri',
      'Litere mici + cifre',
      'Litere mari, mici, cifre și simboluri',
    ],
    correctAnswer: 3,
  },
  {
    question: 'De ce NU trebuie să folosești numele tău în parolă?',
    options: [
      'Pentru că este greu de tastat',
      'Pentru că poate fi ușor de ghicit de către alții',
      'Pentru că se uită',
      'Pentru că nu e unic',
    ],
    correctAnswer: 1,
  },
];

// Function to get 4 random questions
function getRandomQuestions(): QuizQuestion[] {
  const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

// Feedback explanations for each question
const questionFeedback: Record<number, string> = {
  0: 'Securitatea cibernetică înseamnă protejarea ta când folosești internetul. Nu înseamnă să instalezi jocuri gratuite sau să te conectezi la orice rețea Wi-Fi.',
  1: 'Nu ar trebui să acceptăm prietenii online de la străini pentru că pot fi persoane rău intenționate care ar putea să ne facă rău.',
  2: 'Nu este potrivit să postezi lucruri despre alți colegi care i-ar putea supăra. Este important să fim respectuoși online.',
  3: 'Când primești un mesaj care te sperie, ar trebui să-l arăți imediat unui adult care te poate ajuta.',
  4: 'Datele personale online, cum ar fi poze și parole, sunt informații valoroase ce trebuie protejate, nu fișiere neimportante.',
  5: 'Este important să verificăm un site cu un adult dacă pare ciudat pentru a ne asigura că nu e periculos.',
  6: 'Rolul unui antivirus este să blocheze fișiere periculoase și viruși, nu să decoreze calculatorul.',
  7: 'Trebuie să faci actualizările calculatorului pentru a menține calculatorul sigur și rapid, nu doar pentru a avea acces la jocuri noi.',
  8: 'Un stick USB necunoscut poate aduce viruși în calculator, deci trebuie să fim atenți.',
  9: 'Înainte de a instala un joc de pe un site necunoscut, trebuie să întrebi un adult dacă este sigur.',
  10: 'Parola la pornirea calculatorului are rolul de a împiedica accesul altora fără permisiune, nu de a porni mai repede.',
  11: 'Nu e bine să amâni actualizările sistemului pentru că te expun la riscuri de securitate.',
  12: 'Dacă cineva îți află parola, poate posta lucruri în numele tău sau șterge date.',
  13: 'Avem voie să spunem parola doar părinților, nu colegilor sau oricui pare prietenos.',
  14: 'Nu trebuie să scriem parola pe bilețele pentru că le poate găsi altcineva.',
  15: 'Dacă primești un mesaj în care ți se cere parola, trebuie să o spui părinților și NU să o trimiți.',
  16: 'Nu e bine să spui parola nici măcar unui prieten apropiat pentru că ar putea să o spună altcuiva.',
  17: 'Dacă cineva pretinde că este administratorul unui joc și cere parola, trebuie să nu o spui și să anunți un adult.',
  18: 'O parolă sigură trebuie să fie cu litere mari, mici, cifre și simboluri, nu scurtă și ușor de scris.',
  19: 'Nu este recomandat să folosești data de naștere în parolă pentru că e ușor de ghicit.',
  20: "Parola '123456' este considerată slabă în lecție pentru că este prea simplă și ușor de ghicit.",
  21: 'Un truc pentru a crea o parolă ușor de ținut minte este să folosești o propoziție cunoscută.',
  22: 'Este recomandat să schimbi parola la fiecare 2-3 luni, nu o dată pe an sau niciodată.',
  23: 'Este important ca parola să aibă și simboluri speciale pentru că simbolurile o fac mai greu de spart.',
  24: 'Pentru a verifica dacă o parolă este sigură, poți folosi un generator de parole sau un adult.',
  25: "Parola 'Pisica123' nu este o parolă bună pentru că nu conține simboluri speciale.",
  26: 'Un avantaj al schimbării regulate a parolei este că eviți ca cineva să o folosească pe termen lung.',
  27: 'O parolă memorabilă dar sigură este creată dintr-o frază ușor de reținut.',
  28: 'Cea mai des recomandată combinație într-o parolă este litere mari, mici, cifre și simboluri.',
  29: 'Nu trebuie să folosești numele tău în parolă pentru că poate fi ușor de ghicit de către alții.',
};

const PlatformerGame: React.FC = () => {
  const router = useRouter();
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
  const [correctAnswersInARow, setCorrectAnswersInARow] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [progressAnimation] = useState(new Animated.Value(0));
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<
    QuizQuestion[]
  >([]);
  const [failedAttempts, setFailedAttempts] = useState<Record<number, number>>(
    {}
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [failedQuestionIndex, setFailedQuestionIndex] = useState<number | null>(
    null
  );
  const [showHackerLab, setShowHackerLab] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [isProcessingMalware, setIsProcessingMalware] = useState(false);

  // Security tips in Romanian
  const securityTips = [
    'Nu da niciodată parola ta altcuiva!',
    'Spune unui adult dacă vezi ceva ciudat online.',
    'Nu deschide emailuri de la persoane necunoscute.',
    'Folosește parole diferite pentru conturi diferite.',
    'Nu da informații personale pe internet.',
    'Ai grijă ce linkuri deschizi!',
  ];

  // Initialize random questions when component mounts
  useEffect(() => {
    setCurrentQuizQuestions(getRandomQuestions());
  }, []);

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

  // Check for malware elimination with improved feedback
  useEffect(() => {
    if (isProcessingMalware) return; // Prevent re-entry while processing

    const checkMalwareElimination = () => {
      const updatedMalware = [...malwareThreats];
      let hasUpdates = false;
      let newScore = score;
      let newProgress = gameProgress;
      let shouldShowTip = false;
      let tipToShow = '';

      malwareThreats.forEach((threat, index) => {
        if (!threat.eliminated) {
          const distance = Math.sqrt(
            Math.pow(engineerPosition.left - threat.x, 2) +
              Math.pow(engineerPosition.top - threat.y, 2)
          );

          if (distance < 30) {
            updatedMalware[index].eliminated = true;
            hasUpdates = true;
            newScore += 15;
            newProgress = Math.min(100, gameProgress + 8);
            shouldShowTip = true;
            tipToShow =
              securityTips[Math.floor(Math.random() * securityTips.length)];
            Vibration.vibrate(100);
          }
        }
      });

      if (hasUpdates) {
        setIsProcessingMalware(true);
        // Batch updates together
        setMalwareThreats(updatedMalware);
        setScore(newScore);
        setGameProgress(newProgress);

        if (shouldShowTip) {
          setCurrentTip(tipToShow);
          setShowTip(true);
          setTimeout(() => {
            setShowTip(false);
            setIsProcessingMalware(false);
          }, 3000);
        } else {
          setIsProcessingMalware(false);
        }

        // Animate progress bar
        Animated.timing(progressAnimation, {
          toValue: newProgress / 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    };

    checkMalwareElimination();
  }, [engineerPosition.left, engineerPosition.top]);

  const handleTeleportPress = () => {
    // Verificăm doar dacă toate computerele sunt rezolvate
    if (solvedComputers.every((solved) => solved)) {
      console.log('Teleporting...'); // Debug log
      Vibration.vibrate(100);
      setShowHackerLab(true); // Activăm laboratorul hackerului
      setCurrentTip('Ai găsit portalul secret!');
      setShowTip(true);
      setTimeout(() => setShowTip(false), 3000);
    } else {
      // Feedback dacă nu toate computerele sunt rezolvate
      setCurrentTip('Rezolvă mai întâi toate provocările!');
      setShowTip(true);
      setTimeout(() => setShowTip(false), 3000);
    }
  };

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
      const questionIndex = activeQuiz % currentQuizQuestions.length;
      const question = currentQuizQuestions[questionIndex];

      // Check if this is a retry after a failed attempt
      const isRetry = failedAttempts[activeQuiz] === 1;

      if (answerIndex === question.correctAnswer) {
        const newSolvedComputers = [...solvedComputers];
        newSolvedComputers[activeQuiz] = true;
        setSolvedComputers(newSolvedComputers);

        // Reset failed attempts for this computer
        const newFailedAttempts = { ...failedAttempts };
        delete newFailedAttempts[activeQuiz];
        setFailedAttempts(newFailedAttempts);

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

        setShowModal(false);
        setActiveQuiz(null);
      } else {
        // Wrong answer handling
        Vibration.vibrate(200);

        // Check if this is the first or second attempt
        if (!isRetry) {
          // First attempt - give a second chance
          const newFailedAttempts = { ...failedAttempts, [activeQuiz]: 1 };
          setFailedAttempts(newFailedAttempts);

          // Show hint for retry
          setCurrentTip('Încearcă din nou! Ai încă o șansă.');
          setShowTip(true);
          setTimeout(() => setShowTip(false), 3000);
        } else {
          // Second failed attempt - show feedback and reset
          setCorrectAnswersInARow(0);

          // Find the question index in the allQuizQuestions array
          const allQuestionsIndex = allQuizQuestions.findIndex(
            (q) => q.question === question.question
          );

          // Set feedback and show feedback modal
          setCurrentFeedback(
            questionFeedback[allQuestionsIndex] ||
              'Răspunsul corect era: ' +
                question.options[question.correctAnswer]
          );
          setFailedQuestionIndex(activeQuiz);
          setShowFeedback(true);

          // Reset failed attempts for this computer
          const newFailedAttempts = { ...failedAttempts };
          delete newFailedAttempts[activeQuiz];
          setFailedAttempts(newFailedAttempts);

          setShowModal(false);
        }
      }
    }
  };

  const handleRetry = () => {
    setShowFeedback(false);
    setFailedQuestionIndex(null);
    setShowModal(true);
  };

  const handleBackToLevels = () => {
    // Generate new random questions when leaving the level
    setCurrentQuizQuestions(getRandomQuestions());
    router.back();
  };

  // Handle position updates from the MovementController
  const handlePositionChange = (newPosition: { left: number; top: number }) => {
    setEngineerPosition(newPosition);
  };

  // Get the position type for a computer workstation
  const getComputerPosition = (index: number) => {
    switch (index) {
      case 0:
        return 'topLeft';
      case 1:
        return 'topRight';
      case 2:
        return 'bottomLeft';
      case 3:
        return 'bottomRight';
      default:
        return 'topLeft';
    }
  };

  const handleHackerLabComplete = () => {
    setShowHackerLab(false);
    setLevelCompleted(true);
    // Afișează mesajul de succes final
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      router.back(); // Întoarce la lista de nivele
    }, 3000);
  };

  return (
    <SafeAreaView style={platformerGameStyles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Navigation Controls */}
      <NavigationControls onBackPress={handleBackToLevels} />

      {/* Level title */}
      <LevelTitle title="Level 1: Cyber Security Basics" />

      {/* Score Display */}
      <ScoreDisplay score={score} />

      {/* Progress Bar */}
      <ProgressBar
        progress={gameProgress}
        progressAnimation={progressAnimation}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.mainContent}>
          {/* Lab Background with Grid */}
          <GridBackground isUnderAttack={hackerAttack} />

          {/* Security Status Display */}
          <SecurityStatus
            securityLevel={securityLevel as 'Low' | 'Medium' | 'High'}
            isUnderAttack={hackerAttack}
          />

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
                  <ComputerWorkstation
                    key={index}
                    index={index}
                    isSolved={solvedComputers[index]}
                    isUnderAttack={hackerAttack}
                    onPress={handleComputerPress}
                    position={
                      getComputerPosition(index) as
                        | 'topLeft'
                        | 'topRight'
                        | 'bottomLeft'
                        | 'bottomRight'
                    }
                  />
                ))}
              </View>

              {/* Malware Threats */}
              {malwareThreats.map(
                (threat, index) =>
                  !threat.eliminated && (
                    <MalwareThreat
                      key={index}
                      type={threat.type}
                      position={{ x: threat.x, y: threat.y }}
                    />
                  )
              )}

              {/* Engineer Character */}
              <EngineerCharacter position={engineerPosition} />
            </View>

            {/* Right Section - Security Features */}
            <RightSection
              isFirewallActive={solvedComputers.every((solved) => solved)}
            />
          </View>

          {/* Bottom Padding to ensure content is above tab bar */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      {/* Movement Controller */}
      <MovementController
        initialPosition={engineerPosition}
        onPositionChange={handlePositionChange}
      />

      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}

      {/* Success Message */}
      <SuccessMessage visible={showSuccessMessage} />

      {/* Quiz Modal */}
      <QuizModal
        visible={showModal}
        activeQuiz={activeQuiz}
        questions={currentQuizQuestions}
        onAnswer={handleAnswer}
        isRetry={activeQuiz !== null ? failedAttempts[activeQuiz] === 1 : false}
      />

      {/* Feedback Modal */}
      <Modal visible={showFeedback} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Feedback</Text>
            <Text style={styles.feedbackText}>{currentFeedback}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Încearcă din nou</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Game Instructions */}
      <HelpButton onPress={() => setShowTutorial(true)} />

      {/* Security Tip Popup */}
      <SecurityTip tip={currentTip} visible={showTip} />

      {/* Teleport Area Indicator cu zonă apăsabilă */}
      {solvedComputers.every((solved) => solved) && (
        <TouchableOpacity
          style={[
            styles.teleportArea,
            {
              position: 'absolute',
              right: 150,
              bottom: 120,
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: '#00ff00',
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              zIndex: 1000,
            },
          ]}
          onPress={handleTeleportPress}
          activeOpacity={0.6}
        >
          <Text style={styles.teleportText}>Apasă pentru{'\n'}teleportare</Text>
        </TouchableOpacity>
      )}

      {/* Hacker Lab */}
      <HackerLab
        visible={showHackerLab}
        onComplete={handleHackerLabComplete}
        onExit={() => {
          console.log('Exiting hacker lab'); // Debug log
          setShowHackerLab(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  leftSection: {
    flex: 1,
    position: 'relative',
  },
  centerSection: {
    flex: 2,
    position: 'relative',
  },
  workstationArea: {
    flex: 1,
    position: 'relative',
  },
  networkCables: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  livesContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
  },
  livesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: TAB_BAR_HEIGHT + 20, // Extra padding at the bottom
  },
  teleportArea: {
    position: 'absolute',
    right: 150,
    bottom: 120,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#00ff00',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teleportText: {
    color: '#00ff00',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default PlatformerGame;
