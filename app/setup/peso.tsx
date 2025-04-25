import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';

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
    <View style={{ padding: 20 }}>
      <Text>¿Cuánto pesó tu bebé al nacer?</Text>
      <TextInput
        value={pesoKg}
        onChangeText={setPesoKg}
        placeholder="Peso en kg"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        keyboardType="numeric"
      />
      <TextInput
        value={pesoGr}
        onChangeText={setPesoGr}
        placeholder="Peso en gramos"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        keyboardType="numeric"
      />
      <Button title="Siguiente" onPress={handleNext} />
    </View>
  );
}
