import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { styles } from '../../src/styles/setupStyles';

export default function NacimientoScreen() {
  const { babyData, updateBabyData } = useBabyContext();
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(babyData.birthdate || null);
  const [showPicker, setShowPicker] = useState(false);

  // Para web: input manual
  const [manualDate, setManualDate] = useState(
    babyData.birthdate
      ? formatDateInput(formatDateToDDMMYYYY(babyData.birthdate))
      : ''
  );

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      updateBabyData({ birthdate: selectedDate });
    }
  };

  const handleShowPicker = () => setShowPicker(true);

  const handleNext = () => {
    if (Platform.OS === 'web') {
      const parts = manualDate.split('-');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const parsed = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsed.getTime())) {
          updateBabyData({ birthdate: parsed });
          router.push('/setup/genero');
          return;
        }
      }
      alert('Fecha inválida. Usa el formato DD-MM-YYYY');
    } else if (date) {
      router.push('/setup/genero');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona la fecha de nacimiento de tu bebé</Text>
      
      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          placeholder="DD-MM-YYYY"
          value={manualDate}
          onChangeText={(text) => setManualDate(formatDateInput(text))}
          keyboardType="numeric"
          maxLength={10}
        />
      ) : (
        <>
          <Button title="Seleccionar fecha" onPress={handleShowPicker} />
          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
          {date && (
            <Text style={{ marginVertical: 10 }}>
              Fecha seleccionada: {date.toLocaleDateString()}
            </Text>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Siguiente" onPress={handleNext} color="#007AFF" />
      </View>
    </View>
  );
}

// Utilidades para web
const formatDateInput = (text: string) => {
  const numbersOnly = text.replace(/\D/g, '');
  let result = '';

  if (numbersOnly.length <= 2) {
    result = numbersOnly;
  } else if (numbersOnly.length <= 4) {
    result = `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2)}`;
  } else if (numbersOnly.length <= 8) {
    result = `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 4)}-${numbersOnly.slice(4)}`;
  } else {
    result = `${numbersOnly.slice(0, 2)}-${numbersOnly.slice(2, 4)}-${numbersOnly.slice(4, 8)}`;
  }

  return result;
};

const formatDateToDDMMYYYY = (date: Date): string => {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};