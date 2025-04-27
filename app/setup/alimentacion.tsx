import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.question}>¿Qué tipo de alimentación está recibiendo tu bebé?</Text>

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

      <View style={{ marginTop: 20 }}>
        <Button title="Siguiente" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { fontSize: 16, marginBottom: 20 },
  optionButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
