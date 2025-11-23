// src/Pages/Login/index.tsx
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import {showMessage} from 'react-native-flash-message'; // <-- import showMessage
import AutoHeader from '../../components/organisim/AutoHeader';
import LogoTitle from '../../components/molecules/LogoTitles';
import {Gap, Button, CreateAccount} from '../../components/atoms';
import TextInput from '../../components/molecules/TextInput';

import {auth} from '../../config/Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {getApps} from 'firebase/app';

const Login: React.FC<any> = ({navigation, route}) => {
  const initialEmail = route?.params?.email ?? '';
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const passwordRef = useRef<RNTextInput | null>(null);

  useEffect(() => {
    console.log(
      'Login mounted, firebase apps:',
      (() => {
        try {
          return getApps().length;
        } catch {
          return 'n/a';
        }
      })(),
    );
    if (initialEmail) {
      setEmail(initialEmail);
      setTimeout(() => passwordRef.current?.focus(), 150);
    }
  }, []);

  const validateEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

  const handleLogin = async () => {
    console.log('handleLogin', {email});
    if (!auth) {
      showMessage({
        message: 'Firebase not initialized',
        description: 'auth is undefined — cek src/config/Firebase/index.tsx',
        type: 'danger',
      });
      return;
    }

    const trimmed = email.trim();
    if (!trimmed || !password.trim()) {
      showMessage({
        message: 'Error',
        description: 'Email dan Password harus diisi.',
        type: 'warning',
      });
      return;
    }
    if (!validateEmail(trimmed)) {
      showMessage({
        message: 'Error',
        description: 'Masukkan email yang valid.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmed,
        password,
      );
      const user = userCredential.user;
      console.log('Login success', user.uid);

      showMessage({
        message: 'Login berhasil',
        description: 'Selamat datang!',
        type: 'success',
      });

      // navigasi ke Home, kirim uid
      navigation.replace('Home', {uid: user.uid});
    } catch (err: any) {
      console.warn('Login error', err);
      let message = err?.message || 'Login gagal';
      if (err?.code === 'auth/user-not-found') message = 'User tidak ditemukan';
      else if (err?.code === 'auth/wrong-password') message = 'Password salah';
      else if (err?.code === 'auth/invalid-email')
        message = 'Email tidak valid';

      showMessage({
        message: 'Login Failed',
        description: message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AutoHeader title="Login" />
      <ScrollView contentContainerStyle={styles.container}>
        <LogoTitle />
        <Gap height={60} />

        <TextInput
          label="Email"
          placeholder="Enter Your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          secure
          value={password}
          onChangeText={setPassword}
          // if your TextInput wrapper accepts ref, forward it; otherwise the focus fallback is fine
        />

        <Gap height={40} />
        <Button
          title={loading ? 'Loading...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />
        <Gap height={16} />
        <CreateAccount />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#FFFFFF'},
  container: {paddingHorizontal: 32, paddingBottom: 40},
});
