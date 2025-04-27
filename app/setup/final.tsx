import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { saveBabyData } from '../../src/services/babyService';
import { View, Text, Button } from 'react-native';
import { auth } from '../../src/config/firebase';

export default function FinalScreen() {
  const { babyData, resetBabyData } = useBabyContext();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('Usuario no autenticado');

      if (babyData.name && babyData.birthdate) {
        await saveBabyData(userId, babyData); 
        resetBabyData(); 
        router.replace('/home');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¡Todo listo! ¿Guardar los datos de tu bebé?</Text>
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}
