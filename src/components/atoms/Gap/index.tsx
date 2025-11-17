// src/components/atoms/Gap/index.tsx
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

type GapProps = {
  height?: number;
  width?: number;
  style?: ViewStyle;
};

const Gap: React.FC<GapProps> = ({height = 8, width = 0, style}) => {
  return <View style={[{height, width}, styles.base, style]} />;
};

export default Gap;

const styles = StyleSheet.create({
  base: {},
});
