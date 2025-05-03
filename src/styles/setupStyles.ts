import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '60%',
  },
  optionButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Color sin seleccionar
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF', // Azul seleccionado
  },
  optionText: {
    fontSize: 16,
    color: '#000', // Texto sin seleccionar
  },
  selectedOptionText: {
    color: '#fff', // Texto cuando está seleccionado
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photoImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});
