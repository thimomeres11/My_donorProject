import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Alert} from 'react-native';
import AutoHeader from '../../components/organisim/AutoHeader';
import LogoTitle from '../../components/molecules/LogoTitles';
import {Gap, Button, CreateAccount} from '../../components/atoms';
import TextInput from '../../components/molecules/TextInput';

const Login: React.FC<any> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Email dan Password harus diisi.');
      return;
    }

    // langsung pindah ke Home
    navigation.navigate('Home');
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
        />

        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          secure
          value={password}
          onChangeText={setPassword}
        />

        <Gap height={40} />

        {/* Tombol Login: panggil handleLogin */}
        <Button title="Login" onPress={handleLogin} />

        <Gap height={16} />
        <CreateAccount />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
});
