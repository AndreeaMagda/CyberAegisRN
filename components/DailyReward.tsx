import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';

interface DailyRewardProps {
  isVisible: boolean;
  onClose: () => void;
  onClaimReward?: (day: number, reward: string) => void;
}

const rewards = [
  { day: 1, reward: '100 XP', icon: '⭐' },
  { day: 2, reward: '200 XP', icon: '🌟' },
  { day: 3, reward: '300 XP', icon: '💫' },
  { day: 4, reward: '400 XP', icon: '✨' },
  { day: 5, reward: '500 XP', icon: '👑' },
  { day: 6, reward: '600 XP', icon: '🎮' },
  { day: 7, reward: '1000 XP', icon: '🏆' },
];

export default function DailyReward({
  isVisible,
  onClose,
  onClaimReward,
}: DailyRewardProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [lastClaimDate, setLastClaimDate] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [isVisible]);

  const handleClaim = (day: number, reward: string) => {
    const today = new Date().toDateString();
    if (lastClaimDate === today) {
      alert('You have already claimed your reward today!');
      return;
    }

    setLastClaimDate(today);
    setCurrentDay((prev) => Math.min(prev + 1, 7));
    onClaimReward?.(day, reward);

    // Add animation or visual feedback here
    alert(`Congratulations! You received ${reward}!`);
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Daily Rewards</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rewardsContainer}>
            {rewards.map((reward) => (
              <View key={reward.day} style={styles.rewardBox}>
                <Text style={styles.dayText}>Day {reward.day}</Text>
                <Text style={styles.rewardIcon}>{reward.icon}</Text>
                <Text style={styles.rewardText}>{reward.reward}</Text>
                <TouchableOpacity
                  style={[
                    styles.claimButton,
                    {
                      backgroundColor:
                        reward.day < currentDay
                          ? '#4CAF50'
                          : reward.day === currentDay
                          ? '#2196F3'
                          : '#9E9E9E',
                    },
                  ]}
                  onPress={() =>
                    reward.day === currentDay &&
                    handleClaim(reward.day, reward.reward)
                  }
                  disabled={reward.day !== currentDay}
                >
                  <Text style={styles.claimButtonText}>
                    {reward.day < currentDay
                      ? '✓'
                      : reward.day === currentDay
                      ? 'CLAIM'
                      : 'LOCKED'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#003B73',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 600,
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#60A3D9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#60A3D9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BFD7ED',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0074B7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#BFD7ED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 15,
  },
  rewardBox: {
    backgroundColor: '#0074B7',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: '#60A3D9',
    marginBottom: 15,
  },
  dayText: {
    color: '#BFD7ED',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rewardIcon: {
    fontSize: 24,
    marginVertical: 5,
  },
  rewardText: {
    color: '#BFD7ED',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  claimButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
