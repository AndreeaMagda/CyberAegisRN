import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface FirewallStatusProps {
  isActive: boolean;
}

const FirewallStatus: React.FC<FirewallStatusProps> = ({ isActive }) => {
  return (
    <View style={platformerGameStyles.firewallStatus}>
      <Text style={platformerGameStyles.firewallLabel}>FIREWALL</Text>
      <View
        style={[
          platformerGameStyles.firewallIndicator,
          isActive
            ? platformerGameStyles.firewallActive
            : platformerGameStyles.firewallInactive,
        ]}
      />
    </View>
  );
};

export default FirewallStatus;
