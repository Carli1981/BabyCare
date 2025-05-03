import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { styles } from '../../src/styles/setupStyles';

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
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué altura tenía tu bebé al nacer?</Text>
      <TextInput
        value={altura}
        onChangeText={setAltura}
        placeholder="Altura en cm"
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Siguiente" onPress={handleNext} color="#007AFF" />
      </View>
    </View>
  );
}