import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const MOVEMENT_SPEED = 10;
const TAB_BAR_HEIGHT = 49;
const AVAILABLE_HEIGHT =
  height - TAB_BAR_HEIGHT - (StatusBar.currentHeight || 0);

const BOUNDARY = {
  minX: 0,
  maxX: width - 50,
  minY: 0,
  maxY: AVAILABLE_HEIGHT - 100,
};

interface MovementControllerProps {
  onPositionChange: (position: { left: number; top: number }) => void;
  initialPosition: { left: number; top: number };
  style?: object;
}

const MovementController: React.FC<MovementControllerProps> = ({
  onPositionChange,
  initialPosition,
  style,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [movementDirection, setMovementDirection] = useState<string | null>(
    null
  );
  const lastReportedPosition = useRef(initialPosition);

  // Move character function
  const moveCharacter = (direction: 'up' | 'down' | 'left' | 'right') => {
    setPosition((current) => {
      let newPosition = { ...current };

      switch (direction) {
        case 'up':
          newPosition.top = Math.max(
            BOUNDARY.minY,
            current.top - MOVEMENT_SPEED
          );
          break;
        case 'down':
          newPosition.top = Math.min(
            BOUNDARY.maxY,
            current.top + MOVEMENT_SPEED
          );
          break;
        case 'left':
          newPosition.left = Math.max(
            BOUNDARY.minX,
            current.left - MOVEMENT_SPEED
          );
          break;
        case 'right':
          newPosition.left = Math.min(
            BOUNDARY.maxX,
            current.left + MOVEMENT_SPEED
          );
          break;
      }

      return newPosition;
    });
  };

  // Handle continuous movement
  useEffect(() => {
    if (!movementDirection) return;

    const moveInterval = setInterval(() => {
      moveCharacter(movementDirection as 'up' | 'down' | 'left' | 'right');
    }, 100);

    return () => clearInterval(moveInterval);
  }, [movementDirection]);

  // Update parent component when position changes, but only if it's different
  useEffect(() => {
    if (
      position.left !== lastReportedPosition.current.left ||
      position.top !== lastReportedPosition.current.top
    ) {
      lastReportedPosition.current = position;
      onPositionChange(position);
    }
  }, [position.left, position.top]);

  // Handle button press and release
  const handleDirectionPress = (
    direction: 'up' | 'down' | 'left' | 'right'
  ) => {
    setMovementDirection(direction);
    moveCharacter(direction);
  };

  const handleDirectionRelease = () => {
    setMovementDirection(null);
  };

  return (
    <View style={[styles.controls, style]}>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => handleDirectionPress('up')}
          onPressOut={handleDirectionRelease}
        >
          <Text style={styles.controlButtonText}>↑</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => handleDirectionPress('left')}
          onPressOut={handleDirectionRelease}
        >
          <Text style={styles.controlButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.controlButtonSpacer} />
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => handleDirectionPress('right')}
          onPressOut={handleDirectionRelease}
        >
          <Text style={styles.controlButtonText}>→</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={styles.controlButton}
          onPressIn={() => handleDirectionPress('down')}
          onPressOut={handleDirectionRelease}
        >
          <Text style={styles.controlButtonText}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 10,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  controlButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  controlButtonSpacer: {
    width: 50,
  },
});

export default MovementController;
