import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import AutoHeader from '../../components/organisim/AutoHeader';

const Login: React.FC<any> = ({navigation}) => {
  const handleBack = () => {
    if (navigation && typeof navigation.goBack === 'function') {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AutoHeader title="Login" onBack={handleBack} />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    color: '#333',
    fontSize: 16,
  },
});

export default Login;
