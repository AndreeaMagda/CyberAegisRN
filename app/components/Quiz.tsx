import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { styles } from '../styles/quizStyles';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (!isSubmitted) {
      const newAnswers = [...selectedAnswers];
      newAnswers[questionIndex] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.includes(-1)) {
      alert('Te rog răspunde la toate întrebările înainte de a trimite!');
      return;
    }
    setIsSubmitted(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswerIndex ? 1 : 0);
    }, 0);
  };

  const getScoreColor = () => {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 50) return '#FFC107';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      {questions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={styles.question}>
            {questionIndex + 1}. {question.question}
          </Text>
          {question.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.optionContainer,
                selectedAnswers[questionIndex] === optionIndex &&
                  styles.selectedOption,
                isSubmitted && {
                  backgroundColor:
                    optionIndex === question.correctAnswerIndex
                      ? '#E8F5E9'
                      : selectedAnswers[questionIndex] === optionIndex
                      ? '#FFEBEE'
                      : '#fff',
                },
              ]}
              onPress={() => handleSelect(questionIndex, optionIndex)}
              disabled={isSubmitted}
            >
              <View
                style={[
                  styles.bullet,
                  selectedAnswers[questionIndex] === optionIndex &&
                    styles.selectedBullet,
                  isSubmitted && {
                    borderColor:
                      optionIndex === question.correctAnswerIndex
                        ? '#4CAF50'
                        : selectedAnswers[questionIndex] === optionIndex
                        ? '#F44336'
                        : '#757575',
                  },
                ]}
              >
                {selectedAnswers[questionIndex] === optionIndex && (
                  <View
                    style={[
                      styles.innerBullet,
                      isSubmitted && {
                        backgroundColor:
                          optionIndex === question.correctAnswerIndex
                            ? '#4CAF50'
                            : '#F44336',
                      },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.optionText,
                  isSubmitted &&
                    optionIndex === question.correctAnswerIndex && {
                      color: '#4CAF50',
                      fontWeight: 'bold',
                    },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {!isSubmitted ? (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Trimite răspunsurile</Text>
        </TouchableOpacity>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.resultContainer}>
            <Text style={[styles.scoreText, { color: getScoreColor() }]}>
              Scor: {calculateScore()}/{questions.length} răspunsuri corecte
            </Text>
            <TouchableOpacity
              style={styles.explanationButton}
              onPress={() => setShowExplanations(!showExplanations)}
            >
              <Text style={styles.explanationButtonText}>
                {showExplanations ? 'Ascunde explicațiile' : 'Vezi explicațiile'}
              </Text>
            </TouchableOpacity>
          </View>

          {showExplanations && (
            <View style={styles.explanationsContainer}>
              {questions.map((question, index) => (
                <View key={index} style={styles.explanationItem}>
                  <Text style={styles.explanationQuestion}>
                    {index + 1}. {question.question}
                  </Text>
                  <Text style={styles.explanationText}>
                    <Text style={styles.explanationLabel}>Explicație: </Text>
                    {question.explanation}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
} 