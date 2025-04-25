import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { saveBabyData } from '../../src/services/babyService'; // Corregir la ruta aquí

export default function FinalScreen() {
  const { babyData, resetBabyData } = useBabyContext();
  const router = useRouter();

  const handleSave = async () => {
    try {
      if (babyData.name && babyData.birthdate) {
        // Asumiendo que babyData tiene un babyId, si no, puedes generar uno
        const babyId = 'some-unique-id'; 
        await saveBabyData(babyId, babyData); 
        resetBabyData(); // Limpiar datos del contexto
        router.push('/home'); // Redirigir a la página principal
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
