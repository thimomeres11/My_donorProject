// ShareLocationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Background2 from '../../assets/Background2.svg'; // ganti path jika perlu

const { width, height } = Dimensions.get('window');

export default function ShareLocationScreen({ navigation }: any) {
  const onPressLanjut = () => {
    navigation.navigate('WelcomeStartet');
  };

  return (
    <View style={styles.container}>
      {/* Top: SVG background - full width */}
      <View style={styles.top}>
        <Background2
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      {/* Bottom: plain white area (tidak lagi dibungkus di card) */}
      <View style={styles.bottom}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Shar Location</Text>
          <Text style={styles.subtitle}>
            We use your location to known the places{'\n'}where the blood
          </Text>
        </View>

        {/* tombol lanjut di kanan bawah area putih */}
        <TouchableOpacity onPress={onPressLanjut} style={styles.lanjutTouch}>
          <Text style={styles.lanjutText}>Lanjut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#efefef', // layar belakang
  },
  top: {
    flex: 8, // sesuaikan proporsi atas
    width: '100%',
    overflow: 'hidden',
  },
  bottom: {
    flex: 4, // proporsi area putih bawah
    width: '100%',
    backgroundColor: '#ffffff', // area putih tanpa border radius
    justifyContent: 'center', // teks di tengah vertikal
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  textWrap: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 34,
    color: '#111',
    // pakai nama font yang sudah kamu register
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      default: 'Poppins-Bold',
    }),
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
      default: 'Poppins-Regular',
    }),
  },
  lanjutTouch: {
    position: 'absolute',
    right: 20,
    bottom: 12,
    padding: 4,
  },
  lanjutText: {
    fontSize: 12,
    fontFamily: Platform.select({
      ios: 'Poppins-BoldItalic',
      android: 'Poppins-BoldItalic',
      default: 'Poppins-BoldItalic',
    }),
    color: '#d63b45',
    textDecorationLine: 'underline',
  },
});
