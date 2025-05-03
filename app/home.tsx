import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { getBabyData } from '../src/services/babyService';
import { auth } from '../src/config/firebase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [babyInfo, setBabyInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBabyData = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const babyData = await getBabyData(userId);
        setBabyInfo(babyData);
      }
    };
    fetchBabyData();
  }, []);

  const goToProfile = () => {
    router.push('/perfil');
  };

  return (
    <ImageBackground
      source={require('../assets/FondoHome.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {babyInfo && (
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={goToProfile} style={{ alignItems: 'center' }}>
              <Image
                source={
                  babyInfo.photoUri
                    ? { uri: babyInfo.photoUri }
                    : require('../assets/baby-icon.png')
                }
                style={styles.profileImage}
              />
              <Text style={styles.profileText}>Ver perfil</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileText: {
    color: '#007AFF',
    fontSize: 12,
    marginTop: 4,
  },
});
