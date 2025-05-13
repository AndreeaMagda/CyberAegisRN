import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface EngineerCharacterProps {
  position: { left: number; top: number };
}

const EngineerCharacter: React.FC<EngineerCharacterProps> = ({ position }) => {
  return (
    <Animated.View
      style={[
        platformerGameStyles.staticEngineer,
        {
          left: position.left,
          top: position.top,
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
          style={[platformerGameStyles.body, platformerGameStyles.sittingBody]}
        >
          <View style={platformerGameStyles.labCoat} />
          <View style={platformerGameStyles.badge} />
        </View>
        <View
          style={[platformerGameStyles.legs, platformerGameStyles.sittingLegs]}
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
  );
};

export default EngineerCharacter;
