import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AlreadyHaveAcounts = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Login');
  };
  // Tambahkan prop onPress agar bisa digunakan untuk navigasi
  interface Props {
    onPress?: () => void;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={handlePress}>
      <Text style={styles.text}>Already Have Accounts</Text>
    </TouchableOpacity>
  );
};

export default AlreadyHaveAcounts;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#111',
    textDecorationLine: 'underline',
  },
});
