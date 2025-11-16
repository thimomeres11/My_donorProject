import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Button = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.wrapper}
      onPress={handlePress}>
      <LinearGradient
        colors={['#FF4141', '#FF6D6D']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        locations={[0, 0.56]}
        style={styles.gradient}>
        <Text style={styles.text}>Registar</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const BUTTON_WIDTH = 323;
const BUTTON_HEIGHT = 43;
const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  wrapper: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  } as ViewStyle,

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
