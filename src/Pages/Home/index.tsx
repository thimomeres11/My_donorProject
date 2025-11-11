// src/pages/Home/index.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Text,
} from 'react-native';

import BottomNav from '../../components/organisim/BottomNav';
import HeaderWelcome from '../../components/molecules/HeaderWelcome';
import BannerCarousel from '../../components/molecules/BannerCarousel';
import MenuGrid from '../../components/molecules/MenuGrid';
import {Gap} from '../../components/atoms';

const {width: SW, height: SH} = Dimensions.get('window');

/**
 * Tweak values below if still belum pas:
 * - BOTTOM_NAV_HEIGHT: tinggi bottom nav (sesuaikan jika berbeda)
 * - SAFE_BOTTOM_GAP: jarak aman
 * - EXTRA_FILL: nilai utama — naikkan untuk membuat card lebih panjang ke bawah
 */
const BOTTOM_NAV_HEIGHT = Platform.OS === 'ios' ? 90 : 84;
const SAFE_BOTTOM_GAP = 12;

// === NAIKKAN INI JIKA MASIH BELUM SAMPAI ===
const EXTRA_FILL = 220; // <--- saya naikkan cukup besar supaya kartu turun lebih jauh
// ===========================================================================

const BOTTOM_SPACER = BOTTOM_NAV_HEIGHT + SAFE_BOTTOM_GAP;

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* WHITE CARD */}
          <View style={styles.whiteCard}>
            <View style={styles.whiteCardInner}>
              <Gap height={46} />
              <HeaderWelcome />

              <Text style={styles.desc}>
                My-Donor membantu Anda menemukan jadwal, lokasi, dan informasi
                seputar donor darah dengan mudah
              </Text>

              <Gap height={24} />
              <BannerCarousel />

              <Gap height={39} />
              <MenuGrid />
              <Gap height={12} />
            </View>
          </View>

          {/* spacer besar supaya bottom nav tidak menutupi */}
          <View style={{height: BOTTOM_SPACER}} />
        </ScrollView>

        {/* Bottom Navigation (posisi tetap di bawah) */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#f2f2f2'},
  root: {flex: 1},

  // biarkan ScrollView mengembang agar child dengan minHeight bisa bekerja
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },

  // agar kartu turun: minHeight = layar - bottomNav + EXTRA_FILL
  whiteCard: {
    minHeight: SH - (BOTTOM_NAV_HEIGHT + SAFE_BOTTOM_GAP) + EXTRA_FILL,
    marginHorizontal: 0,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 0,
    backgroundColor: '#fff',
    marginVertical: 8,

    // lebih banyak paddingBottom sehingga isi tidak menempel
    paddingBottom: 36 + SAFE_BOTTOM_GAP,

    // shadow / elevation
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  whiteCardInner: {
    backgroundColor: 'transparent',
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  desc: {
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#E53935',
    lineHeight: 20,
  },
});
