import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';

// Import SVGs
import CekstokLogo from '../../../assets/CekstokLogo.svg';
import HomeLogo from '../../../assets/HomeLogo.svg';
import ContactPmi from '../../../assets/ContactPmi.svg';

const BottomNav: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} activeOpacity={0.7}>
        <CekstokLogo width={52} height={52} />
        <Text style={styles.label}>Chek stok Darah</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, styles.centerItem]}
        activeOpacity={0.7}>
        <HomeLogo width={52} height={52} />
        <Text style={[styles.label, styles.centerLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} activeOpacity={0.7}>
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

    // === 💥 STRONG BOX SHADOW ===
    // iOS shadow (lebih “jatuh” dan blur)
    shadowColor: '#1b0000ff',
    shadowOffset: {width: 0, height: -104}, // arah bayangan ke atas
    shadowOpacity: 0.25, // lebih kuat
    shadowRadius: 20, // radius besar = blur lembut

    // Android shadow
    elevation: 50, // makin tinggi makin terlihat bayangannya

    // Tambahan efek “mengambang” biar mirip box shadow CSS
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerItem: {
    marginTop: -4, // tetap sedikit naik
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
