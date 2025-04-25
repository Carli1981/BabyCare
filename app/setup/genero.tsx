import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';

export default function GeneroScreen() {
  const { updateBabyData } = useBabyContext();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>¿Cuál es el género del bebé?</Text>
      <Button title="Niño" onPress={() => { updateBabyData({ gender: 'niño' }); router.push('/setup/prematuro'); }} />
      <Button title="Niña" onPress={() => { updateBabyData({ gender: 'niña' }); router.push('/setup/prematuro'); }} />
      <Button title="Otro" onPress={() => { updateBabyData({ gender: 'otro' }); router.push('/setup/prematuro'); }} />
    </View>
  );
}