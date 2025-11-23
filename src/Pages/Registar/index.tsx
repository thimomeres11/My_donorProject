// src/Pages/Registar/index.tsx
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {showMessage} from 'react-native-flash-message'; // <-- import showMessage
import AutoHeader from '../../components/organisim/AutoHeader';
import LogoTitle from '../../components/molecules/LogoTitles';
import {
  Gap,
  ButtonRegis,
  CreateAccount,
  AlreadyHaveAcounts,
} from '../../components/atoms';
import TextInput from '../../components/molecules/TextInput';

// Firebase exports dari config
import {auth, db} from '../../config/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref, set} from 'firebase/database';

const Registar: React.FC<any> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateAndSubmit = async () => {
    if (
      !email.trim() ||
      !phone.trim() ||
      !dob.trim() ||
      !password ||
      !confirmPassword
    ) {
      showMessage({
        message: 'Error',
        description: 'Semua field harus diisi.',
        type: 'warning',
      });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      showMessage({
        message: 'Error',
        description: 'Format email tidak valid.',
        type: 'warning',
      });
      return;
    }

    if (password.length < 6) {
      showMessage({
        message: 'Error',
        description: 'Password minimal 6 karakter.',
        type: 'warning',
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: 'Error',
        description: 'Password dan konfirmasi tidak sama.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        phone,
        dob,
        createdAt: new Date().toISOString(),
      };

      // write to RTDB (non-blocking error handling)
      try {
        await set(ref(db, `users/${user.uid}`), userData);
        console.log('Saved user to RTDB', user.uid);
      } catch (dbErr) {
        console.warn('DB write failed', dbErr);
        showMessage({
          message: 'Peringatan',
          description: 'Akun dibuat tetapi gagal menyimpan data ke database.',
          type: 'warning',
        });
      }

      showMessage({
        message: 'Success',
        description: 'Akun berhasil dibuat!',
        type: 'success',
      });
      setLoading(false);
      navigation.replace('Login', {email: email.trim()});
    } catch (err: any) {
      console.warn('Register error', err);
      setLoading(false);
      let msg = err?.message || 'Gagal mendaftar';
      if (err?.code === 'auth/email-already-in-use')
        msg = 'Email sudah terdaftar';
      else if (err?.code === 'auth/invalid-email') msg = 'Email tidak valid';
      else if (err?.code === 'auth/weak-password')
        msg = 'Password terlalu lemah';

      showMessage({
        message: 'Register Failed',
        description: msg,
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AutoHeader title="Registar" onBack={() => navigation.goBack()} />
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

          <Gap height={12} />
          <ButtonRegis
            title={loading ? 'Loading...' : 'Register'}
            onPress={validateAndSubmit}
            disabled={loading}
          />

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
  container: {paddingHorizontal: 32, paddingBottom: 40},
});
