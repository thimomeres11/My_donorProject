// src/Pages/Welcome3/index.tsx
import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GetButtonStart from '../../components/organisim/GetstartedButton';
import GetStartedBg from '../../assets/Geststarted.svg';

const {width, height} = Dimensions.get('window');

export default function Welcome3() {
  const navigation: any = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* TOP AREA : SVG */}
      <View style={styles.top}>
        <GetStartedBg
          width={width}
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* TEXT DI PALING BAWAH AREA GAMBAR */}
        <View style={styles.bottomTextBox}>
          <Text style={styles.title}>My-donor</Text>
          <Text style={styles.subtitle}>
            One drop of your blood can mean a life{'\n'}
            for someone else.
          </Text>
        </View>
      </View>

      {/* BOTTOM AREA */}
      <View style={styles.bottom}>
        <GetButtonStart onPress={handleGetStarted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },

  top: {
    flex: 7,
    width: '100%',
    position: 'relative',
  },

  // TEXT PALING BAWAH GAMBAR
  bottomTextBox: {
    position: 'absolute',
    bottom: 35, // JARAK dari bawah gambar → sesuaikan sesuka kamu
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 36,
    color: '#111',
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
    }),
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: Platform.select({
      ios: 'Poppins-Regular',
      android: 'Poppins-Regular',
    }),
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },

  bottom: {
    flex: 3,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
