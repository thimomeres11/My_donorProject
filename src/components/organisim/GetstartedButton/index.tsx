import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  Platform,
  View,
} from 'react-native';
import Gap from '../../atoms/Gap'; // ❗️sesuaikan jika folder Gap beda

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  title?: string;
};

const GetButtonStart: React.FC<Props> = ({
  onPress,
  style,
  title = 'Get Started',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Text style={styles.text}>{title}</Text>
      <Gap width={12} />
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

export default GetButtonStart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 28,
    color: '#111',
    textDecorationLine: 'underline',
    fontFamily: Platform.select({
      ios: 'Poppins-Bold',
      android: 'Poppins-Bold',
      default: 'Poppins-Bold',
    }),
  },
  arrow: {
    fontSize: 36,
    color: '#D63B45',
    fontFamily: Platform.select({
      ios: 'Poppins-BoldItalic',
      android: 'Poppins-BoldItalic',
      default: 'Poppins-BoldItalic',
    }),
    marginTop: -2,
  },
});
