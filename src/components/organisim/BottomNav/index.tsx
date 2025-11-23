// src/components/organisim/BottomNav/index.tsx
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Import SVGs (pastikan path benar)
import CekstokLogo from '../../../assets/CekstokLogo.svg';
import HomeLogo from '../../../assets/HomeLogo.svg';
import ContactPmi from '../../../assets/ContactPmi.svg';

const BottomNav: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('CekStokDarah0')}>
        <CekstokLogo width={52} height={52} />
        <Text style={styles.label}>Chek stok Darah</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, styles.centerItem]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Home')}>
        <HomeLogo width={52} height={52} />
        <Text style={[styles.label, styles.centerLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ContactPMI')} // ganti nama route jika berbeda
      >
        <ContactPmi width={48} height={48} />
        <Text style={styles.label}>Contact PMI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    // shadow
    shadowColor: '#1b0000ff',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 12,

    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerItem: {
    marginTop: -4,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#111',
    marginTop: 6,
    textAlign: 'center',
  },
  centerLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
  },
});
