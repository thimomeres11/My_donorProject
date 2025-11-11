// src/components/molecules/BannerCarousel/index.tsx
import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const {width: SW} = Dimensions.get('window');

// gambar statis dari assets
const slide1 = require('../../../assets/BanerDonor.png');
const slide2 = require('../../../assets/BanerDonor.png');
const slide3 = require('../../../assets/BanerDonor.png');

const DATA = [slide1, slide2, slide3];

// lebar gambar di desain
const IMAGE_W = 347;
const IMAGE_H = 137;

const BannerCarousel: React.FC = () => {
  const flatRef = useRef<FlatList<any> | null>(null);
  const [active, setActive] = useState<number>(0);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SW);
    const bounded = Math.max(0, Math.min(index, DATA.length - 1));
    setActive(bounded);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatRef}
        data={DATA}
        keyExtractor={(_, idx) => String(idx)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <View style={styles.page}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {DATA.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === active ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 18,
    alignItems: 'center',
  },
  listContent: {
    alignItems: 'center',
  },
  page: {
    width: SW, // satu page = lebar layar
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: IMAGE_W,
    height: IMAGE_H,
    borderRadius: 12,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#E53935',
  },
  dotInactive: {
    backgroundColor: '#D3D3D3',
  },
});
