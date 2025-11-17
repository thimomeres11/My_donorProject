import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

const DonorPage = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#E8F4F8', '#D4E8F0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientContainer}>
        {/* Background Image */}
        <Image
          source={require('../../../assets/Background1.svg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* PMI Logo - Top Center */}
        <View style={styles.pmiLogoContainer}>
          <Image
            source={require('../../../assets/PmiLogo.svg')}
            style={styles.pmiLogo}
            resizeMode="contain"
          />
        </View>

        {/* Main Content Area */}
        <View style={styles.contentArea}>
          {/* Orange Donation Box */}
          <View style={styles.donationBox}>
            <LinearGradient
              colors={['#FF9966', '#FF8844']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.boxGradient}>
              <Text style={styles.donateText}>DONATE</Text>
            </LinearGradient>

            {/* Hands illustration area - represented with visual elements */}
            <View style={styles.handsArea}>
              <View style={styles.handIcon} />
              <View style={styles.handIcon} />
            </View>
          </View>

          {/* Red Bottom Section with Blood Drop Logo */}
          <View style={styles.bottomSection}>
            <LinearGradient
              colors={['#C41E3A', '#A01830']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.bottomGradient}>
              {/* Blood Drop Logo */}
              <Image
                source={require('../../../assets/LOGO DONOR.svg')}
                style={styles.donorLogo}
                resizeMode="contain"
              />

              {/* My-donor Text */}
              <Text style={styles.myDonorText}>My-donor</Text>

              {/* CTA Button */}
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => navigation?.navigate?.('Home')}>
                <Text style={styles.ctaButtonText}>Mulai Donasi</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  pmiLogoContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    zIndex: 10,
  },
  pmiLogo: {
    width: 60,
    height: 60,
  },
  contentArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  donationBox: {
    width: '100%',
    maxWidth: 280,
    height: 200,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  boxGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  donateText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C41E3A',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  handsArea: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  handIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
  bottomSection: {
    width: '100%',
    maxWidth: 280,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  bottomGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  donorLogo: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  myDonorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 1,
  },
  ctaButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DonorPage;
