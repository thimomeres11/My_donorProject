import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {BackIcon} from '../../atoms';
type Props = {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
};

const AutoHeader: React.FC<Props> = ({title, onBack, showBack = true}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.7}>
            <BackIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>

        <View style={styles.rightPlaceholder} />
      </View>
      {/* small shadow strip below header to emphasize elevation on both platforms */}
      <View style={styles.shadowBelow} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#f6f6f6ff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // shadow (iOS)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // elevation (Android)
    elevation: 6,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backArrow: {
    fontSize: 26,
    color: '#FF6D6D',
    lineHeight: Platform.OS === 'ios' ? 28 : 26,
  },
  backPlaceholder: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#FF6D6D',
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  rightPlaceholder: {
    width: 40,
    height: 40,
  },
  shadowBelow: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default AutoHeader;
