import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // tambahkan ini

const CreateAccount = () => {
  const navigation = useNavigation(); // akses navigasi dari stack

  const handlePress = () => {
    navigation.navigate('Registar'); // pindah ke halaman Registar
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={handlePress}>
      <Text style={styles.text}>Create Account</Text>
    </TouchableOpacity>
  );
};

export default CreateAccount;

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
