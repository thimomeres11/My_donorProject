import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// Tambahkan prop onPress agar bisa digunakan untuk navigasi
interface Props {
  onPress?: () => void;
}

const CreateAccount: React.FC<Props> = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={onPress}>
      <Text style={styles.text}>Already Have Accounts</Text>
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
