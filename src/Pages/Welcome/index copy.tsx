// ShareLocationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import Background2 from '../../assets/Background2.svg';

const { width, height } = Dimensions.get('window');

export default function ShareLocationScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* BAGIAN ATAS: Gambar SVG */}
      <View style={styles.topSection}>
        <Background2
          width={width}
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={styles.bgImage}
        />
      </View>

      {/* BAGIAN BAWAH: Card Putih */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Shar Location</Text>
        <Text style={styles.subtitle}>
          We use your location to known the places{'\n'}
          where the blood
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topSection: {
    flex: 1.3,              // atur tinggi gambar
    backgroundColor: '#fff',
  },

  bgImage: {
    width: '100%',
    height: '100%',
  },

  bottomSection: {
    flex: 0.7,              // atur tinggi bagian putih
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
