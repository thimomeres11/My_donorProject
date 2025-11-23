// src/components/molecules/MenuGrid/index.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  onPressCekStok?: () => void;
};

const MenuGrid: React.FC<Props> = ({onPressCekStok}) => {
  return (
    <View style={styles.grid}>
      {/* Tombol Cek stok Darah (pindahkan navigasi ke sini melalui prop) */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={onPressCekStok}>
        <Text style={styles.cardText}>Cek stok Darah</Text>
      </TouchableOpacity>

      {/* Item lain tetap seperti semula */}
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <Text style={styles.cardText}>Donor Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <Text style={styles.cardText}>Request</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <Text style={styles.cardText}>Lokasi Donor darah</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '46%',
    aspectRatio: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
