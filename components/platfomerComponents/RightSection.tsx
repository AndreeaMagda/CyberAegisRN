import React from 'react';
import { View, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';
import SecurityMonitors from './SecurityMonitors';
import SecurityFeatures from './SecurityFeatures';
import FirewallStatus from './FirewallStatus';

interface RightSectionProps {
  isFirewallActive: boolean;
}

const RightSection: React.FC<RightSectionProps> = ({ isFirewallActive }) => {
  return (
    <View style={platformerGameStyles.rightSection}>
      {/* Security Monitors */}
      <SecurityMonitors />

      {/* Security Features */}
      <SecurityFeatures />

      {/* Firewall Status */}
      <FirewallStatus isActive={isFirewallActive} />
    </View>
  );
};

export default RightSection;
