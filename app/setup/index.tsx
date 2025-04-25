import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function HaNacidoScreen() {
  const handleYes = () => router.push('/setup/nombre');
  const handleNo = () => router.replace('/home');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¿Ha nacido el bebé?</Text>
      <Button title="Sí" onPress={handleYes} />
      <Button title="No" onPress={handleNo} />
    </View>
  );
}