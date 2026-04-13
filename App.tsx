import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Alert 
} from 'react-native';

import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
  useAudioPlayer,
} from 'expo-audio';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

import { globalStyles as styles } from './src/styles/globalStyles';

interface Spell {
  id: string;
  uri: string;
  name: string;
}

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Grabadora y su estado
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  
  // Reproductor
  const player = useAudioPlayer('');
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Configuración
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Si el hechizo deseas activar, tus permisos de audio deberás otorgar.');
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
      
      await loadGrimorio();
    })();

    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1, false
    );
  }, []);

  const cloverAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const loadGrimorio = async () => {
    try {
      const saved = await AsyncStorage.getItem('@grimorio_spells');
      if (saved) setSpells(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    } finally {
      setIsAppLoading(false);
    }
  };

  const saveToGrimorio = async (newSpells: Spell[]) => {
    await AsyncStorage.setItem('@grimorio_spells', JSON.stringify(newSpells));
  };

  const handleRecordPress = async () => {
    if (recorderState.isRecording) {
      await audioRecorder.stop();
      const newSpell: Spell = {
        id: Date.now().toString(),
        uri: audioRecorder.uri || '',
        name: `Hechizo num ${spells.length + 1}`
      };
      const updated = [...spells, newSpell];
      setSpells(updated);
      await saveToGrimorio(updated);
    } else {
      try {
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const playSpell = (uri: string) => {
    player.replace(uri);
    player.play();
  };

  const deleteSpell = async (id: string) => {
    const updated = spells.filter(s => s.id !== id);
    setSpells(updated);
    await saveToGrimorio(updated);
  };

  if (isAppLoading) {
    return (
      <View style={styles.center}>
        <Animated.View style={cloverAnimatedStyle}>
          <Text style={{fontSize: 60}}>🍀</Text>
        </Animated.View>
        <Text style={styles.loadingText}>Cargando todos los hechizos posibles...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Grimorio de Asta, El libro del guerrero antimágico</Text>

      <View style={styles.recorderSection}>
        <TouchableOpacity 
          style={[styles.mainButton, recorderState.isRecording && styles.recordingActive]} 
          onPress={handleRecordPress}
        >
          <Text style={styles.btnText}>
            {recorderState.isRecording ? "STOP" : "GRABAR"}
          </Text>
        </TouchableOpacity>
        {recorderState.isRecording && (
          <Text style={styles.statusText}>¡DETEN EL HECHIZO!</Text>
        )}
      </View>

      <FlatList
        data={spells}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.spellItem}>
            <Text style={styles.spellText}>{item.name}</Text>
            <View style={styles.itemActions}>
              <TouchableOpacity onPress={() => playSpell(item.uri)} style={styles.actionIcon}>
                <Text style={{fontSize: 20}}>⚔️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteSpell(item.id)} style={styles.actionIcon}>
                <Text style={{fontSize: 20}}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.clearBtn} 
        onPress={async () => { setSpells([]); await AsyncStorage.clear(); }}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>VACIAR GRIMORIO</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

