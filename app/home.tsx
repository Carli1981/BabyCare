import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getBabyData } from '../src/services/babyService';

export default function HomeScreen() {
  const [babyData, setBabyData] = useState<any>(null);

  useEffect(() => {
    const fetchBabyData = async () => {
      const userId = "user123";  // Aquí deberías obtener el userId actual
      const data = await getBabyData(userId);
      setBabyData(data);
    };

    fetchBabyData();
  }, []);

  if (!babyData) return <Text>Cargando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre del bebé: {babyData.name}</Text>
      <Text>Fecha de nacimiento: {babyData.birthdate.toDate().toLocaleDateString()}</Text>
      <Text>Género: {babyData.gender}</Text>
      <Text>¿Parto prematuro?: {babyData.isPremature ? 'Sí' : 'No'}</Text>
      <Text>Peso: {babyData.weightKg} kg {babyData.weightG} g</Text>
      <Text>Altura: {babyData.heightCm} cm</Text>
      <Text>Tipo de alimentación: {babyData.feedingType}</Text>
      {babyData.photoUri && <Text>Foto del bebé: {babyData.photoUri}</Text>}
    </View>
  );
}
