import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModalProps {
  visible: boolean;
  activeQuiz: number | null;
  questions: QuizQuestion[];
  onAnswer: (answerIndex: number) => void;
  isRetry?: boolean;
}

const QuizModal: React.FC<QuizModalProps> = ({
  visible,
  activeQuiz,
  questions,
  onAnswer,
}) => {
  if (activeQuiz === null) {
    return null;
  }

  // Get the current question (handle index out of bounds)
  const questionIndex = activeQuiz % questions.length;
  const currentQuestion = questions[questionIndex];

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={platformerGameStyles.modalOverlay}>
        <View style={platformerGameStyles.modalContent}>
          <Text style={platformerGameStyles.modalTitle}>
            Provocare de Securitate
          </Text>
          <Text style={platformerGameStyles.questionText}>
            {currentQuestion.question}
          </Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                platformerGameStyles.optionButton,
                { transform: [{ scale: 1 }] },
              ]}
              onPress={() => onAnswer(index)}
              activeOpacity={0.7}
            >
              <Text style={platformerGameStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default QuizModal;
