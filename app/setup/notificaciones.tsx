import React from 'react';
import { View, Text, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { styles } from '../../src/styles/setupStyles';
import { useBabyContext } from '../../src/context/BabyContext';
import { auth } from '../../src/config/firebase';
import { saveBabyData } from '../../src/services/babyService';
import OpcionBoton from '../../src/components/OpcionBoton';

export default function NotificacionesScreen() {
  const router = useRouter();
  const { babyData } = useBabyContext();

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("Usuario no autenticado.");
      return;
    }

    try {
      await saveBabyData(userId, babyData);
      router.replace('/home');
    } catch (error) {
      console.error("Error al guardar datos del bebé:", error);
      alert("Hubo un error al guardar los datos del bebé.");
    }
  };

  const handleAllowNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      Alert.alert("Notificaciones activadas");
    } else {
      Alert.alert("Permiso de notificaciones denegado");
    }
    handleSave();
  };

  const handleDenyNotifications = () => {
    handleSave(); // Puedes guardar sin activar notificaciones
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Deseas recibir notificaciones?</Text>
      <OpcionBoton texto="Sí" onPress={handleAllowNotifications} />
      <OpcionBoton texto="No" onPress={handleDenyNotifications} />
    </View>
  );
}
