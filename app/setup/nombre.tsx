import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';

export default function NombreScreen() {
  const { updateBabyData } = useBabyContext();
  const [name, setName] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (name.trim()) {
      updateBabyData({ name });
      router.push('/setup/nacimiento');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>¿Cómo se llama tu bebé?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del bebé"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Button title="Siguiente" onPress={handleNext} />
    </View>
  );
}