// src/components/molecules/TextInput/index.tsx
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import HideEye from '../../../assets/HideEye.svg'; // sesuaikan path jika beda
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

  // Ambil onChangeText asli dari parent (jika ada)
  const onChangeTextProp = (rest as any).onChangeText as
    | ((text: string) => void)
    | undefined;

  // Buat salinan props tanpa onChangeText agar tidak tersebar dua kali
  const otherRest: TextInputProps = {...rest};
  if ((otherRest as any).onChangeText) {
    delete (otherRest as any).onChangeText;
  }

  // Debounce timer (tipenya benar)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Delay (ms) — kamu bisa ubah sesuai kebutuhan
  const DEBOUNCE_DELAY = 300; // 300ms cukup nyaman, naikkan kalau mau lebih lama

  const handleDebouncedChange = (text: string) => {
    // jalankan onChangeText parent secara realtime agar UI tetap update
    // (jika kamu mau menunda update parent, hapus baris ini dan panggil hanya setelah debounce)
    if (typeof onChangeTextProp === 'function') {
      onChangeTextProp(text);
    }

    // Jika tujuannya hanya untuk logging yang jarang, debounce lognya:
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      // Debug/logging (hanya untuk dev)
      // gunakan JSON.stringify jika object besar
      console.log(`Input change [${label ?? 'field'}]:`, text);
      debounceTimer.current = null;
    }, DEBOUNCE_DELAY);
  };

  useEffect(() => {
    return () => {
      // Cleanup timer saat komponen unmount
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Gap height={6} />

      {/* Input */}
      <View style={styles.inputWrapper}>
        <RNTextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          secureTextEntry={secure && !visible}
          onChangeText={handleDebouncedChange} // handle perubahan + debounce log
          {...otherRest}
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
