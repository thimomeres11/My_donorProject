import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width: SW} = Dimensions.get('window');

// ukuran kotak sesuai permintaan
const CARD_W = 150;
const CARD_H = 90;
const H_GAP = 20; // jarak horizontal antar kotak (kamu bisa adjust)

const MENU_ITEMS = [
  {id: 1, title: 'Cek stok Darah'},
  {id: 2, title: 'Donor Schedule'},
  {id: 3, title: 'Request'},
  {id: 4, title: 'Lokasi Donor darah'},
];

const MenuGrid: React.FC = () => {
  return (
    <View style={styles.container}>
      {MENU_ITEMS.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={[
            styles.cardWrapper,
            // beri marginTop 30 untuk baris kedua
            index >= 2 && {marginTop: 30},
          ]}>
          <LinearGradient
            colors={['#FF4141', '#FF6D6D']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuGrid;

const styles = StyleSheet.create({
  container: {
    // two-column grid: use row wrap and space-between
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // gunakan padding yang sama seperti whiteCard (18) supaya align
    paddingHorizontal: 18,
    marginTop: 18,
  },
  cardWrapper: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 16,
    overflow: 'hidden',
    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#fff', // ini memungkinkan efek pinggiran putih bila diinginkan
  },
  card: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
});
