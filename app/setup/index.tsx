import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../../src/styles/setupStyles';

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