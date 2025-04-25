import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';

export default function PrematuroScreen() {
  const { updateBabyData } = useBabyContext();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>¿El parto fue prematuro?</Text>
      <Button title="Sí" onPress={() => { updateBabyData({ isPremature: true }); router.push('/setup/peso'); }} />
      <Button title="No" onPress={() => { updateBabyData({ isPremature: false }); router.push('/setup/peso'); }} />
    </View>
  );
}