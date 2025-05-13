import React from 'react';
import { View, StyleSheet } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

const SecurityMonitors: React.FC = () => {
  return (
    <View style={platformerGameStyles.securityMonitors}>
      <View style={platformerGameStyles.securityMonitor}>
        <View style={platformerGameStyles.monitorScreen}>
          <View style={platformerGameStyles.monitorGraph} />
        </View>
      </View>
      <View style={platformerGameStyles.securityMonitor}>
        <View style={platformerGameStyles.monitorScreen}>
          <View style={platformerGameStyles.monitorData} />
          <View style={platformerGameStyles.monitorData} />
          <View style={platformerGameStyles.monitorData} />
        </View>
      </View>
    </View>
  );
};

export default SecurityMonitors;
