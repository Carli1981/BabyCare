import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useBabyContext } from '../../src/context/BabyContext';  
import { useRouter } from 'expo-router'; // Asegúrate de importar esto si estás usando expo-router
import { styles } from '../../src/styles/setupStyles';

export default function NombreScreen() {
  const { babyData, updateBabyData } = useBabyContext();
  const [name, setName] = useState(babyData.name || ''); 
  const router = useRouter(); // Aquí estamos usando `useRouter` correctamente

  const handleSave = () => {
    updateBabyData({ ...babyData, name });
    router.push('/setup/nacimiento'); // Esto te redirige al siguiente paso
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cómo se llama tu bebé?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del bebé"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Siguiente" onPress={handleSave} color="#007AFF" />
      </View>
    </View>
  );
}