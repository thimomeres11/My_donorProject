import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AutoHeader from '../../components/organisim/AutoHeader';
import LogoTitle from '../../components/molecules/LogoTitles';
import {
  Gap,
  ButtonRegis,
  CreateAccount,
  AlreadyHaveAcounts,
} from '../../components/atoms';
import TextInput from '../../components/molecules/TextInput';

const Registar: React.FC<any> = ({navigation}) => {
  const handleBack = () => {
    if (navigation && typeof navigation.goBack === 'function') {
      navigation.goBack();
    }
  };

  // state form
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState(''); // bisa ganti ke datepicker nanti
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateAndSubmit = () => {
    // simple validation
    if (
      !email.trim() ||
      !phone.trim() ||
      !dob.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Semua field harus diisi.');
      return;
    }

    // basic email format (simple)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi tidak sama.');
      return;
    }

    // TODO: panggil API register di sini
    Alert.alert('Sukses', 'Akun berhasil dibuat (dummy).');
    // contoh: navigasi ke Login atau Home
    navigation?.navigate?.('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AutoHeader title="Registar" onBack={handleBack} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <LogoTitle />
          <Gap height={8} />
          <TextInput
            label="Email"
            placeholder="Enter Your Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            label="Phone number"
            placeholder="Enter Your Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            label="Date of birth"
            placeholder="DD / MM / YYYY"
            value={dob}
            onChangeText={setDob}
          />
          <TextInput
            label="Password"
            placeholder="Enter Your New Password"
            secure
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Your Password"
            secure
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Gap height={10} />

          {/* PENTING: pasang onPress supaya fungsi dipakai */}
          <ButtonRegis title="Register" onPress={validateAndSubmit} />

          <Gap height={7} />
          <CreateAccount />
          <AlreadyHaveAcounts />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Registar;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#FFFFFF'},
  keyboard: {flex: 1},
  container: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
});
