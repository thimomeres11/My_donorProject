// src/pages/CekStokDarah0/index.tsx
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Image,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNav from '../../components/organisim/BottomNav';
import Gap from '../../components/atoms/Gap';

const bloodTypes = ['A +', 'A -', 'B +', 'B -', 'AB +', 'AB -', 'O +', 'O -'];
const locations = [
  'Bandung, Jawa Barat',
  'Jakarta, DKI Jakarta',
  'Surabaya, Jawa Timur',
];

const CekStokDarah0: React.FC<any> = ({navigation}) => {
  const [bloodType, setBloodType] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [location, setLocation] = useState<string>('Bandung, Jawa Barat');
  const [pickBloodVisible, setPickBloodVisible] = useState(false);
  const [pickLocationVisible, setPickLocationVisible] = useState(false);

  // Validasi: tombol disabled jika bloodType kosong atau quantity <= 0
  const isValid = bloodType.trim() !== '' && Number(quantity) > 0;

  const onPressSearch = () => {
    if (!isValid) {
      Alert.alert(
        'Form belum lengkap',
        'Pilih golongan darah dan masukkan jumlah yang valid.',
      );
      return;
    }

    const payload = {
      bloodType,
      quantity: Number(quantity),
      location,
    };

    // Navigasi ke screen CekStokDarah (hasil)
    navigation.navigate('CekStokDarah', payload);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* HEADER */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Tombol kembali">
            <Ionicons name="chevron-back-outline" size={22} color="#E53935" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Request Stok Darah</Text>

          <View style={styles.logoRow}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/mydonorproject.appspot.com/o/Chek%20stok%20darah.png?alt=media',
              }}
              style={styles.topLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* FORM AREA */}
        <View style={styles.formWrap}>
          {/* Dropdown golongan darah */}
          <TouchableOpacity
            style={styles.selectRow}
            activeOpacity={0.8}
            onPress={() => setPickBloodVisible(true)}
            accessibilityLabel="Pilih golongan darah">
            <Text
              style={[styles.selectText, !bloodType && styles.placeholderText]}>
              {bloodType || 'Pilih Golongan Darah'}
            </Text>
            <Ionicons name="chevron-down-outline" size={18} color="#666" />
          </TouchableOpacity>

          <Gap height={12} />

          {/* Input jumlah kantong */}
          <View style={styles.inputRow}>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              placeholder="....../ Kantong"
              keyboardType="numeric"
              style={styles.input}
              accessibilityLabel="Masukkan jumlah kantong darah"
            />
          </View>

          <Gap height={12} />

          {/* Selector lokasi */}
          <TouchableOpacity
            style={styles.locationRow}
            activeOpacity={0.8}
            onPress={() => setPickLocationVisible(true)}
            accessibilityLabel="Pilih lokasi">
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{location}</Text>
            <View style={styles.spacer} />
            <Ionicons name="chevron-forward-outline" size={18} color="#666" />
          </TouchableOpacity>

          <Gap height={20} />

          {/* Tombol CTA */}
          <TouchableOpacity
            style={[styles.searchBtn, !isValid && styles.searchBtnDisabled]}
            activeOpacity={0.9}
            onPress={onPressSearch}
            disabled={!isValid}
            accessibilityLabel="Cek stok darah">
            <Text style={styles.searchBtnText}>Cek stok darah</Text>
          </TouchableOpacity>

          {/* Help text */}
          <View style={styles.helpRow}>
            <Text style={styles.helpText}>
              Pilih golongan darah dan lokasi, lalu tekan Cek stok darah untuk
              melihat daftar rumah sakit yang punya stok.
            </Text>
          </View>
        </View>

        {/* MODAL: Pilih Golongan Darah */}
        <Modal
          visible={pickBloodVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setPickBloodVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Pilih Golongan Darah</Text>
              <FlatList
                data={bloodTypes}
                keyExtractor={i => i}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setBloodType(item);
                      setPickBloodVisible(false);
                    }}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* MODAL: Pilih Lokasi */}
        <Modal
          visible={pickLocationVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setPickLocationVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Pilih Lokasi</Text>
              <FlatList
                data={locations}
                keyExtractor={i => i}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setLocation(item);
                      setPickLocationVisible(false);
                    }}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default CekStokDarah0;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#f9f6f6'},
  root: {flex: 1},
  headerBar: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  backBtn: {width: 40, height: 40, justifyContent: 'center'},
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#E53935',
    fontSize: 16,
  },
  logoRow: {width: 56, alignItems: 'flex-end'},
  topLogo: {width: 48, height: 36},

  formWrap: {
    padding: 16,
    paddingTop: 20,
  },
  selectRow: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectText: {flex: 1, fontFamily: 'Poppins-Regular', color: '#222'},
  placeholderText: {color: '#999'},

  inputRow: {},
  spacer: {flex: 1},
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },

  locationRow: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  locationText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    color: '#222',
  },

  searchBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnDisabled: {
    backgroundColor: '#ccc',
  },
  searchBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },

  helpRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: Platform.OS === 'ios' ? 380 : 320,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
  },
  modalItem: {paddingVertical: 12},
  modalItemText: {fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222'},
});
