import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackButton from '../../../assets/Backbutton.svg';

// Simple BackIcon without props — fixed size (W=23, H=32) as requested
const BackIcon: React.FC = () => {
  return (
    <View style={styles.container}>
      <BackButton width={23} height={32} />
    </View>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
