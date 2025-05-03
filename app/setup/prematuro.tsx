import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useBabyContext } from '../../src/context/BabyContext';
import { styles } from '../../src/styles/setupStyles';

export default function PrematuroScreen() {
  const { updateBabyData } = useBabyContext();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿El parto fue prematuro?</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Sí" 
          onPress={() => { 
            updateBabyData({ premature: true }); 
            router.push('/setup/peso'); 
          }} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="No" 
          onPress={() => { 
            updateBabyData({ premature: false }); 
            router.push('/setup/peso'); 
          }} 
        />
      </View>
    </View>
  );
}