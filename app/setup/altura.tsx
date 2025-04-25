import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';

export default function AlturaScreen() {
  const { updateBabyData } = useBabyContext();
  const [altura, setAltura] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (altura.trim()) {
      updateBabyData({ heightCm: parseInt(altura) });
      router.push('/setup/foto');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>¿Qué altura tenía tu bebé al nacer?</Text>
      <TextInput
        value={altura}
        onChangeText={setAltura}
        placeholder="Altura en cm"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
        keyboardType="numeric"
      />
      <Button title="Siguiente" onPress={handleNext} />
    </View>
  );
}
