import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import HideEye from '../../../assets/HideEye.svg'; // dari molecules/TextInput -> ../../../assets
import Gap from '../../atoms/Gap';

type Props = TextInputProps & {
  label?: string;
  placeholder?: string;
  secure?: boolean;
};

const MoleculeTextInput: React.FC<Props> = ({
  label,
  placeholder,
  secure = false,
  style,
  ...rest
}) => {
  const [visible, setVisible] = useState(!secure);

  const showPasswordHint = label?.toLowerCase() === 'password'; // hanya muncul jika label "Password"

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Gap height={6} />

      {/* Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          secureTextEntry={secure && !visible}
          {...rest}
        />

        {secure ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setVisible(v => !v)}
            activeOpacity={0.7}>
            <HideEye width={22} height={22} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Tampilkan hint hanya jika label = "Password" */}
      {showPasswordHint && (
        <>
          <Gap height={1} />
          <Text style={styles.helperText}>Minimum 8 karakter 1 number</Text>
        </>
      )}
    </View>
  );
};

export default MoleculeTextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#111',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#111',
    backgroundColor: '#fff',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: 45,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9C9C9C',
    lineHeight: 18,
  },
});
