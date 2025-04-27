// app/setup/nacimiento.tsx
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function NacimientoScreen() {
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>(undefined);
  const [manualDate, setManualDate] = useState('');
  const router = useRouter();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || fechaNacimiento;
    if (Platform.OS !== 'web') {
      setFechaNacimiento(currentDate);
    } else if (currentDate) {
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      setManualDate(`${day}-${month}-${year}`); // DD-MM-YYYY
    }
  };

  const handleNext = () => {
    if (fechaNacimiento || manualDate) {
      router.push('/setup/genero');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona la fecha de nacimiento de tu bebé</Text>

      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={manualDate}
          onChangeText={setManualDate}
          placeholder="Fecha de nacimiento (DD-MM-YYYY)"
          keyboardType="numeric"
        />
      ) : (
        <DateTimePicker
          value={fechaNacimiento || new Date()}
          mode="date"
          display="default" // Mostrar calendario bonito normal
          onChange={handleDateChange}
          maximumDate={new Date()} // No permitir fechas futuras
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Siguiente"
          onPress={handleNext}
          disabled={Platform.OS === 'web' ? manualDate.length === 0 : !fechaNacimiento}
          color={(Platform.OS === 'web' ? manualDate.length > 0 : fechaNacimiento) ? "#007AFF" : "gray"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start', alignItems: 'center' },
  title: { fontSize: 20, marginVertical: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginVertical: 20, width: '80%', textAlign: 'center' },
  buttonContainer: { marginTop: 40, width: '60%' },
});
