// src/pages/CekStokDarah/index.tsx
import React, {useEffect, useState} from 'react';
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
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../../components/organisim/BottomNav';
import Gap from '../../components/atoms/Gap';

import {db} from '../../config/Firebase';
import {ref, get, runTransaction, push, set} from 'firebase/database';
import {getAuth} from 'firebase/auth';

const {width: SW} = Dimensions.get('window');
const BOTTOM_NAV_HEIGHT = Platform.OS === 'ios' ? 90 : 84;
const SAFE_BOTTOM_GAP = 12;
const BOTTOM_SPACER = BOTTOM_NAV_HEIGHT + SAFE_BOTTOM_GAP;

type Hospital = {
  id: string; // full relative path under 'hospitals', e.g. "rs_DKI/rs_fatmawati" or "rs_santosa"
  name: string;
  location?: string;
  image?: any;
  stocks: Record<string, number>;
};

// mapping gambar; key gunakan nama node terakhir (mis. rs_fatmawati)
const imageMap: Record<string, any> = {
  // bandung assets (default)
  RS_DEFAULT: require('../../assets/RSAdventBandung.png'),
  // contoh mapping jika Anda punya file spesifik
  rs_santosa: require('../../assets/RS.png'),
  rs_al_ihsan: require('../../assets/RSAlIhsan.png'),
  rs_cicendo: require('../../assets/RSCicendo.png'),
  rs_advent_bandung: require('../../assets/RSAdventBandung.png'),
  // untuk DKI Anda minta gambar sama dengan Bandung, jadi tidak perlu menambahkan rs_* baru
};

const CekStokDarah: React.FC<any> = ({route, navigation}) => {
  const params = route?.params || {};
  const {bloodType = '', quantity = 0, location = ''} = params;
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params]);

  // rekursif: kumpulkan semua node yang "looks like hospital" dari object val
  // setiap entry diberi id = fullPath (relative dari 'hospitals'), e.g. 'rs_DKI/rs_fatmawati'
  const collectHospitalsRecursive = (
    node: any,
    pathPrefix = '',
    out: Array<{id: string; data: any}> = [],
  ) => {
    if (node && typeof node === 'object') {
      // if node has 'stocks' OR 'name' -> treat as hospital leaf (we require at least name or stocks)
      if (node.name !== undefined || node.stocks !== undefined) {
        // if pathPrefix is empty it means key was top-level, but we need id (pathPrefix should be set by caller)
        out.push({id: pathPrefix, data: node});
        return out;
      }
      // else iterate children
      Object.keys(node).forEach(k => {
        const child = node[k];
        const childPath = pathPrefix ? `${pathPrefix}/${k}` : k;
        collectHospitalsRecursive(child, childPath, out);
      });
    }
    return out;
  };

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const snap = await get(ref(db, 'hospitals'));
      const val = snap.val();
      if (!val) {
        setHospitals([]);
        setLoading(false);
        return;
      }

      // dapatkan daftar pair {id: fullPath, data}
      const pairs = collectHospitalsRecursive(val, '');
      const list: Hospital[] = [];

      // normalize requested blood key like "A +" => "A+"
      const normalizedReq = (bloodType || '').replace(/\s/g, '');

      pairs.forEach(pair => {
        const {id, data} = pair;
        // skip malformed
        if (!id || !data) return;

        const stocks: Record<string, number> = data.stocks || {};
        const loc: string | undefined = data.location;

        // check location match (if user provided location)
        const sameLocation =
          !location ||
          (loc && loc.toLowerCase().includes(location.toLowerCase()));

        // if user specified bloodType and quantity, we usually want hospitals that can fulfill it
        const needCheckStock = normalizedReq !== '' && Number(quantity) > 0;
        const available = normalizedReq
          ? stocks[normalizedReq] ?? 0
          : undefined;
        const hasEnoughStock = !needCheckStock
          ? true
          : (available ?? 0) >= Number(quantity);

        if (sameLocation && hasEnoughStock) {
          // choose image by last id segment (rs_fatmawati etc)
          const lastKey = id.split('/').pop() ?? id;
          const image = imageMap[lastKey] ?? imageMap['RS_DEFAULT'];

          list.push({
            id,
            name: data.name || 'Unnamed Hospital',
            location: data.location,
            image,
            stocks,
          });
        }
      });

      setHospitals(list);
    } catch (err) {
      console.warn('fetchHospitals error', err);
      Alert.alert('Error', 'Gagal mengambil data rumah sakit dari Firebase');
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  const onOpenDetail = (h: Hospital) => {
    setSelectedHospital(h);
    setModalVisible(true);
  };

  // hospitalId must be full relative path under 'hospitals' (e.g. 'rs_DKI/rs_fatmawati')
  // NOTE: logic transaction sama seperti sebelumnya — saya tambahkan step untuk push ke /requests setelah committed
  const requestBlood = async (
    hospitalId: string,
    bloodKey: string,
    qty: number,
  ) => {
    if (!hospitalId) {
      Alert.alert('Error', 'ID rumah sakit tidak valid.');
      return;
    }
    const qtyNumber = Number(qty);
    if (isNaN(qtyNumber) || qtyNumber <= 0) {
      Alert.alert('Error', 'Jumlah yang diminta tidak valid.');
      return;
    }

    const stockRefPath = `hospitals/${hospitalId}/stocks/${bloodKey}`;
    const stockRef = ref(db, stockRefPath);

    try {
      const res = await runTransaction(stockRef, current => {
        if (current === null || typeof current !== 'number') {
          // can't operate
          return current;
        }
        if (current < qtyNumber) {
          // not enough -> abort (return unchanged)
          return current;
        }
        return current - qtyNumber;
      });

      // res.committed true = applied
      if (res && (res as any).committed) {
        // --- NEW: catat request terpisah di /requests (tidak di /users) ---
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          const uid = user?.uid ?? null;
          const email = user?.email ?? null;

          const requestsRef = ref(db, 'requests');
          const newReqRef = push(requestsRef);

          const requestObj: Record<string, any> = {
            userId: uid,
            userEmail: email,
            hospitalPath: hospitalId,
            hospitalName: selectedHospital?.name ?? null,
            bloodType: bloodKey,
            quantity: qtyNumber,
            timestamp: Date.now(),
          };

          await set(newReqRef, requestObj);
          // ----------------------------------------------------------------

          Alert.alert(
            'Sukses',
            'Permintaan darah berhasil. Stok diperbarui dan tercatat.',
          );
        } catch (writeErr) {
          console.warn('write request err', writeErr);
          // meskipun pencatatan gagal, stok sudah berkurang — informasikan user
          Alert.alert(
            'Sukses (catatan gagal)',
            'Stok diperbarui tetapi pencatatan request ke server gagal.',
          );
        }

        setModalVisible(false);
        // refresh data
        fetchHospitals();
      } else {
        Alert.alert(
          'Gagal',
          'Transaksi tidak berhasil. Mungkin stok tidak cukup.',
        );
      }
    } catch (err) {
      console.warn('requestBlood err', err);
      Alert.alert('Error', 'Gagal memproses request. Coba lagi.');
    }
  };

  const renderItem = ({item}: {item: Hospital}) => {
    const normalized = (bloodType || '').replace(/\s/g, '');
    const stock = item.stocks ? item.stocks[normalized] ?? 0 : 0;

    return (
      <TouchableOpacity
        style={styles.cardWrap}
        onPress={() => onOpenDetail(item)}>
        <View style={styles.card}>
          <Image
            source={item.image ?? imageMap['RS_DEFAULT']}
            style={styles.thumb}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <View style={styles.rowTop}>
              <Text style={styles.title} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={{width: 24}} />
            </View>

            <View style={styles.iconRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.smallText}>{item.location}</Text>
            </View>

            <View style={styles.flexSpacer} />

            <View style={styles.bloodRow}>
              <Text style={styles.bloodLabel}>Golongan Darah : </Text>
              <Text style={styles.bloodType}>{bloodType}</Text>
              <Text style={styles.stockText}> Stok Darah : </Text>
              <Text style={styles.stockCount}>{stock} / kantong</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safe, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#E53935" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.headerBar}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back-outline"
                    size={22}
                    color="#E53935"
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                  {location || 'Semua Lokasi'}
                </Text>
                <View style={{width: 40}} />
              </View>

              <View style={styles.searchBar}>
                <Text style={styles.searchText}>
                  Hasil untuk: {bloodType} — Jumlah: {quantity}
                </Text>
              </View>

              <Gap height={12} />
            </>
          }
          data={hospitals}
          renderItem={renderItem}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <View style={{padding: 20}}>
              <Text style={{color: '#444'}}>
                Tidak ada rumah sakit yang cocok.
              </Text>
            </View>
          )}
          ListFooterComponent={<View style={{height: BOTTOM_SPACER}} />}
        />

        {selectedHospital && (
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.detailModalOverlay}>
              <View style={styles.detailModalCard}>
                <View style={styles.detailModalHeader}>
                  <Text style={styles.detailTitle}>
                    {selectedHospital.name}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={20} color="#222" />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailBody}>
                  <Text style={styles.detailLabel}>
                    Golongan Darah :{' '}
                    <Text style={styles.detailValue}>{bloodType}</Text>
                  </Text>
                  <Text style={[styles.detailLabel, {marginTop: 8}]}>
                    Stok Saat Ini :{' '}
                    <Text style={styles.detailValue}>
                      {(selectedHospital.stocks &&
                        selectedHospital.stocks[
                          (bloodType || '').replace(/\s/g, '')
                        ]) ??
                        0}{' '}
                      / Kantong
                    </Text>
                  </Text>
                  <Text style={[styles.detailLabel, {marginTop: 8}]}>
                    Path (db):{' '}
                    <Text style={styles.detailValue}>
                      {selectedHospital.id}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.requestBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    const normalized = (bloodType || '').replace(/\s/g, '');
                    const available =
                      (selectedHospital.stocks &&
                        selectedHospital.stocks[normalized]) ??
                      0;
                    const qtyNum = Number(quantity);
                    if (available < qtyNum) {
                      Alert.alert(
                        'Stok kurang',
                        `Stok tersedia ${available} kantong, permintaan ${quantity} tidak dapat dipenuhi.`,
                      );
                      return;
                    }
                    // important: pass full path id (selectedHospital.id)
                    requestBlood(selectedHospital.id, normalized, qtyNum);
                  }}>
                  <Text style={styles.requestBtnText}>Request Darah</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

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
  backBtn: {width: 40, height: 40, justifyContent: 'center'},
  headerTitle: {fontFamily: 'Poppins-SemiBold', color: '#E53935', fontSize: 16},

  searchBar: {
    height: 48,
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchText: {color: '#666', fontFamily: 'Poppins-Regular'},

  listContainer: {paddingHorizontal: 12, paddingTop: 8, paddingBottom: 0},

  cardWrap: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {flexDirection: 'row', padding: 12, alignItems: 'center'},
  thumb: {width: 68, height: 68, borderRadius: 8, backgroundColor: '#eee'},
  cardContent: {
    flex: 1,
    marginLeft: 12,
    height: 68,
    justifyContent: 'space-between',
  },

  flexSpacer: {flex: 1},

  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {flex: 1, fontFamily: 'Poppins-SemiBold', color: '#222', fontSize: 14},

  iconRow: {flexDirection: 'row', alignItems: 'center', marginTop: 2},
  smallText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },

  bloodRow: {flexDirection: 'row', alignItems: 'center', paddingTop: 4},
  bloodLabel: {fontSize: 12, color: '#444', fontFamily: 'Poppins-Regular'},
  bloodType: {fontSize: 12, color: '#E53935', fontFamily: 'Poppins-SemiBold'},
  stockText: {fontSize: 12, color: '#444', fontFamily: 'Poppins-Regular'},
  stockCount: {fontSize: 12, color: '#222', fontFamily: 'Poppins-SemiBold'},

  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  detailModalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailTitle: {fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#222'},
  detailBody: {marginBottom: 14},
  detailLabel: {fontFamily: 'Poppins-Regular', color: '#444', fontSize: 14},
  detailValue: {fontFamily: 'Poppins-SemiBold', color: '#E53935'},

  requestBtn: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  requestBtnText: {color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 15},
});
