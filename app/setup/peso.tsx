import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { styles } from '../../src/styles/setupStyles';

export default function PesoScreen() {
  const { updateBabyData } = useBabyContext();
  const [pesoKg, setPesoKg] = useState('');
  const [pesoGr, setPesoGr] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (pesoKg.trim() && pesoGr.trim()) {
      updateBabyData({ weightKg: parseInt(pesoKg), weightG: parseInt(pesoGr) });
      router.push('/setup/altura');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuánto pesó tu bebé al nacer?</Text>

      <TextInput
        value={pesoKg}
        onChangeText={setPesoKg}
        placeholder="Peso en kilogramos (kg)"
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        value={pesoGr}
        onChangeText={setPesoGr}
        placeholder="Peso en gramos (g)"
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="Siguiente" 
          onPress={handleNext}
          color="#007AFF" // Azul bonito
        />
      </View>
    </View>
  );
}