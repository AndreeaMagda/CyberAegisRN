import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface ComputerWorkstationProps {
  index: number;
  isSolved: boolean;
  isUnderAttack: boolean;
  onPress: (index: number) => void;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

const ComputerWorkstation: React.FC<ComputerWorkstationProps> = ({
  index,
  isSolved,
  isUnderAttack,
  onPress,
  position,
}) => {
  // Determine position styles based on the position prop
  const getPositionStyles = () => {
    const styles = [];

    if (position === 'topLeft' || position === 'bottomLeft') {
      styles.push(platformerGameStyles.leftDesk);
    } else {
      styles.push(platformerGameStyles.rightDesk);
    }

    if (position === 'topLeft' || position === 'topRight') {
      styles.push(platformerGameStyles.topRow);
    } else {
      styles.push(platformerGameStyles.bottomRow);
    }

    return styles;
  };

  return (
    <TouchableOpacity
      style={[
        platformerGameStyles.desk,
        ...getPositionStyles(),
        !isSolved && platformerGameStyles.interactiveDesk,
      ]}
      onPress={() => onPress(index)}
      disabled={isSolved}
    >
      <View style={platformerGameStyles.monitor}>
        <View
          style={[
            platformerGameStyles.screen,
            isSolved && platformerGameStyles.solvedScreen,
            isUnderAttack && !isSolved && platformerGameStyles.hackedScreen,
          ]}
        >
          <View style={platformerGameStyles.screenContent} />
          <View style={platformerGameStyles.screenContent} />
          {isSolved && (
            <View style={platformerGameStyles.checkmark}>
              <Text style={platformerGameStyles.checkmarkText}>✓</Text>
            </View>
          )}
          {isUnderAttack && !isSolved && (
            <Text style={platformerGameStyles.hackerText}>!</Text>
          )}
        </View>
        <View style={platformerGameStyles.monitorStand} />
      </View>
      <View style={platformerGameStyles.keyboard}>
        {[...Array(3)].map((_, j) => (
          <View key={j} style={platformerGameStyles.keyboardRow} />
        ))}
      </View>
      <View style={platformerGameStyles.mouse} />
    </TouchableOpacity>
  );
};

export default ComputerWorkstation;
