// src/pages/CekStokDarah/index.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // install react-native-vector-icons jika belum
import BottomNav from '../../components/organisim/BottomNav';
import {Gap} from '../../components/atoms';

Dimensions.get('window');

const BOTTOM_NAV_HEIGHT = Platform.OS === 'ios' ? 90 : 84;
const SAFE_BOTTOM_GAP = 12;
const BOTTOM_SPACER = BOTTOM_NAV_HEIGHT + SAFE_BOTTOM_GAP;

type Hospital = {
  id: string;
  name: string;
  image: any; // require(...) or {uri: ''}
  bloodType: string;
  stock: number;
  isFavorite?: boolean;
};

const sampleData: Hospital[] = [
  {
    id: '1',
    name: 'Rumah Sakit Santosa',
    image: require('../../assets/RS.png'), // ganti path image sesuai project Anda
    bloodType: 'A +',
    stock: 4,
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Rumah Sakit AL Ihsan',
    image: require('../../assets/Rumah Sakit AL Ihsan.jpg'),
    bloodType: 'A +',
    stock: 8,
  },
  {
    id: '3',
    name: 'Rumah Sakit Mata Cicendo',
    image: require('../../assets/Rumah Sakit Mata Cicendo.jpg'),
    bloodType: 'A +',
    stock: 4,
  },
  {
    id: '4',
    name: 'Rumah Sakit Advent Bandung',
    image: require('../../assets/Rumah Sakit Advent Bandung.jpg'),
    bloodType: 'A -',
    stock: 2,
  },
];

const CekStokDarah: React.FC<any> = ({navigation}) => {
  const renderItem = ({item}: {item: Hospital}) => {
    return (
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          {/* Left: Thumbnail */}
          <Image source={item.image} style={styles.thumb} resizeMode="cover" />

          {/* Middle: Texts */}
          <View style={styles.cardContent}>
            <View style={styles.rowTop}>
              <Text style={styles.title} numberOfLines={2}>
                {item.name}
              </Text>

              {/* Heart icon */}
              <TouchableOpacity style={styles.heartBtn} activeOpacity={0.7}>
                <Ionicons
                  name={item.isFavorite ? 'heart' : 'heart-outline'}
                  size={18}
                  color={item.isFavorite ? '#E53935' : '#999'}
                />
              </TouchableOpacity>
            </View>

            {/* small icon row (misal lokasi) */}
            <View style={styles.iconRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.smallText}>Bandung, Jawa Barat</Text>
            </View>

            {/* Spacer */}
            <View style={styles.flexSpacer} />

            {/* Bottom: blood info */}
            <View style={styles.bloodRow}>
              <Text style={styles.bloodLabel}>Golongan Darah : </Text>
              <Text style={styles.bloodType}>{item.bloodType}</Text>
              <Text style={styles.stockText}> Stok Darah : </Text>
              <Text style={styles.stockCount}>{item.stock} / kantong</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.headerBar}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()} // <-- navigation.goBack() ditambahkan
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={22}
                    color="#E53935"
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bandung, Jawa Barat</Text>
                <View style={{width: 40}} />{' '}
                {/* placeholder agar center title */}
              </View>

              <View style={styles.searchBar}>
                {/* bisa diganti dengan input nanti */}
                <Text style={styles.searchText}>Sort | Filter</Text>
              </View>

              <Gap height={12} />

              {/* NOTE: container "Cek Stok Darah" DIHAPUS sesuai permintaan */}
              <Gap height={8} />
            </>
          }
          data={sampleData}
          renderItem={renderItem}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{height: 6}} />}
          ListFooterComponent={<View style={{height: BOTTOM_SPACER}} />}
        />

        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default CekStokDarah;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#f2f2f2'},
  root: {flex: 1},

  headerBar: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#E53935',
    fontSize: 16,
  },

  searchBar: {
    height: 48,
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchText: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },

  // White card area (atas) -- TIDAK DIHAPUS DARI STYLE karena permintaan tidak mengubah style lain
  whiteCard: {
    minHeight: 120,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 14,
    backgroundColor: '#fff',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  whiteCardInner: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#222',
  },

  // list container
  listContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 0,
  },

  // each card
  cardWrap: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    // shadow for iOS / elevation for Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  thumb: {
    width: 68,
    height: 68,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    height: 68,
    justifyContent: 'space-between',
  },

  flexSpacer: {
    flex: 1,
  },

  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    color: '#222',
    fontSize: 14,
  },
  heartBtn: {
    marginLeft: 8,
    padding: 6,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  smallText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },

  bloodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  bloodLabel: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Poppins-Regular',
  },
  bloodType: {
    fontSize: 12,
    color: '#E53935',
    fontFamily: 'Poppins-SemiBold',
  },
  stockText: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Poppins-Regular',
  },
  stockCount: {
    fontSize: 12,
    color: '#222',
    fontFamily: 'Poppins-SemiBold',
  },
});
