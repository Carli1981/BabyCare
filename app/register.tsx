import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { registerUser } from '../src/services/authService';
import { useRouter } from 'expo-router';
import { getBabyData } from '../src/services/babyService';  // Correcto
import { auth } from '../src/config/firebase';  // Correcto

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setError('');

    // Validaciones simples
    if (!email.includes('@') || !email.includes('.')) {
      setError('El email no es válido');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Registrar usuario
      await registerUser(email, password);
      
      // Obtener el ID del usuario
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setError("No se pudo obtener el ID del usuario.");
        return;
      }

      // Verificar si el usuario tiene datos del bebé
      const babyData = await getBabyData(userId);

      // Redirigir según si el usuario tiene o no datos del bebé
      if (babyData) {
        router.replace('/home'); // Si tiene datos del bebé, redirigir a home
      } else {
        router.replace('/setup'); // Si no tiene datos, redirigir a setup
      }
      
    } catch (e: any) {
      setError(e.message); // Mostrar error
      console.error('Error al registrar usuario:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});