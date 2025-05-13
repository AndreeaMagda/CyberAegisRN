import React from 'react';
import { View } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface GridBackgroundProps {
  isUnderAttack?: boolean;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  isUnderAttack = false,
}) => {
  return (
    <View
      style={[
        platformerGameStyles.labBackground,
        isUnderAttack && platformerGameStyles.hackerAttackBackground,
      ]}
    >
      <View style={platformerGameStyles.gridLines}>
        {[...Array(10)].map((_, i) => (
          <View
            key={`h${i}`}
            style={[platformerGameStyles.horizontalLine, { top: `${i * 10}%` }]}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <View
            key={`v${i}`}
            style={[platformerGameStyles.verticalLine, { left: `${i * 10}%` }]}
          />
        ))}
      </View>
    </View>
  );
};

export default GridBackground;
