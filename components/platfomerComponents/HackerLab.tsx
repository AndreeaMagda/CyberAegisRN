import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Alert, Animated } from 'react-native';
import EngineerCharacter from './EngineerCharacter';
import MovementController from './MovementController';
import { platformerGameStyles } from '../../app/styles/platformerGameStyle';

interface HackerLabProps {
  visible: boolean;
  onComplete: () => void;
  onExit: () => void;
}

const HackerLab: React.FC<HackerLabProps> = ({ visible, onComplete, onExit }) => {
  const [position, setPosition] = useState({ left: 40, top: 150 });
  const [showComputer, setShowComputer] = useState(false);
  const [showCabinet, setShowCabinet] = useState(false);
  const [password, setPassword] = useState('');
  const [foundPassword, setFoundPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  
  const correctPassword = 'CyberAegis2024!';

  useEffect(() => {
    if (showComputer) {
      const interval = setInterval(() => {
        setIsGlowing(prev => !prev);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsGlowing(false);
    }
  }, [showComputer]);

  const handleComputerPress = () => {
    if (Math.abs(position.left - 300) < 50 && Math.abs(position.top - 150) < 50) {
      setShowComputer(true);
    }
  };

  const handleCabinetPress = () => {
    if (Math.abs(position.left - 100) < 50 && Math.abs(position.top - 250) < 50) {
      setShowCabinet(true);
      setFoundPassword(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onComplete();
      }, 3000);
    } else {
      Alert.alert('Parolă incorectă', 'Încearcă să găsești parola corectă în laborator.');
    }
  };

  const handlePositionChange = (newPosition: { left: number; top: number }) => {
    const maxLeft = 350;
    const maxTop = 400;
    const newLeft = Math.max(0, Math.min(newPosition.left, maxLeft));
    const newTop = Math.max(0, Math.min(newPosition.top, maxTop));
    
    setPosition({ left: newLeft, top: newTop });
  };

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <Text style={styles.title}>Laboratorul Hackerului</Text>
        
        {/* Exit Button */}
        <TouchableOpacity style={styles.exitButton} onPress={onExit}>
          <Text style={styles.exitText}>← Înapoi</Text>
        </TouchableOpacity>

        {/* Hacker's Computer */}
        <TouchableOpacity 
          style={styles.computer}
          onPress={handleComputerPress}
        >
          <View style={[styles.monitor, isGlowing && styles.glowEffect]}>
            <View style={styles.screen}>
              <View style={styles.screenContent} />
            </View>
          </View>
          <View style={styles.base} />
        </TouchableOpacity>

        {/* File Cabinet */}
        <TouchableOpacity 
          style={styles.cabinet}
          onPress={handleCabinetPress}
        >
          <View style={styles.cabinetDoor}>
            <View style={styles.cabinetHandle} />
          </View>
        </TouchableOpacity>

        {/* Server Racks */}
        <View style={styles.serverRack}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.server}>
              <View style={styles.serverLights}>
                <View style={styles.serverLight} />
                <View style={styles.serverLight} />
              </View>
            </View>
          ))}
        </View>

        {/* Network Cables */}
        <View style={styles.networkCables}>
          {[...Array(3)].map((_, i) => (
            <View key={i} style={styles.cable} />
          ))}
        </View>

        {/* Character */}
        <EngineerCharacter position={position} />

        {/* Computer Screen Modal */}
        <Modal visible={showComputer} transparent animationType="fade">
          <View style={styles.computerModal}>
            <View style={styles.computerContent}>
              <Text style={styles.computerTitle}>Terminal Acces</Text>
              <Text style={styles.computerSubtitle}>Introdu parola administrator pentru a accesa sistemul</Text>
              <TextInput
                style={styles.passwordInput}
                placeholder="Introdu parola"
                placeholderTextColor="#00ff00"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handlePasswordSubmit}
              >
                <Text style={styles.submitText}>Conectare</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowComputer(false)}
              >
                <Text style={styles.closeText}>Închide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Cabinet Note Modal */}
        <Modal visible={showCabinet} transparent animationType="fade">
          <View style={styles.cabinetModal}>
            <View style={styles.noteContent}>
              <Text style={styles.noteTitle}>Notă Găsită</Text>
              <Text style={styles.noteText}>
                Parolă administrator:{'\n'}
                {correctPassword}{'\n\n'}
                * Conține litere mari și mici{'\n'}
                * Include anul curent{'\n'}
                * Are un caracter special{'\n'}
                * Este memorabilă
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCabinet(false)}
              >
                <Text style={styles.closeText}>Închide</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Success Message */}
        {showSuccess && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Felicitări! Ai terminat primul nivel!</Text>
          </View>
        )}

        {/* Movement Controller */}
        <MovementController
          initialPosition={position}
          onPositionChange={handlePositionChange}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#00ff00',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  exitButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  exitText: {
    color: '#00ff00',
    fontSize: 18,
  },
  computer: {
    position: 'absolute',
    right: 100,
    top: 150,
  },
  monitor: {
    width: 100,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  screen: {
    width: 90,
    height: 70,
    backgroundColor: '#000',
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  screenContent: {
    flex: 1,
    backgroundColor: '#001100',
    margin: 2,
    borderRadius: 3,
  },
  base: {
    width: 50,
    height: 15,
    backgroundColor: '#333',
    marginLeft: 25,
    borderRadius: 5,
  },
  cabinet: {
    position: 'absolute',
    left: 100,
    top: 250,
    width: 70,
    height: 120,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  cabinetDoor: {
    width: 60,
    height: 110,
    margin: 5,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  cabinetHandle: {
    position: 'absolute',
    right: 5,
    top: '50%',
    width: 10,
    height: 20,
    backgroundColor: '#666',
    borderRadius: 5,
  },
  serverRack: {
    position: 'absolute',
    right: 30,
    top: 50,
    width: 100,
    height: 350,
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 5,
  },
  server: {
    width: 90,
    height: 60,
    backgroundColor: '#222',
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  serverLights: {
    flexDirection: 'row',
    gap: 5,
  },
  serverLight: {
    width: 8,
    height: 8,
    backgroundColor: '#00ff00',
    borderRadius: 4,
  },
  networkCables: {
    position: 'absolute',
    right: 130,
    top: 50,
    width: 20,
    height: 350,
  },
  cable: {
    width: 5,
    height: 50,
    backgroundColor: '#666',
    marginVertical: 5,
    borderRadius: 2,
  },
  computerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  computerContent: {
    width: '80%',
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  computerTitle: {
    color: '#00ff00',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  computerSubtitle: {
    color: '#00ff00',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  passwordInput: {
    backgroundColor: '#111',
    color: '#00ff00',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00ff00',
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#00ff00',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  cabinetModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  successContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -50 }],
    width: 300,
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  successText: {
    color: '#00ff00',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  glowEffect: {
    borderColor: '#00ff00',
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default HackerLab; 