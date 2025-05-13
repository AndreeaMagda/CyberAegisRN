import { Text, TouchableOpacity, View } from 'react-native';
import { platformerGameStyles } from '@/app/styles/platformerGameStyle';

interface TutorialOverlayProps {
  onClose: () => void;
}

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  return (
    <View style={platformerGameStyles.tutorialOverlay}>
      <View style={platformerGameStyles.tutorialBox}>
        <Text style={platformerGameStyles.tutorialTitle}>
          Bine ai venit, Inginer de Securitate!
        </Text>
        <Text style={platformerGameStyles.tutorialText}>
          Misiunea ta este să securizezi toate computerele din laborator. Apasă
          pe computere pentru a rezolva provocările de securitate.
        </Text>
        <TouchableOpacity
          style={platformerGameStyles.tutorialButton}
          onPress={onClose}
        >
          <Text style={platformerGameStyles.tutorialButtonText}>
            Am înțeles!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
