import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const LogoTitle: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/LOGO_DONOR.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>My-donor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32, // jarak dari header ke logo
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginRight: 12, // jarak antara logo dan teks
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 36,
    color: '#000',
  },
});

export default LogoTitle;
