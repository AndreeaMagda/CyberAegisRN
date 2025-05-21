import React, { useEffect, useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import styles from './styles/style';
import ScenarioCard from './components/ScenarioCard';
import GuessButtons from './components/GuessButtons';
import ResultDisplay from './components/ResultDisplay';
import LoadingAnimation from './components/LoadingAnimation';
import { View } from 'react-native';
import { API_ENDPOINTS } from './helpers/api';

const API_URL = API_ENDPOINTS.generateScenario('ro');

export default function HomeScreen() {
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { correct: boolean }>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchScenario = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setScenario(data);
    } catch (err) {
      console.error('Error fetching scenario', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScenario();
  }, []);

  const handleGuess = (guess: boolean) => {
    if (!scenario) return;
    const isCorrect = guess === scenario.expectedSafe;
    setResult({ correct: isCorrect });
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  if (loading || !scenario) {
    return <LoadingAnimation />;
  }

  return (
    <View style={styles.container}>
      <ScenarioCard scenario={scenario.scenario} />
      {!result && <GuessButtons onGuess={handleGuess} />}
      {result && (
        <ResultDisplay correct={result.correct} onNext={fetchScenario} />
      )}
      {showConfetti && <ConfettiCannon count={80} origin={{ x: 200, y: 0 }} />}
    </View>
  );
}