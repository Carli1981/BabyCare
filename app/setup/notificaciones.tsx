import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

export default function NotificacionesScreen() {
  const router = useRouter();

  // Función para solicitar permisos para las notificaciones
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso de notificación no concedido');
    } else {
      alert('Permiso concedido para las notificaciones');
    }
  };

  // Llamar a la función para solicitar el permiso de notificación al montar el componente
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¿Permitir notificaciones?</Text>
      <Button title="Permitir" onPress={() => router.push('/home')} />
    </View>
  );
}
