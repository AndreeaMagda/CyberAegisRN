import { View } from 'react-native';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

export default function NetworkCables() {
  return (
    <View style={platformerGameStyles.networkCables}>
      {['#FF5252', '#4CAF50', '#2196F3', '#FFEB3B'].map((color, i) => (
        <View
          key={i}
          style={[platformerGameStyles.cable, { backgroundColor: color }]}
        />
      ))}
    </View>
  );
}
