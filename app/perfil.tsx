import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getBabyData, updateBabyData as updateBabyInFirestore } from '../src/services/babyService';
import { auth } from '../src/config/firebase';
import { styles } from '../src/styles/setupStyles';

export default function PerfilScreen() {
  const [babyData, setBabyData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await getBabyData(userId);
        setBabyData(data || {});
        setImage(data?.photoUri || null);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (field: string, value: string | number | boolean) => {
    setBabyData({ ...babyData, [field]: value });
  };

  const handleSave = async () => {
    if (userId) {
      await updateBabyInFirestore(userId, babyData);
      alert('Datos actualizados correctamente.');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: Platform.OS !== 'web',
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      if (uri) {
        setImage(uri);
        handleChange('photoUri', uri);
      }
    }
  };

  if (loading) return <Text style={{ marginTop: 50, textAlign: 'center' }}>Cargando perfil...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil del bebé</Text>

      {/* Nombre */}
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={babyData.name || ''}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Nombre"
      />

      {/* Fecha de nacimiento */}
      <Text>Fecha de nacimiento (DD-MM-YYYY):</Text>
      <TextInput
        style={styles.input}
        value={babyData.birthdate || ''}
        onChangeText={(text) => handleChange('birthdate', text)}
        placeholder="DD-MM-YYYY"
      />

      {/* Género */}
      <Text>Género:</Text>
      <TextInput
        style={styles.input}
        value={babyData.gender || ''}
        onChangeText={(text) => handleChange('gender', text)}
        placeholder="Masculino/Femenino"
      />

      {/* Prematuro */}
      <Text>¿Fue prematuro?</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => handleChange('premature', true)}
          style={[
            styles.optionButton,
            babyData.premature === true && styles.selectedOption,
          ]}
        >
          <Text style={styles.optionText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChange('premature', false)}
          style={[
            styles.optionButton,
            babyData.premature === false && styles.selectedOption,
          ]}
        >
          <Text style={styles.optionText}>No</Text>
        </TouchableOpacity>
      </View>

      {/* Peso */}
      <Text>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        value={babyData.weightKg?.toString() || ''}
        onChangeText={(text) => handleChange('weightKg', parseInt(text))}
        keyboardType="numeric"
        placeholder="Kg"
      />
      <Text>Peso (g):</Text>
      <TextInput
        style={styles.input}
        value={babyData.weightG?.toString() || ''}
        onChangeText={(text) => handleChange('weightG', parseInt(text))}
        keyboardType="numeric"
        placeholder="g"
      />

      {/* Altura */}
      <Text>Altura (cm):</Text>
      <TextInput
        style={styles.input}
        value={babyData.heightCm?.toString() || ''}
        onChangeText={(text) => handleChange('heightCm', parseInt(text))}
        keyboardType="numeric"
        placeholder="cm"
      />

      {/* Alimentación */}
      <Text>Alimentación:</Text>
      {['Lactancia', 'Biberón', 'Mixta'].map((tipo) => (
        <TouchableOpacity
          key={tipo}
          style={[
            styles.optionButton,
            babyData.feedingType === tipo && styles.selectedOption,
          ]}
          onPress={() => handleChange('feedingType', tipo)}
        >
          <Text style={styles.optionText}>{tipo}</Text>
        </TouchableOpacity>
      ))}

      {/* Foto */}
      <Text style={{ marginTop: 20 }}>Foto del bebé:</Text>
      {image ? (
        <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 10, marginVertical: 10 }} />
      ) : (
        <Text style={{ fontStyle: 'italic', color: 'gray' }}>No se ha seleccionado ninguna foto.</Text>
      )}
      <Button title="Cambiar foto" onPress={handlePickImage} />

      {/* Botón Guardar */}
      <View style={styles.buttonContainer}>
        <Button title="Guardar cambios" onPress={handleSave} color="#007AFF" />
      </View>
    </ScrollView>
  );
}