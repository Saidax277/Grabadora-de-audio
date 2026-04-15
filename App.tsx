import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
  useAudioPlayer,
} from 'expo-audio';
import { globalStyles as styles } from './src/styles/globalStyles';
import { storageService } from './src/services/storageService';
import { CloverLoader } from './src/components/CloverLoader';

interface Spell {
  id: string;
  uri: string;
  name: string;
}

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const player = useAudioPlayer('');

  useEffect(() => {
    (async () => {
      //Solicitar permisos
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Grimorio bloqueado', 'Se requieren permisos de audio.');
      }

      await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      
      //Recuperar audios antiguos
      const saved = await storageService.getData<Spell[]>('@grimorio_spells');
      if (saved) setSpells(saved);
      setIsAppLoading(false);
    })();
  }, []);

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
      //Uso del servicio genérico 
      await storageService.saveData('@grimorio_spells', updated);
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
    await storageService.saveData('@grimorio_spells', updated);
  };

  //Carga inicial 
  if (isAppLoading) {
    return (
      <View style={styles.center}>
        <CloverLoader message="Invocando grimorio..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Grimorio de la magia de voz</Text>

      <View style={styles.recorderSection}>
        <TouchableOpacity 
          style={[styles.mainButton, recorderState.isRecording && styles.recordingActive]} 
          onPress={handleRecordPress}
        >
          <Text style={styles.btnText}>
            {recorderState.isRecording ? "STOP" : "GRABAR"}
          </Text>
        </TouchableOpacity>
        
        {/*  Carga/Animación durante la grabación  */}
        
        {recorderState.isRecording && (
          <CloverLoader message="¡TU HECHIZO ESTÁ SIENDO INVOCADO!" />
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
                <Text style={{fontSize: 20}}>▶️</Text>
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
        onPress={async () => { setSpells([]); await storageService.clear('@grimorio_spells'); }}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>ELIMINAR HECHIZOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

