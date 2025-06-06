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
  
      console.log("UID del usuario:", userId);
      console.log("Datos del bebé:", babyData);
  
      if (!userId) throw new Error('Usuario no autenticado');
  
      if (babyData.name && babyData.birthdate) {
        await saveBabyData(userId, babyData);
        resetBabyData();
        router.replace('/home'); // asegúrate que /home existe
      } else {
        console.log("Faltan datos del bebé");
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Todo listo! ¿Guardar los datos de tu bebé?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} color="#007AFF" />
      </View>
    </View>
  );
}
