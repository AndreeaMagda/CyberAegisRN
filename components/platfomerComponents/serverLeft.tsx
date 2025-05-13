import { Text, View } from 'react-native';
import { platformerGameStyles } from '@/app/styles/platformerGameStyle';

export default function ServerLeft() {
  return (
    <View style={platformerGameStyles.serverRack}>
      {[...Array(6)].map((_, i) => (
        <View key={i} style={platformerGameStyles.server}>
          <View style={platformerGameStyles.serverLights}>
            <View
              style={[
                platformerGameStyles.light,
                platformerGameStyles.lightGreen,
              ]}
            />
            <View
              style={[
                platformerGameStyles.light,
                platformerGameStyles.lightBlue,
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
