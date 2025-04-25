import { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';

export default function AlimentacionScreen() {
  const { updateBabyData } = useBabyContext();
  const [alimentacion, setAlimentacion] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (alimentacion.trim()) {
      updateBabyData({ feedingType: alimentacion });
      router.push('/setup/notificaciones');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>¿Qué tipo de alimentación está recibiendo tu bebé?</Text>
      <Button title="Lactancia" onPress={() => setAlimentacion('Lactancia')} />
      <Button title="Biberón" onPress={() => setAlimentacion('Biberón')} />
      <Button title="Mixta" onPress={() => setAlimentacion('Mixta')} />
      <Button title="Siguiente" onPress={handleNext} />
    </View>
  );
}
