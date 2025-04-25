import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useBabyContext } from '../../src/context/BabyContext';
import { useRouter } from 'expo-router';

export default function FotoScreen() {
  const { updateBabyData } = useBabyContext();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('¡Permiso denegado para acceder a la galería!');
      }
    };
    getPermission();
  }, []);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: Platform.OS !== 'web', // En web puede fallar
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = Platform.OS === 'web' ? result.assets?.[0]?.uri : result.assets?.[0]?.uri;
        if (uri) {
          setImage(uri);
          updateBabyData({ photoUri: uri });
        }
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleNext = () => {
    router.push('/setup/alimentacion');
  };

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text>¿Quieres añadir una foto de tu bebé?</Text>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 10, borderRadius: 10 }} />
      )}

      <Button title="Seleccionar foto" onPress={handlePickImage} />

      <View style={{ marginVertical: 10 }}>
        <Button title="Siguiente sin foto" onPress={handleNext} color="gray" />
      </View>

      {image && (
        <Button title="Continuar con esta foto" onPress={handleNext} />
      )}
    </View>
  );
}
