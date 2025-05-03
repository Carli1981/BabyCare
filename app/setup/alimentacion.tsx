import { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { styles } from '../../src/styles/setupStyles';

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
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué tipo de alimentación está recibiendo tu bebé?</Text>

      {['Lactancia', 'Biberón', 'Mixta'].map((tipo) => (
        <TouchableOpacity
          key={tipo}
          style={[
            styles.optionButton,
            alimentacion === tipo && styles.selectedOption,
          ]}
          onPress={() => setAlimentacion(tipo)}
        >
          <Text style={styles.optionText}>{tipo}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Siguiente" onPress={handleNext} color="#007AFF" />
      </View>
    </View>
  );
}
