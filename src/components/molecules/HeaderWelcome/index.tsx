import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// svg components (pastikan react-native-svg-transformer sudah dikonfigurasi)
import ProfilLogo from '../../../assets/ProfilLogo.svg';
import BurgerMenu from '../../../assets/BurgerMenu.svg';

const HeaderWelcome = () => {
  return (
    <View style={styles.row}>
      {/* Icon profil kiri */}
      <TouchableOpacity activeOpacity={0.7} style={styles.left}>
        <ProfilLogo width={50} height={50} />
      </TouchableOpacity>

      {/* Teks tengah */}
      <View style={styles.center}>
        <Text style={styles.title}>HI Welcome !</Text>
      </View>

      {/* Icon menu kanan */}
      <TouchableOpacity activeOpacity={0.7} style={styles.right}>
        <BurgerMenu width={28} height={28} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWelcome;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 64,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  right: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#000',
    lineHeight: 36,
  },
});
