import React, { useState } from 'react';
import { View, Text, Button, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Para móvil
import { useRouter } from 'expo-router';

export default function NacimientoScreen() {
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [manualDate, setManualDate] = useState('');
  const router = useRouter();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowDatePicker(Platform.OS !== 'web');  // Mostrar el DateTimePicker solo en móvil
    setFechaNacimiento(currentDate);
    if (Platform.OS === 'web' && currentDate) {
      // Si estamos en la web, convertimos la fecha seleccionada a un formato de texto
      setManualDate(currentDate.toISOString().split('T')[0]); // Formato "YYYY-MM-DD"
    }
  };

  const handleNext = () => {
    if (fechaNacimiento || manualDate) {
      router.push('/setup/genero'); // Cambiar ruta según la secuencia de tu aplicación
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Selecciona la fecha de nacimiento de tu bebé</Text>

      {Platform.OS === 'web' ? (
        // En la web, se usa un campo de texto para ingresar la fecha manualmente
        <TextInput
          style={{ borderBottomWidth: 1, marginVertical: 10 }}
          value={manualDate}
          onChangeText={setManualDate}
          placeholder="Fecha de nacimiento (YYYY-MM-DD)"
          keyboardType="numeric"
        />
      ) : (
        // En móvil, mostramos el DateTimePicker
        <>
          {showDatePicker && (
            <DateTimePicker
              value={fechaNacimiento || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
        </>
      )}

      <Button title="Siguiente" onPress={handleNext} disabled={!fechaNacimiento && !manualDate} />
    </View>
  );
}
