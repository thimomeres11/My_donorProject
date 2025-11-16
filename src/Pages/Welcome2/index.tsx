import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Background1 from '../../assets/BackgroundW.svg';
import LogoDonor from '../../assets/LOGO DONOR.svg';
import RedCross from '../../assets/PmiLogo.svg';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 5000); // 5 detik

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background SVG */}
      <Background1
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid slice"
        style={StyleSheet.absoluteFillObject}
      />

      {/* Logo atas (Palang Merah) */}
      <View style={styles.topLogoContainer}>
        <RedCross width={width * 0.45} height={width * 0.45} />
      </View>

      {/* Logo tengah (Tetes darah) */}
      <View style={styles.centerLogoContainer}>
        <LogoDonor width={width * 0.4} height={width * 0.4} />
      </View>

      {/* Teks bawah */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My-donor</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topLogoContainer: {
    position: 'absolute',
    top: height * 0.01, // posisi lebih tinggi agar sesuai figma
    alignItems: 'center',
  },
  centerLogoContainer: {
    position: 'absolute',
    bottom: height * 0.14, // posisi pas di atas teks My-donor
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#C53333',
    paddingVertical: height * 0.025,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Popper-Regular',
  },
});
