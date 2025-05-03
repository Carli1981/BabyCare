import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  texto: string;
  onPress: () => void;
};

const OpcionBoton: React.FC<Props> = ({ texto, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionButton} onPress={onPress}>
      <Text style={styles.optionText}>{texto}</Text>
    </TouchableOpacity>
  );
};

export default OpcionBoton;

const styles = StyleSheet.create({
  optionButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});
