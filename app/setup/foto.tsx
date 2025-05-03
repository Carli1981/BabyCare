import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useBabyContext } from '../../src/context/BabyContext';
import { useRouter } from 'expo-router';
import { styles } from '../../src/styles/setupStyles';

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
        allowsEditing: Platform.OS !== 'web', 
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
    <View style={styles.container}>
      <Text style={styles.title}>¿Quieres añadir una foto de tu bebé?</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.photoImage} />
      )}

      <Button title="Seleccionar foto" onPress={handlePickImage} />

      <View style={styles.buttonContainer}>
        <Button title="Siguiente sin foto" onPress={handleNext} color="gray" />
      </View>

      {image && (
        <Button title="Continuar con esta foto" onPress={handleNext} />
      )}
    </View>
  );
}
