import React from 'react';
import { View, Text } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface SecurityStatusProps {
  securityLevel: 'Low' | 'Medium' | 'High';
  isUnderAttack: boolean;
}

const SecurityStatus: React.FC<SecurityStatusProps> = ({
  securityLevel,
  isUnderAttack,
}) => {
  // Get the localized security level text
  const getSecurityLevelText = () => {
    switch (securityLevel) {
      case 'Low':
        return 'Scăzut';
      case 'Medium':
        return 'Mediu';
      case 'High':
        return 'Ridicat';
      default:
        return 'Necunoscut';
    }
  };

  return (
    <View style={platformerGameStyles.securityStatus}>
      <Text style={platformerGameStyles.securityLabel}>NIVEL SECURITATE:</Text>
      <View
        style={[
          platformerGameStyles.securityIndicator,
          securityLevel === 'Low' && platformerGameStyles.securityLow,
          securityLevel === 'Medium' && platformerGameStyles.securityMedium,
          securityLevel === 'High' && platformerGameStyles.securityHigh,
        ]}
      >
        <Text style={platformerGameStyles.securityText}>
          {getSecurityLevelText()}
        </Text>
      </View>
      {isUnderAttack && (
        <View style={platformerGameStyles.alertBadge}>
          <Text style={platformerGameStyles.alertText}>ATAC DETECTAT!</Text>
        </View>
      )}
    </View>
  );
};

export default SecurityStatus;
