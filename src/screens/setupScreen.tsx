// src/screens/setup/FinalScreen.tsx

import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { saveBabyData } from '../../src/services/babyService';
import { View, Text, Button } from 'react-native';
import { auth } from '../../src/config/firebase';
import { styles } from '../../src/styles/setupStyles';

export default function FinalScreen() {
  const { babyData, resetBabyData } = useBabyContext();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      if (babyData.name && babyData.birthdate) {
        // Guardamos los datos del bebé en Firestore
        await saveBabyData(userId, babyData);
        
        resetBabyData(); // Limpiamos los datos del contexto
        router.replace('/home'); // Navegamos a la página de inicio
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>¡Todo listo! ¿Guardar los datos de tu bebé?</Text>
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}
