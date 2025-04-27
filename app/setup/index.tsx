// app/setup/index.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function HaNacidoScreen() {
  const handleYes = () => router.push('/setup/nombre');
  const handleNo = () => router.replace('/home');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Ha nacido el bebé?</Text>

      <View style={styles.buttonContainer}>
        <Button title="Sí" onPress={handleYes} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="No" onPress={handleNo} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 30 },
  buttonContainer: { marginVertical: 10, width: '60%' },
});
